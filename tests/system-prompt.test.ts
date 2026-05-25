import { describe, it, expect } from 'vitest'
import { buildSystemMessages } from '../src/lib/ai/system-prompt'

describe('buildSystemMessages', () => {
  it('returns a system message array', () => {
    const messages = buildSystemMessages()
    expect(messages).toHaveLength(1)
    expect(messages[0].role).toBe('system')
  })

  it('content contains multiple blocks', () => {
    const messages = buildSystemMessages()
    const content = messages[0].content
    expect(Array.isArray(content)).toBe(true)
    expect(content.length).toBeGreaterThan(1)
  })

  it('second block has Anthropic cache_control metadata', () => {
    const messages = buildSystemMessages()
    const content = messages[0].content as Array<Record<string, unknown>>
    const lastBlock = content[content.length - 1]

    expect(lastBlock.experimental_providerMetadata).toMatchObject({
      anthropic: { cacheControl: { type: 'ephemeral' } },
    })
  })

  it('system prompt mentions hospitals and tools', () => {
    const messages = buildSystemMessages()
    const content = messages[0].content as Array<{ text?: string }>
    const allText = content.map(c => c.text ?? '').join(' ')

    expect(allText).toContain('hospital')
    expect(allText).toContain('searchHospitals')
  })
})
