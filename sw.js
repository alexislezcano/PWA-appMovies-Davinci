
//
const CACHE_NAME = 'version1';

importScripts(
    'https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/7.0.0/workbox-sw.js'
);

// Esto es para que el SW no se quede "esperando"
self.addEventListener('message', event => {
    if (event.data && event.data.type == "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache').then(function(cache) {
        return cache.addAll([
          '404.html','index.html'
        ]);
      })
    );
  });

// Esto lo que hace es " cachear " los recursos a medida que navegamos
workbox.routing.registerRoute(
    new RegExp('/*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: CACHE_NAME
    })
);
   
