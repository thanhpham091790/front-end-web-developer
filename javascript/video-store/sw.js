self.addEventListener('install', e => {
 e.waitUntil(
   caches.open('video-store').then(function(cache) {
     return cache.addAll([
       '/javascript/video-store/',
       '/javascript/video-store/index.html',
       '/javascript/video-store/index.js',
       '/javascript/video-store/style.css'
     ]);
   })
 );
});

self.addEventListener('fetch', e => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
