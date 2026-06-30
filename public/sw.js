const CACHE_NAME = 'pyscript-pwa-v1';
const ASSETS = [
    'index.html',
    'manifest.json',
    'icon-192.png',
    'icon-512.png',
    'https://pyscript.net',
    'https://pyscript.net'
];

// Install Event
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching PWA Assets...');
            return cache.addAll(ASSETS);
        })
    );
});

// Fetch Event (Offline-First Strategy)
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            // Return from cache if found, else fetch from web
            return cachedResponse || fetch(e.request);
        })
    );
});