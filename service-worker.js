const CACHE = 'el48-cache-v2';

const FILES = [
  './',
  './index.html',
  './compress.html',
  './enhance.html',
  './privacy.html',
  './terms.html',
  './favicon.ico',
  './manifest.webmanifest',
  './icon-152.png',
  './icon-192.png',
  './icon-512.png',
  './og-image.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
