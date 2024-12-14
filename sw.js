const CACHE_NAME "keto21f5si-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./keto.svg"
];
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  })
});

self.addEventListener("fetch", function(event) {
  event.respondWith(async function() {
    try {
      if (event.request.url.startWith("http")) {
        let res = await fetch(event.request);
        let cache = await cache.open(CACHE_NAME);
        cache.put(event.request.url, res.clone());
        return res;
      }
      return fetch(event.request);
    }
    catch (error) {
      return cache.match(event.request);
    }
  }());
});
