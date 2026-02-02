import { describe, it, expect } from 'vitest'
import { checkRateLimit } from '@/lib/rate-limit'

describe('checkRateLimit', () => {
  it('allows requests under the limit', () => {
    const key = `test-${Date.now()}`
    const config = { maxRequests: 3, windowSeconds: 60 }

    const r1 = checkRateLimit(key, config)
    expect(r1.allowed).toBe(true)
    expect(r1.remaining).toBe(2)

    const r2 = checkRateLimit(key, config)
    expect(r2.allowed).toBe(true)
    expect(r2.remaining).toBe(1)
  })

  it('blocks requests over the limit', () => {
    const key = `test-block-${Date.now()}`
    const config = { maxRequests: 2, windowSeconds: 60 }

    checkRateLimit(key, config)
    checkRateLimit(key, config)

    const r3 = checkRateLimit(key, config)
    expect(r3.allowed).toBe(false)
    expect(r3.remaining).toBe(0)
  })

  it('uses different windows for different keys', () => {
    const key1 = `test-key1-${Date.now()}`
    const key2 = `test-key2-${Date.now()}`
    const config = { maxRequests: 1, windowSeconds: 60 }

    const r1 = checkRateLimit(key1, config)
    expect(r1.allowed).toBe(true)

    // Different key should have its own window
    const r2 = checkRateLimit(key2, config)
    expect(r2.allowed).toBe(true)
  })
})
