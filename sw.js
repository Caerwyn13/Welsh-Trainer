const CACHE_NAME = 'rn-pwa-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/metadata.json'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        cache.keys().then((keys) => Promise.all(
            keys.map((key) => key !== CACHE_NAME && caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            return fetch(e.request).then((networkResponse) => {
                if (networkReponse.status === 200 && e.request.method === 'GET') {
                    const cacheCopy = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(e.request, cacheCopy));
                }
                return networkResponse;
            });
        }).catch(() => caches.match('/index.html'))
    );
});