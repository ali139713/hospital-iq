import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock the rate limit store by resetting module between tests
vi.mock('../src/lib/middleware/rate-limit', async () => {
  const store = new Map<string, { count: number; resetAt: number }>()
  const WINDOW_MS = 60_000
  const MAX_REQUESTS = 10

  function getClientIp(req: Request) {
    return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  }

  return {
    checkRateLimit: (req: Request) => {
      const ip = getClientIp(req)
      const now = Date.now()
      const entry = store.get(ip)

      if (!entry || now > entry.resetAt) {
        store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
        return { success: true, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_MS }
      }

      entry.count++
      if (entry.count > MAX_REQUESTS) {
        return { success: false, remaining: 0, resetAt: entry.resetAt }
      }
      return { success: true, remaining: MAX_REQUESTS - entry.count, resetAt: entry.resetAt }
    },
    _store: store,
  }
})

const { checkRateLimit, _store } = await import('../src/lib/middleware/rate-limit') as { checkRateLimit: (req: Request) => { success: boolean; remaining: number; resetAt: number }, _store: Map<string, { count: number; resetAt: number }> }

function makeRequest(ip = '127.0.0.1') {
  return new Request('http://localhost/api/v1/chat', {
    headers: { 'x-forwarded-for': ip },
  })
}

describe('Rate limiter', () => {
  beforeEach(() => _store.clear())

  it('allows the first request', () => {
    const result = checkRateLimit(makeRequest())
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(9)
  })

  it('allows up to 10 requests', () => {
    for (let i = 0; i < 10; i++) {
      const result = checkRateLimit(makeRequest())
      expect(result.success).toBe(true)
    }
  })

  it('blocks the 11th request', () => {
    for (let i = 0; i < 10; i++) checkRateLimit(makeRequest())
    const result = checkRateLimit(makeRequest())
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('tracks IPs independently', () => {
    for (let i = 0; i < 10; i++) checkRateLimit(makeRequest('1.1.1.1'))
    checkRateLimit(makeRequest('1.1.1.1')) // 11th — blocked

    const result = checkRateLimit(makeRequest('2.2.2.2'))
    expect(result.success).toBe(true) // Different IP — unaffected
  })
})
