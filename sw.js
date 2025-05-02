const CACHE = 'cbx-v1';
const OFFLINE = '/offline.html';
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll([
    '/',OFFLINE,'/posts.json'
  ])));
});
self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match(OFFLINE)))
  );
});
