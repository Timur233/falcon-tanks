const CACHE_NAME = 'cache-data-v1'
const urlsToCache = [
  '/'
]

const networkFirst = async (request) => {
  const cache = await caches.open(CACHE_NAME)
  try {
    const response = await fetch(request)
    const cachePutCondition = response && response.status === 200 && response.type === 'basic'
    if (cachePutCondition) {
      await cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    console.error('Fetch failed; returning cached page instead.', error)
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    return new Response('Network error happened', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.error('Cache installation failed:', err)
      })
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const { url, method } = request

  if (method !== 'GET') {
    return
  }

  if (!url.startsWith('http')) {
    return
  }

  event.respondWith(networkFirst(request))
})
