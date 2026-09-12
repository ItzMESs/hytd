// HSK Path — minimal offline app-shell cache.
//
// Strategy: network-first, falling back to cache when the network is
// unreachable. Every successful GET response for a same-origin, non-API
// request gets cached as it's fetched, so after using the app online once
// (with "Оффлайнд ашиглах" turned on), the page shell, app.js and Next's
// built CSS/JS chunks are available offline. API routes (/api/*) and the
// auth pages are never cached — progress needs a live server, and caching
// login/signup could otherwise trap someone on a stale auth form.
const CACHE_NAME = "hsk-path-cache-v1";

function isCacheable(url) {
  if (url.origin !== self.location.origin) return false;
  if (url.pathname.startsWith("/api/")) return false;
  if (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup")) return false;
  return true;
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (!isCacheable(url)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) cache.put(req, fresh.clone());
        return fresh;
      } catch (err) {
        const cached = await cache.match(req);
        if (cached) return cached;
        throw err;
      }
    })
  );
});
