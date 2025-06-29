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

## Environment variables

Copy `.env.example` to `.env` and adjust the values if needed. These variables
configure the Supabase backend:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_SUPABASE_DB_URL
```

The `VITE_SUPABASE_DB_URL` should match your Postgres connection string, for
instance:

```
postgresql://postgres:123456a@db.tkijutysfgzncswvjmhn.supabase.co:5432/postgres
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2b3aa8b6-5b13-4ee9-b346-83b85c483719) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Backend radio server

The repository includes a minimal [FastAPI](https://fastapi.tiangolo.com/) backend under `backend/`. It exposes endpoints to list available streams and launch an FFmpeg process that relays audio to an Icecast server.

Run it locally with:

```bash
cd backend
uvicorn main:app
```
Install the optional `suno-api` dependency to enable automatic song
generation and set the `SUNO_COOKIE` environment variable with a valid
session cookie from [suno.com](https://suno.com).

Adjust `backend/main.py` with your own credentials and prompts as needed.

## Legal & Open Source Notice

See [disclaimers.md](./disclaimers.md) for details about third-party tools and licensing. Usage of Suno-generated music must comply with [Suno's Terms of Service](https://suno.com/terms) and [Privacy Policy](https://suno.com/privacy).
