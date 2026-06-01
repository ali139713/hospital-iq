import { z } from 'zod'

// v6 UIMessage: parts contain text, tools, etc. Text content is in parts.
const uiMessagePartSchema = z.object({
  type: z.string().max(100),
  text: z.string().optional(),
}).passthrough()

const uiMessageSchema = z.object({
  id: z.string().max(100),
  role: z.enum(['user', 'assistant', 'system']),
  parts: z.array(uiMessagePartSchema).max(50),
}).passthrough()

export const chatRequestSchema = z.object({
  messages: z
    .array(uiMessageSchema)
    .min(1, 'At least one message is required')
    .max(50, 'Conversation too long'),
})

export type ChatRequest = z.infer<typeof chatRequestSchema>

export function validateChatRequest(body: unknown):
  | { success: true; data: ChatRequest }
  | { success: false; error: string } {
  const result = chatRequestSchema.safeParse(body)
  if (!result.success) {
    const firstError = result.error.issues?.[0]
    return { success: false, error: firstError?.message ?? 'Invalid request' }
  }

  const lastMessage = result.data.messages.at(-1)
  if (lastMessage?.role !== 'user') {
    return { success: false, error: 'Last message must be from the user' }
  }

  return { success: true, data: result.data }
}
