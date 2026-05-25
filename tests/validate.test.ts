import { describe, it, expect } from 'vitest'
import { validateChatRequest } from '../src/lib/middleware/validate'

describe('validateChatRequest', () => {
  it('accepts a valid user message', () => {
    const result = validateChatRequest({
      messages: [{ role: 'user', content: 'Show me hospitals' }],
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty messages array', () => {
    const result = validateChatRequest({ messages: [] })
    expect(result.success).toBe(false)
  })

  it('rejects when last message is not from user', () => {
    const result = validateChatRequest({
      messages: [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi there' },
      ],
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('user')
    }
  })

  it('rejects content over 1000 chars', () => {
    const result = validateChatRequest({
      messages: [{ role: 'user', content: 'a'.repeat(1001) }],
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid role', () => {
    const result = validateChatRequest({
      messages: [{ role: 'hacker', content: 'test' }],
    })
    expect(result.success).toBe(false)
  })

  it('accepts a multi-turn conversation ending with user', () => {
    const result = validateChatRequest({
      messages: [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi' },
        { role: 'user', content: 'Show hospitals' },
      ],
    })
    expect(result.success).toBe(true)
  })
})
