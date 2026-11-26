/* Service worker de Elite Digital: NO guarda la página en caché.
   Borra el caché viejo (plantilla-base-v1) y se da de baja,
   para que los bloqueos y desbloqueos se vean de inmediato. */
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(nombres.map((nombre) => caches.delete(nombre)))
    ).then(() => self.clients.claim())
     .then(() => self.registration.unregister())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
