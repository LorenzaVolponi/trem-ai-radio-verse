# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2b3aa8b6-5b13-4ee9-b346-83b85c483719

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2b3aa8b6-5b13-4ee9-b346-83b85c483719) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2b3aa8b6-5b13-4ee9-b346-83b85c483719) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Ops guardrails, GitHub PR and Vercel deploy

This repository includes an operational automation script for safer releases:

```sh
npm run ops:guardrails
```

What it does:

- Scans for high-signal leaked secrets and hardcoded credentials.
- Validates the main project taxonomy and required scripts.
- Installs dependencies when `node_modules` is missing.
- Runs lint, production build and a high-severity npm audit gate.
- Optionally commits pending changes with a default release message.
- Optionally pushes the branch, opens a GitHub PR and deploys to Vercel.

Useful commands:

```sh
# Local validation only
npm run ops:guardrails

# Preview commands without executing mutating steps
npm run ops:guardrails -- --dry-run

# Commit current changes after successful gates
npm run ops:guardrails -- --commit

# Full release flow: commit, push, GitHub PR and production Vercel deploy
npm run release:auto
```

Requirements for the full release flow:

- `git` configured with access to the remote repository.
- GitHub CLI (`gh`) authenticated with `gh auth login`.
- Vercel CLI (`vercel`) authenticated with `vercel login`.
- Optional environment variables: `RELEASE_COMMIT_MESSAGE`, `PR_TITLE`, `PR_BODY`.
