const STATIC_CACHE_NAME = 'static-data-v1'
const DYNAMIC_CACHE_NAME = 'dynamic-data-v1'
const urlsToCache = [
  '/',
  '/manifest.json',
  '/index.html',
  '/favicon.png',
  '/main.tsx'
]

const networkFirst = async (request) => {
  const cache = await caches.open(DYNAMIC_CACHE_NAME)
  try {
    const response = await fetch(request)
    if (response && response.status === 200 && response.type === 'basic') {
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
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}

const update = async (request) => {
  const cache = await caches.open(DYNAMIC_CACHE_NAME)
  try {
    const response = await fetch(request)
    if (response && response.status === 200 && response.type === 'basic') {
      await cache.put(request, response)
    }
  } catch (error) {
    console.error('Update failed', error)
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
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

  if (!(url.indexOf('http') === 0)) {
    return
  }

  event.respondWith(networkFirst(request))
  event.waitUntil(update(request))
})
