// progress-bar.js
const audio = document.getElementById('audio-player');
const progressBar = document.getElementById('progress-bar');

if (audio && progressBar) {
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      progressBar.style.width = (audio.currentTime / audio.duration * 100) + '%';
    }
  });
  audio.addEventListener('ended', () => {
    progressBar.style.width = '0%';
  });
}
