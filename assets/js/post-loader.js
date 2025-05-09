// marked.js must be loaded first via CDN
marked.setOptions({ gfm:true, headerIds:true, mangle:false });

const slug = window.location.pathname.match(/\/([^\/]+)\.html$/)?.[1];
if (!slug) {
  document.getElementById('body').textContent = 'Invalid URL';
} else {
  fetch(`./${slug}.json`)
    .then(r => r.json())
    .then(j => {
      document.getElementById('title').textContent = j.title;
      if (j.markdown) {
        return fetch(`./${slug}.md`)
          .then(r => r.text())
          .then(md => document.getElementById('body').innerHTML = marked.parse(md));
      } else {
        document.getElementById('body').innerHTML = j.content || '';
      }
    })
    .then(() => {
      // show video if present
      fetch(`./${slug}.json`).then(r => r.json()).then(j => {
        if (j.video_url) {
          document.getElementById('video-frame').src = j.video_url;
          document.getElementById('video-section').style.display = 'block';
        }
        if (j.audio_url) {
          document.getElementById('bg-audio').src = j.audio_url;
          document.getElementById('audio-section').style.display = 'block';
        }
      });
    })
    .catch(() => document.getElementById('body').textContent = 'Post not found.');
}