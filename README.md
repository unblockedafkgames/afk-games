# AFK Games

A clean, responsive browser-game directory starter built with plain HTML, CSS, and JavaScript. It works on GitHub Pages without a build step.

## Run locally
Open `index.html` in a modern browser. For a local web server, run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Publish with GitHub Pages
1. Sign in to GitHub and create a new **public** repository named `afk-games` (or another name you prefer).
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then click **Save**.
6. Wait a minute or two. GitHub Pages will show the published URL on the Pages settings screen, usually `https://YOUR-USERNAME.github.io/afk-games/`.

## Add games
Edit the `games` array near the top of `script.js`. Change a game's `title`, `description`, `category`, and `url`. The URL must be a trusted HTTPS game page that allows embedding. Many sites deliberately block iframe embedding; this starter intentionally does not attempt to bypass those restrictions. Use games you own, open-source games with suitable licences, or games whose publisher permits embedding.

## Notes
- Search and category filters work.
- Responsive layout and dark-mode toggle are included.
- Game cards are demo placeholders until you add URLs.
- GitHub Pages is static hosting; it cannot run a server-side game backend.
- Publishing this site does not make it exempt from school network rules. Follow the school's acceptable-use policy.
