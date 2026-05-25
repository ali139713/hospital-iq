import { z } from 'zod'

const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1).max(1000),
})

export const chatRequestSchema = z.object({
  messages: z
    .array(messageSchema)
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
