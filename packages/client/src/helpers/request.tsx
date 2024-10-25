export type Request = {
  protocol: any
  get: (arg0: string) => any
  originalUrl: any
  url: any
  headers:
    | {
        [s: string]: unknown
      }
    | ArrayLike<unknown>
  method: string
  body: any
}

export type Response = {
  on: (arg0: string, arg1: () => void) => void
}

export default function createFetchRequest(req: Request, res?: Response) {
  const origin = `${req.protocol}://${req.get('host')}`
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin)

  const controller = new AbortController()
  res?.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        if (typeof values === 'string') {
          headers.set(key, values)
        }
      }
    }
  }

  const init = {
    method: req.method,
    headers,
    signal: controller.signal,
    body: undefined,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}
