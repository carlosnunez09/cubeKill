const CACHE_NAME = 'cubekill-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/sketch.js',
  '/cryptoHelper.js',
  '/ajax/libs/p5.js/1.4.1/p5.js',
  '/libraries/p5.dom.min.js',
  '/libraries/p5.touchgui.js',
  '/libraries/p5livemedia.js',
  '/libraries/p5play.js',
  '/libraries/planck.min.js',
  '/libraries/simplepeer.min.js',
  '/libraries/socket.io.js'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
