;(function() {
    const audio        = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn      = document.getElementById('prevBtn');
    const nextBtn      = document.getElementById('nextBtn');
    const progressBar  = document.getElementById('progressBar');
    const progressCont = document.getElementById('progressContainer');
    const songTitle    = document.getElementById('songTitle');
  
    // playlist
    const tracks = [
      { title: 'øfdream – thelema', src: 'storage/thelema.mp3' }
      // add more: { title: 'Another Song', src: 'storage/another.mp3' }
    ];
    let currentTrack = 0;
  
    function loadTrack(i) {
      const t = tracks[i];
      audio.src = t.src;
      songTitle.textContent = t.title;
      audio.load();
    }
  
    function togglePlay() {
      if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    }
  
    function prevTrack() {
      currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
      loadTrack(currentTrack);
      audio.play();
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
  
    function nextTrack() {
      currentTrack = (currentTrack + 1) % tracks.length;
      loadTrack(currentTrack);
      audio.play();
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
  
    function updateProgress() {
      if (!audio.duration) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = pct + '%';
    }
  
    function seek(e) {
      const rect = progressCont.getBoundingClientRect();
      const pct  = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * audio.duration;
    }
  
    // events
    playPauseBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    audio.addEventListener('timeupdate', updateProgress);
    progressCont.addEventListener('click', seek);
    audio.addEventListener('ended', nextTrack);
  
    // init
    loadTrack(currentTrack);
  })();
  