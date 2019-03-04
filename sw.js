//importScripts('/cache-polyfill.js');

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('airhorner').then(function (cache) {
      return cache.addAll([
        '/add-to-home/index.html',
        '/add-to-home/index.html?homescreen=1'
      ]);
    }).catch(function (err) {
      console.log("Service Worker Failed to Register", err);
    })
  );
});

self.addEventListener('fetch', function (event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});