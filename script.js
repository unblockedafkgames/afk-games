// AFK Games starter directory.
// Add real, trusted game URLs in the `url` field below.
// Only use games you own or are allowed to embed. Some sites block iframe embedding.
const games = [
  { title: "Supermarket Simulator", category: "Arcade", symbol: "✳", art: "arcade", description: "A quick-play arcade slot. Connect your chosen game URL.", url: "https://www.crazygames.com/game/supermarket-simulator-cashier-game" },
  { title: "Racing Starter", category: "Racing", symbol: "↗", art: "racing", description: "A place for your favourite browser racing game.", url: "" },
  { title: "Midnight Mystery", category: "Horror", symbol: "☾", art: "horror", description: "A spooky-game slot for a trusted browser title.", url: "" },
  { title: "Puzzle Break", category: "Puzzle", symbol: "▦", art: "puzzle", description: "Give your brain a tiny workout between tasks.", url: "" },
  { title: "Sports Corner", category: "Sports", symbol: "◉", art: "sports", description: "Quick sports games, ready for a short break.", url: "" },
  { title: "Platform Hop", category: "Platformers", symbol: "↑", art: "platformers", description: "A spot for jump-and-run browser games.", url: "" },
  { title: "Play Together", category: "Multiplayer", symbol: "⌘", art: "multiplayer", description: "Add a multiplayer game that supports embedding.", url: "" },
  { title: "One More Round", category: "Arcade", symbol: "＋", art: "arcade", description: "Your second arcade slot. Rename it whenever you like.", url: "" },
  { title: "Time Trial", category: "Racing", symbol: "⌁", art: "racing", description: "A second racing slot for your directory.", url: "" }
];

const grid = document.querySelector("#gameGrid");
const searchInput = document.querySelector("#searchInput");
const emptyState = document.querySelector("#emptyState");
const chips = [...document.querySelectorAll(".chip")];
const dialog = document.querySelector("#gameDialog");
let activeCategory = "All";

function renderGames() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = games.filter(game =>
    (activeCategory === "All" || game.category === activeCategory) &&
    `${game.title} ${game.category} ${game.description}`.toLowerCase().includes(query)
  );

  grid.innerHTML = visible.map(game => `
    <article class="game-card" tabindex="0" role="button" aria-label="Open ${escapeHtml(game.title)}" data-title="${escapeHtml(game.title)}">
      <div class="game-art art-${game.art}"><span class="art-symbol">${game.symbol}</span></div>
      <div class="card-content">
        <div class="card-top"><h3>${escapeHtml(game.title)}</h3><span class="category-label">${escapeHtml(game.category)}</span></div>
        <p>${escapeHtml(game.description)}</p>
        <div class="card-bottom"><span>Browser game</span><span class="play-link">${game.url ? "PLAY ↗" : "SET UP ↗"}</span></div>
      </div>
    </article>`).join("");

  emptyState.hidden = visible.length > 0;
  grid.querySelectorAll(".game-card").forEach(card => {
    const open = () => openGame(games.find(game => game.title === card.dataset.title));
    card.addEventListener("click", open);
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
    });
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function openGame(game) {
  if (!game) return;
  if (game.url) {
  window.open(game.url, "_blank", "noopener,noreferrer");
  return;
}
  document.querySelector("#dialogCategory").textContent = game.category.toUpperCase();
  document.querySelector("#dialogTitle").textContent = game.title;
  const wrap = document.querySelector("#gameFrameWrap");
  wrap.replaceChildren();

  if (game.url) {
    // Use HTTPS URLs from trusted sources. A site may still refuse to load in an iframe.
    const frame = document.createElement("iframe");
    frame.src = game.url;
    frame.title = game.title;
    frame.loading = "lazy";
    frame.allow = "fullscreen; gamepad";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    wrap.appendChild(frame);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "game-placeholder";
    placeholder.innerHTML = `<span class="placeholder-icon">▶</span><h3>Game embed goes here</h3><p>This is a starter card. Add a trusted HTTPS game URL to the <code>url</code> field for <b>${escapeHtml(game.title)}</b> in <code>script.js</code>.</p>`;
    wrap.appendChild(placeholder);
  }
  dialog.showModal();
}

chips.forEach(chip => chip.addEventListener("click", () => {
  activeCategory = chip.dataset.category;
  chips.forEach(item => item.classList.toggle("active", item === chip));
  renderGames();
}));
searchInput.addEventListener("input", renderGames);
document.querySelector("#closeDialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
document.querySelector("#themeToggle").addEventListener("click", () => document.body.classList.toggle("dark"));
document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault(); searchInput.focus();
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
renderGames();
