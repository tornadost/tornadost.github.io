// THEME TOGGLE
const root = document.documentElement;
let theme = localStorage.getItem('theme') || 'dark';
function applyTheme(){
  root.classList.toggle('light', theme==='light');
  localStorage.setItem('theme', theme);
}
applyTheme();
document.getElementById('theme-btn').addEventListener('click', e=>{
  e.preventDefault();
  theme = theme==='dark'?'light':'dark';
  applyTheme();
});

// MOBILE NAV
document.querySelector('.nav-toggle').addEventListener('click', ()=>{
  document.querySelector('.nav-links').classList.toggle('show');
  document.querySelector('.hamburger').classList.toggle('open');
});

// BACK TO TOP
const topBtn = document.getElementById('top');
window.addEventListener('scroll', ()=>{
  topBtn.classList.toggle('visible', window.scrollY>300);
});
topBtn.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));