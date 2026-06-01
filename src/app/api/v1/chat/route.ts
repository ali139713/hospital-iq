import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { NextResponse } from 'next/server'
import { env } from '@/env'
import { hospitalTools } from '@/lib/ai/tools'
import { buildSystemMessages } from '@/lib/ai/system-prompt'
import { checkRateLimit } from '@/lib/middleware/rate-limit'
import { validateChatRequest } from '@/lib/middleware/validate'
import { createRequestLogger } from '@/lib/logger'

// Keep the route alive for streaming
export const maxDuration = 30

export async function POST(req: Request) {
  const requestId = crypto.randomUUID()
  const log = createRequestLogger(requestId)

  // ── Rate limiting ──────────────────────────────────────────────────────────
  const rateLimit = checkRateLimit(req)
  if (!rateLimit.success) {
    log.warn({ event: 'rate_limited' }, 'Request rate limited')
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimit.resetAt),
          'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
        },
      },
    )
  }

  // ── Request validation ─────────────────────────────────────────────────────
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const validation = validateChatRequest(body)
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  const { messages } = validation.data
  log.info({ event: 'chat_request', messageCount: messages.length }, 'Incoming chat request')

  // ── Stream response ────────────────────────────────────────────────────────
  try {
    const systemMessages = buildSystemMessages()
    const systemText = (
      systemMessages[0].content as Array<{ text?: string }>
    )
      .map((c) => c.text ?? '')
      .join('\n\n')

    const result = streamText({
      model: anthropic('claude-haiku-4-5-20251001'),
      system: systemText,
      messages: await convertToModelMessages(messages as UIMessage[]),
      tools: hospitalTools,
      stopWhen: stepCountIs(3),
      onError({ error }) {
        log.error({ event: 'stream_error', error }, 'Stream error from Anthropic')
      },
      onFinish({ usage, finishReason }) {
        const inputCost = ((usage.inputTokens ?? 0) / 1_000_000) * 0.8
        const outputCost = ((usage.outputTokens ?? 0) / 1_000_000) * 4
        log.info(
          {
            event: 'chat_complete',
            finishReason,
            tokens: usage,
            estimatedCostUSD: Number((inputCost + outputCost).toFixed(6)),
          },
          'Chat request completed',
        )
      },
    })

    return result.toUIMessageStreamResponse({
      headers: { 'X-Request-Id': requestId },
    })
  } catch (err) {
    log.error({ event: 'chat_error', error: err }, 'Chat request failed')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Validate env at module load — fails fast if ANTHROPIC_API_KEY is missing
void env
