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

## Rádio Trem AI Backend

This repository also contains a minimal FastAPI backend used for the Rádio Trem AI project.

### Development

```bash
pip install -r backend/requirements.txt
python run_all.py
```

The API exposes three endpoints:

- `/trending` – returns the current trending songs from Suno.
- `/generate_announcement` – POST a JSON body `{ "text": "...", "voice": "...", "emotion": "..." }` and receive a WAV file.
- `/now_playing` – metadata about the current track and last announcement.

`voice` and `emotion` are optional. Example values depend on the TTS model in use; with the default Coqui XTTS model, voices such as `random` or specific speaker IDs and emotions like `Neutral`, `Happy`, or `Sad` are available.

### Environment variables

Configure the following variables to point to your Icecast server:

```
ICECAST_HOST=localhost
ICECAST_PORT=8000
ICECAST_MOUNT=stream.mp3
ICECAST_USER=source
ICECAST_PASSWORD=hackme
# Optional tuning
CROSSFADE_DURATION=1.5  # seconds between tracks
```

### Deployment on Replit

1. Create a new Replit project and import this repository.
2. In the **Shell**, install dependencies: `pip install -r backend/requirements.txt`.
3. Add the environment variables above in the Replit secrets panel.
4. Set the run command to `python run_all.py` so the API and radio loop start together.
5. Connect the stream to your external Icecast server.

For a very small demo player, open `public/radio.html` and set `ICECAST_STREAM`
to the URL of your Icecast mount.
