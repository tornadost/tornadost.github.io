const root = document.documentElement;
let theme = localStorage.getItem('theme') || 'dark';
function applyTheme(){
  root.classList.toggle('light', theme === 'light');
  localStorage.setItem('theme', theme);
}
applyTheme();
document.getElementById('theme-btn')
  .addEventListener('click', e => {
    e.preventDefault();
    theme = (theme === 'dark') ? 'light' : 'dark';
    applyTheme();
  });