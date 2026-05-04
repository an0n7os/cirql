'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, CheckCircle2 } from 'lucide-react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!supabase) {
      // Demo mode: simulate a delay and success
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitted(true)
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }])

      if (error) throw error
      setSubmitted(true)
    } catch (err: any) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 p-10 glass-card rounded-[3rem] animate-in fade-in zoom-in duration-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 animate-pulse-glow" />
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
          <CheckCircle2 className="w-20 h-20 text-primary relative z-10 animate-[bounce_1s_ease-in-out]" />
        </div>
        <div className="space-y-2 relative z-10">
          <h3 className="text-3xl font-black text-center tracking-tight text-foreground">You're on the list!</h3>
          <p className="text-muted-foreground text-center font-medium">
            We'll notify you as soon as Cirql launches in Thrissur.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto relative">
      <input
        type="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-6 py-4 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] shadow-xl shadow-primary/20"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Join Waitlist'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2 absolute -bottom-8 left-0 right-0 text-center font-bold">{error}</p>}
    </form>
  )
}
