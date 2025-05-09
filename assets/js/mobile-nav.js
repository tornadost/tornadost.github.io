document.querySelector('.nav-toggle')
  .addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('show');
    document.querySelector('.hamburger').classList.toggle('open');
  });