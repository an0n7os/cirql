'use client'

import { useState } from 'react'
import { Star, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ReviewClient({ id }: { id: string }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 animate-bounce-subtle">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black">Thank You!</h1>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Your feedback helps us improve Vattam for everyone in Thrissur.
        </p>
        <Link 
          href="/" 
          className="w-full max-w-xs py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all"
        >
          Back to Home
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-32">
      <header className="p-6 glass border-b border-border flex items-center gap-4">
        <Link href="/bookings" className="p-2 hover:bg-muted rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Rate Service</h1>
      </header>

      <div className="p-8 max-w-xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-primary/20 shadow-lg">
            <Image src="/logo.png" alt="Provider" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-black">Suresh Kumar</h2>
            <p className="text-muted-foreground font-medium">Plumbing Service • 29 Apr 2024</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold">How was your experience?</h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="p-1 transition-transform hover:scale-125"
                >
                  <Star 
                    className={`w-10 h-10 ${star <= (hover || rating) ? 'fill-secondary text-secondary' : 'text-muted-foreground opacity-30'}`} 
                  />
                </button>
              ))}
            </div>
            <p className="text-sm font-black text-secondary uppercase tracking-widest mt-2">
              {rating === 1 && 'Terrible'}
              {rating === 2 && 'Poor'}
              {rating === 3 && 'Average'}
              {rating === 4 && 'Good'}
              {rating === 5 && 'Excellent!'}
            </p>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold">Write a review (Optional)</label>
            <textarea 
              placeholder="Tell us what you liked or how we can improve..."
              className="w-full h-32 p-4 rounded-2xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={rating === 0 || loading}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Submit Feedback'}
          </button>
        </div>
      </div>
    </main>
  )
}
