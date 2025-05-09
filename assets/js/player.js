;(function() {
    // — If you moved the markup into a partial, you can fetch it here instead:
    // await fetch('assets/html/player.html').then(r => r.text()).then(html => {
    //   document.getElementById('player-container').innerHTML = html;
    // });
  
    // Grab elements
    const audio         = document.getElementById('audioPlayer');
    const playPauseBtn  = document.getElementById('playPauseBtn');
    const prevBtn       = document.getElementById('prevBtn');
    const nextBtn       = document.getElementById('nextBtn');
    const progressBar   = document.getElementById('progressBar');
    const progressCont  = document.getElementById('progressContainer');
    const songTitleElem = document.getElementById('songTitle');
  
    // Playlist: add more tracks as needed
    const tracks = [
      { title: 'øfdream – thelema', src: 'storage/thelema.mp3' },
      { title: 'øfdream – another song', src: 'storage/another.mp3' }
    ];
    let currentTrack = 0;
  
    function loadTrack(i) {
      const t = tracks[i];
      audio.src = t.src;
      songTitleElem.textContent = t.title;
      audio.load();
    }
  
    function togglePlay() {
      if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    }
  
    function prevTrack() {
      currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
      loadTrack(currentTrack);
      audio.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
  
    function nextTrack() {
      currentTrack = (currentTrack + 1) % tracks.length;
      loadTrack(currentTrack);
      audio.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
  
    function updateProgress() {
      const pct = audio.duration
        ? (audio.currentTime / audio.duration) * 100
        : 0;
      progressBar.style.width = pct + '%';
    }
  
    function seek(e) {
      const rect = progressCont.getBoundingClientRect();
      const pct  = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * audio.duration;
    }
  
    // Event listeners
    playPauseBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    audio.addEventListener('timeupdate', updateProgress);
    progressCont.addEventListener('click', seek);
    audio.addEventListener('ended', nextTrack);
  
    // Initialize
    loadTrack(currentTrack);
  })();
  