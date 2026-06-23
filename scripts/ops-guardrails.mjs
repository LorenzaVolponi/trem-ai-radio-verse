#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import process from 'node:process';

const args = new Set(process.argv.slice(2));
const root = process.cwd();
const isDryRun = args.has('--dry-run');
const shouldCommit = args.has('--commit') || args.has('--push') || args.has('--pr') || args.has('--deploy');
const shouldPush = args.has('--push');
const shouldPr = args.has('--pr');
const shouldDeploy = args.has('--deploy');
const shouldFix = args.has('--fix');
const skipBuild = args.has('--skip-build');
const skipLint = args.has('--skip-lint');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

const report = {
  checks: [],
  warnings: [],
  errors: [],
};

function log(message = '') {
  process.stdout.write(`${message}\n`);
}

function title(message) {
  log(`\n${colors.bold}${colors.cyan}▶ ${message}${colors.reset}`);
}

function commandExists(command) {
  const lookupCommand = process.platform === 'win32' ? 'where' : 'which';
  const result = spawnSync(lookupCommand, [command], {
    shell: false,
    stdio: 'ignore',
  });
  return result.status === 0;
}

function run(command, commandArgs = [], options = {}) {
  const printable = [command, ...commandArgs].join(' ');
  if ((isDryRun && !options.readOnly) || options.dryOnly) {
    log(`${colors.yellow}dry-run:${colors.reset} ${printable}`);
    return { status: 0, stdout: '', stderr: '' };
  }

  log(`${colors.cyan}$${colors.reset} ${printable}`);
  const result = spawnSync(command, commandArgs, {
    cwd: root,
    encoding: 'utf8',
    stdio: options.capture ? 'pipe' : 'inherit',
    shell: false,
    env: process.env,
  });

  if (result.error) {
    report.errors.push(`${printable}: ${result.error.message}`);
    return { status: 1, stdout: '', stderr: result.error.message };
  }

  if (result.status !== 0 && !options.allowFailure) {
    report.errors.push(`${printable} exited with status ${result.status}`);
  }

  return result;
}

function capture(command, commandArgs = [], options = {}) {
  return run(command, commandArgs, { ...options, capture: true, readOnly: true });
}

function addCheck(name, ok, details = '') {
  report.checks.push({ name, ok, details });
  const icon = ok ? `${colors.green}✓${colors.reset}` : `${colors.red}✕${colors.reset}`;
  log(`${icon} ${name}${details ? ` — ${details}` : ''}`);
}

function walk(dir, ignored = new Set(['node_modules', '.git', 'dist', 'build', '.vercel'])) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    if (ignored.has(entry)) continue;
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...walk(fullPath, ignored));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function scanSecrets() {
  title('Security guardrails');
  const files = walk(root).filter((file) => /\.(ts|tsx|js|jsx|mjs|cjs|json|env|md|toml|yml|yaml)$/i.test(file) && relative(root, file) !== 'scripts/ops-guardrails.mjs');
  const patterns = [
    { name: 'Supabase service role key', regex: /SUPABASE_SERVICE_ROLE_KEY\s*[=:]\s*['\"][^'\"]+['\"]/i },
    { name: 'Generic private key', regex: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/i },
    { name: 'GitHub token', regex: /gh[pousr]_[A-Za-z0-9_]{20,}/ },
    { name: 'Vercel token literal', regex: /VERCEL_TOKEN\s*[=:]\s*['\"][^'\"]+['\"]/i },
    { name: 'Hardcoded admin credential', regex: /(admin007|password\s*===\s*['\"][^'\"]+['\"])/i },
  ];

  const hits = [];
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    for (const pattern of patterns) {
      if (pattern.regex.test(text)) {
        hits.push(`${pattern.name}: ${relative(root, file)}`);
      }
    }
  }

  if (hits.length) {
    report.warnings.push(...hits);
    addCheck('Secret and credential scan', false, `${hits.length} finding(s)`);
    for (const hit of hits) log(`  ${colors.yellow}!${colors.reset} ${hit}`);
  } else {
    addCheck('Secret and credential scan', true, 'no high-signal findings');
  }
}

function validateTaxonomy() {
  title('Taxonomy guardrails');
  const requiredDirs = ['src/components', 'src/pages', 'src/hooks', 'src/lib', 'src/integrations'];
  for (const dir of requiredDirs) {
    addCheck(`Required directory ${dir}`, existsSync(join(root, dir)));
  }

  const uiFiles = existsSync(join(root, 'src/components/ui')) ? readdirSync(join(root, 'src/components/ui')).length : 0;
  addCheck('UI component taxonomy', uiFiles > 0, `${uiFiles} ui component file(s)`);

  const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  addCheck('Build script exists', Boolean(packageJson.scripts?.build));
  addCheck('Lint script exists', Boolean(packageJson.scripts?.lint));
}

function validateGitState() {
  title('Git guardrails');
  addCheck('Git CLI available', commandExists('git'));

  const branch = capture('git', ['branch', '--show-current'], { allowFailure: true });
  addCheck('Current branch detected', branch.status === 0 && branch.stdout.trim().length > 0, branch.stdout.trim());

  const status = capture('git', ['status', '--short'], { allowFailure: true });
  const changed = status.stdout.trim().split('\n').filter(Boolean);
  addCheck('Working tree has visible status', status.status === 0, changed.length ? `${changed.length} changed file(s)` : 'clean');
}

function installIfNeeded() {
  title('Dependency guardrails');
  if (existsSync(join(root, 'node_modules'))) {
    addCheck('Dependencies installed', true, 'node_modules present');
    return;
  }

  const installer = existsSync(join(root, 'package-lock.json')) ? ['npm', ['ci']] : ['npm', ['install']];
  run(installer[0], installer[1]);
}

function runQualityChecks() {
  title('Quality gates');
  if (!skipLint) run('npm', ['run', 'lint'], { allowFailure: false });
  if (!skipBuild) run('npm', ['run', 'build'], { allowFailure: false });

  if (commandExists('npm')) {
    const auditLevel = shouldFix ? ['audit', 'fix'] : ['audit', '--audit-level=high'];
    run('npm', auditLevel, { allowFailure: true });
  }
}

function commitPushPrDeploy() {
  title('Release automation');

  const status = capture('git', ['status', '--short'], { allowFailure: true });
  if (status.stdout.trim() && shouldCommit) {
    run('git', ['add', '.']);
    const message = process.env.RELEASE_COMMIT_MESSAGE || 'chore: add ops guardrails automation';
    run('git', ['commit', '-m', message]);
  } else if (status.stdout.trim()) {
    log(`${colors.yellow}skip:${colors.reset} git commit (use --commit, --push, --pr, or --deploy)`);
  } else {
    addCheck('Commit step', true, 'nothing to commit');
  }

  if (shouldPush) {
    const branch = capture('git', ['branch', '--show-current'], { allowFailure: true }).stdout.trim();
    run('git', ['push', '-u', 'origin', branch]);
  } else {
    log(`${colors.yellow}skip:${colors.reset} git push (use --push)`);
  }

  if (shouldPr) {
    if (!commandExists('gh')) {
      report.warnings.push('GitHub CLI is not installed; cannot create PR automatically.');
      log(`${colors.yellow}skip:${colors.reset} gh pr create (gh CLI missing)`);
    } else {
      const titleText = process.env.PR_TITLE || 'chore: add ops guardrails automation';
      const bodyText = process.env.PR_BODY || 'Adds an operations guardrails script for security checks, taxonomy validation, quality gates, commit/push, PR creation, and optional Vercel deploy.';
      run('gh', ['pr', 'create', '--fill', '--title', titleText, '--body', bodyText], { allowFailure: true });
    }
  } else {
    log(`${colors.yellow}skip:${colors.reset} GitHub PR (use --pr)`);
  }

  if (shouldDeploy) {
    if (!commandExists('vercel')) {
      report.warnings.push('Vercel CLI is not installed; run npm i -g vercel or use npx vercel.');
      log(`${colors.yellow}skip:${colors.reset} vercel deploy (vercel CLI missing)`);
    } else {
      const deployArgs = args.has('--prod') ? ['--prod'] : [];
      run('vercel', deployArgs, { allowFailure: false });
    }
  } else {
    log(`${colors.yellow}skip:${colors.reset} Vercel deploy (use --deploy, optionally --prod)`);
  }
}

function printSummary() {
  title('Summary');
  const failedChecks = report.checks.filter((check) => !check.ok);
  log(`${colors.bold}Checks:${colors.reset} ${report.checks.length - failedChecks.length}/${report.checks.length} passed`);
  log(`${colors.bold}Warnings:${colors.reset} ${report.warnings.length}`);
  log(`${colors.bold}Errors:${colors.reset} ${report.errors.length}`);

  if (report.warnings.length) {
    log(`\n${colors.yellow}Warnings:${colors.reset}`);
    for (const warning of report.warnings) log(`- ${warning}`);
  }

  if (report.errors.length) {
    log(`\n${colors.red}Errors:${colors.reset}`);
    for (const error of report.errors) log(`- ${error}`);
    process.exitCode = 1;
  }
}

log(`${colors.bold}Rádio Trem AI Ops Guardrails${colors.reset}`);
log('Usage: npm run ops:guardrails -- [--dry-run] [--fix] [--commit] [--push] [--pr] [--deploy] [--prod] [--skip-lint] [--skip-build]');

scanSecrets();
validateTaxonomy();
validateGitState();
installIfNeeded();
runQualityChecks();
commitPushPrDeploy();
printSummary();
