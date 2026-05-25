'use client'

import { useState, useEffect } from 'react'
import { useChat } from 'ai/react'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { Activity, Sun, Moon } from 'lucide-react'

export function ChatInterface() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggleDark() {
    const next = !isDark
    document.documentElement.classList.toggle('dark', next)
    setIsDark(next)
  }

  const { messages, input, isLoading, handleInputChange, handleSubmit, setInput, error } = useChat({
    api: '/api/v1/chat',
    maxSteps: 3,
    onError(err: Error) {
      console.error('Chat error:', err)
    },
  })

  function handleSuggestedPrompt(prompt: string) {
    setInput(prompt)
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">Hospital Analytics</h1>
            <p className="text-xs text-muted-foreground">Lahore, Pakistan · 30 hospitals</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
          <button
            onClick={toggleDark}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Error banner */}
      {error && (
        <div className="border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {error.message.includes('429')
            ? 'Rate limit reached. Please wait a moment before sending another message.'
            : 'Something went wrong. Please try again.'}
        </div>
      )}

      {/* Messages */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Input */}
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={(v) => handleInputChange({ target: { value: v } } as React.ChangeEvent<HTMLInputElement>)}
        onSubmit={handleSubmit}
        onSuggestedPrompt={handleSuggestedPrompt}
        showSuggestions={messages.length === 0}
      />
    </div>
  )
}
