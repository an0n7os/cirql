'use client'

import { use, useState, useEffect, useRef } from 'react'
import { ChevronLeft, Phone, MoreVertical, Send, Paperclip, Smile } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const mockMessages = [
  { id: 1, sender: 'provider', text: 'Hello! I am on my way.', time: '10:00 AM' },
  { id: 2, sender: 'customer', text: 'Great, thank you. Do you need any specific tools?', time: '10:02 AM' },
  { id: 3, sender: 'provider', text: 'No, I have everything. See you in 15 mins.', time: '10:05 AM' },
]

export default function ChatPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise)
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!input) return
    const newMessage = {
      id: messages.length + 1,
      sender: 'customer',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, newMessage])
    setInput('')
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <main className="min-h-screen bg-muted/10 flex flex-col max-w-2xl mx-auto shadow-2xl">
      {/* Chat Header */}
      <header className="p-4 glass border-b border-border flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/bookings" className="p-2 hover:bg-muted rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
            <Image src="/logo.png" alt="Provider" fill className="object-cover" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <h2 className="text-sm font-black">Suresh Kumar</h2>
            <p className="text-[10px] font-bold text-green-500 uppercase">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded-full text-muted-foreground">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-muted rounded-full text-muted-foreground">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 p-6 space-y-4 overflow-y-auto"
      >
        <div className="text-center py-4">
          <span className="text-[10px] font-black text-muted-foreground bg-muted px-3 py-1 rounded-full uppercase tracking-widest">Today</span>
        </div>
        
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.sender === 'customer' ? 'bg-primary text-white rounded-tr-none' : 'bg-background border border-border rounded-tl-none'}`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[9px] mt-2 font-bold opacity-70 ${msg.sender === 'customer' ? 'text-right' : 'text-left'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 glass border-t border-border pb-10">
        <div className="flex items-center gap-2 bg-background border border-border rounded-2xl p-2 shadow-sm">
          <button className="p-2 hover:bg-muted rounded-xl text-muted-foreground">
            <Paperclip className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="p-2 hover:bg-muted rounded-xl text-muted-foreground">
            <Smile className="w-5 h-5" />
          </button>
          <button 
            onClick={handleSend}
            className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  )
}
