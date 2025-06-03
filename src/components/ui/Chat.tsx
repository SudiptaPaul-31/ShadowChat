"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button } from './button'
import Loader from './Loader'

interface Message {
  id: string
  content: string
  sender: 'user' | 'other'
  timestamp: Date
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate response (replace with actual API call)
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: 'This is a simulated response.',
        sender: 'other',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-background border rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="p-4 border-b bg-muted/50">
        <h2 className="text-xl font-semibold">Chat</h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3">
              <Loader />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" disabled={!inputMessage.trim() || isLoading}>
            Send
          </Button>
        </div>
      </form>
    </div>
  )
} 