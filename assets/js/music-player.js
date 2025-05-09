const audio      = document.getElementById('audio-player'),
      playBtn    = document.getElementById('play-btn'),
      prevBtn    = document.getElementById('prev-btn'),
      nextBtn    = document.getElementById('next-btn'),
      trackInfo  = document.getElementById('track-info'),
      currentTimeElem = document.getElementById('current-time'),
      durationElem    = document.getElementById('duration'),
      seekBar         = document.getElementById('seek-bar'),
      muteBtn         = document.getElementById('mute-btn'),
      volumeBar       = document.getElementById('volume-bar'),
      progressBar     = document.getElementById('progress-bar');

let playlist=[], idx=0, playing=false;

// Load playlist.json
fetch('/assets/playlist/playlist.json')
  .then(r=>r.json())
  .then(data=>{
    playlist=data;
    if(playlist.length) loadTrack(0);
    else trackInfo.textContent='No tracks';
  })
  .catch(()=> trackInfo.textContent='Playlist error');

function loadTrack(i){
  const t=playlist[i];
  audio.src=t.url;
  trackInfo.innerHTML=`<span class="marquee">${t.title} — ${t.artist}</span>`;
  idx=i;
}

function togglePlay(){
  if(!playlist.length) return;
  playing? audio.pause() : audio.play();
}
playBtn.addEventListener('click',togglePlay);
prevBtn.addEventListener('click',()=>{
  idx=(idx-1+playlist.length)%playlist.length;
  loadTrack(idx); audio.play();
});
nextBtn.addEventListener('click',()=>{
  idx=(idx+1)%playlist.length;
  loadTrack(idx); audio.play();
});

audio.addEventListener('play',()=>{
  playing=true; playBtn.textContent='❚❚';
});
audio.addEventListener('pause',()=>{
  playing=false; playBtn.textContent='▶️';
});
audio.addEventListener('ended',()=> nextBtn.click());

audio.addEventListener('loadedmetadata',()=>{
  durationElem.textContent=formatTime(audio.duration);
  seekBar.max=Math.floor(audio.duration);
});
audio.addEventListener('timeupdate',()=>{
  const t=Math.floor(audio.currentTime);
  currentTimeElem.textContent=formatTime(t);
  seekBar.value=t;
  progressBar.style.width=(audio.currentTime/audio.duration*100)+'%';
});
seekBar.addEventListener('input',()=> audio.currentTime=seekBar.value);
muteBtn.addEventListener('click',()=>{
  audio.muted=!audio.muted;
  muteBtn.textContent=audio.muted?'🔇':'🔊';
});
volumeBar.addEventListener('input',()=>{
  audio.volume=volumeBar.value;
  if(audio.muted&&audio.volume>0) audio.muted=false;
  muteBtn.textContent=audio.muted?'🔇':'🔊';
});

function formatTime(sec){
  const m=Math.floor(sec/60),
        s=String(Math.floor(sec%60)).padStart(2,'0');
  return `${m}:${s}`;
}
