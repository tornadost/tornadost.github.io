const topBtn = document.getElementById('top');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 300);
});
topBtn.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);