'use client'

import { type FormEvent, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SUGGESTED_PROMPTS = [
  'Show hospitals with cardiac care',
  'Find emergency hospitals in DHA',
  'Compare Shaukat Khanum and Doctors Hospital',
  'Show all hospitals on a map',
  'Which hospitals have oncology?',
  'Give me analytics on specialties',
]

interface ChatInputProps {
  input: string
  isLoading: boolean
  onInputChange: (value: string) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onSuggestedPrompt: (prompt: string) => void
  showSuggestions: boolean
}

export function ChatInput({
  input,
  isLoading,
  onInputChange,
  onSubmit,
  onSuggestedPrompt,
  showSuggestions,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        const form = e.currentTarget.closest('form')
        form?.requestSubmit()
      }
    }
  }

  return (
    <div className="border-t bg-background px-4 py-3">
      {showSuggestions && (
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onSuggestedPrompt(prompt)}
              className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about hospitals in Lahore…"
          rows={1}
          disabled={isLoading}
          className="min-h-[44px] max-h-32 flex-1 resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className="h-11 w-11 shrink-0 rounded-xl"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Press <kbd className="rounded border px-1 font-mono text-[10px]">Enter</kbd> to send ·{' '}
        <kbd className="rounded border px-1 font-mono text-[10px]">Shift+Enter</kbd> for new line
      </p>
    </div>
  )
}
