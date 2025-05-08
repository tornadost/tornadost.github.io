// assets/js/git.js
const GITHUB_USERNAME = "RKeaves";
const excludedRepos = [
  "7612u",
  "Private-Trackers-Spreadsheet",
  "RKeaves",
  "MrScraper",
  "rkeaves.github.io",
  "DiscordBee",
  "Media-Finder",
  "DropToPTP",
  "Dasharr",
  "Gazelle",
  "proton-vpn-setup-cudy-router",
  "red",
  "REDBetter"
];

async function fetchRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    const repos = await res.json();
    const linksContainer = document.querySelector('.links');

    repos
      .filter(repo => !excludedRepos.includes(repo.name))
      .forEach(repo => {
        const a = document.createElement('a');
        a.href = repo.html_url;
        a.target = "_blank";
        a.textContent = repo.name;
        a.classList.add('floating-repo');
        linksContainer.appendChild(a);
      });

    const titleEl = document.querySelector('.glitch');
    document.querySelectorAll('.floating-repo').forEach(btn => {
      const moveButton = b => {
        const r = titleEl.getBoundingClientRect();
        let x, y;
        do {
          x = Math.random() * (window.innerWidth  - b.offsetWidth);
          y = Math.random() * (window.innerHeight - b.offsetHeight);
        } while (
          x < r.right  + 20 && x + b.offsetWidth > r.left  - 20 &&
          y < r.bottom + 20 && y + b.offsetHeight > r.top   - 20
        );
        b.style.left = `${x}px`;
        b.style.top  = `${y}px`;
        setTimeout(() => moveButton(b), 2000 + Math.random() * 2000);
      };
      moveButton(btn);
    });

  } catch (err) {
    console.error("Error loading GitHub repos:", err);
  }
}

window.addEventListener('DOMContentLoaded', fetchRepos);