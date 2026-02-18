const CACHE_NAME = "fpas-v6";

self.addEventListener("install", e => self.skipWaiting());

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }))
        )
    );
    return self.clients.claim();
});

self.addEventListener("fetch", e => {
    e.respondWith(fetch(e.request));
});
