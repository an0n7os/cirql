'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Star, Clock, MapPin, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react'

import { useBookings } from '@/lib/BookingContext'

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  const { addBooking } = useBookings()

  const handleConfirm = () => {
    setIsSearching(true)
    // Simulate algorithmic matching (Uber dispatch)
    setTimeout(() => {
      setIsSearching(false)
      addBooking({
        category: 'Plumber', // This should be dynamic based on params
        provider: 'Suresh Kumar',
        time: 'Now',
        address: 'Flat 4B, Emerald Heights, Thrissur',
        price: '₹450'
      })
      setStep(3)
    }, 3500)
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-32">
      <header className="p-6 pt-12 space-y-6 max-w-2xl mx-auto animate-in">
        <Link href={`/category/plumber`} className="inline-flex items-center gap-2 text-muted-foreground font-black uppercase tracking-widest text-[10px] hover:text-primary transition-all active:scale-95 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Cancel Booking
        </Link>
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-foreground">Booking Details</h1>
            <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">Step {step} of 3</p>
          </div>
          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500" 
              style={{ width: `${(step/3)*100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="px-6 max-w-2xl mx-auto animate-in" style={{ animationDelay: '0.1s' }}>
        <div className="glass-card p-8 rounded-4xl ios-shadow space-y-8 relative overflow-hidden">
          
          {/* Uber-Style Dispatch Radar Overlay */}
          {isSearching && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl z-50 flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-32 h-32 bg-primary/20 rounded-full animate-ping" />
                <div className="absolute w-24 h-24 bg-primary/40 rounded-full animate-pulse" />
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center relative z-10 shadow-2xl shadow-primary/50">
                  <MapPin className="w-8 h-8 text-primary-foreground animate-bounce" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-foreground animate-pulse">Pinging nearby Pros...</h3>
                <p className="text-sm font-bold text-muted-foreground">Our algorithm is finding the best match in Thrissur.</p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-black text-foreground">What do you need help with?</h3>
              <div className="space-y-3">
                {['Leaking Pipe', 'New Installation', 'Clogged Drain', 'General Repair'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => setStep(2)}
                    className="w-full p-6 rounded-2xl bg-muted/50 border border-border hover:border-primary hover:bg-primary/5 text-left font-bold text-foreground transition-all group flex justify-between items-center"
                  >
                    {type}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <h3 className="text-xl font-black text-foreground">AI-Diagnosis Estimate</h3>
                <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                    <Sparkles className="w-4 h-4" />
                    Smart Scan Result
                  </div>
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    Based on your selection, this seems to be a standard repair. Estimated effort: <span className="font-black text-primary">45-60 mins</span>.
                  </p>
                  <div className="pt-4 border-t border-border/10 flex justify-between items-center">
                    <span className="text-muted-foreground font-bold">Estimated Cost</span>
                    <span className="text-2xl font-black text-primary">₹450 - ₹600</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleConfirm}
                disabled={isSearching}
                className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                Find Nearest Pro
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 text-center py-10 animate-in zoom-in duration-500">
              <div className="w-24 h-24 rounded-[2rem] bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/10">
                <CheckCircle className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-foreground tracking-tight">Pro Found!</h3>
                <p className="text-muted-foreground font-medium max-w-xs mx-auto">Suresh Kumar has accepted your request and is <span className="text-primary font-black">4 mins away</span>.</p>
              </div>
              
              <div className="mt-8 p-6 bg-muted/50 rounded-3xl border border-border flex items-center gap-4 text-left">
                <img src="https://i.pravatar.cc/150?img=11" alt="Pro" className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20" />
                <div>
                  <h4 className="font-black text-foreground text-lg">Suresh Kumar</h4>
                  <div className="flex items-center gap-1 text-sm font-bold text-yellow-500">
                    <Star className="w-4 h-4 fill-current" /> 4.9 <span className="text-muted-foreground font-medium ml-1">(240 jobs)</span>
                  </div>
                </div>
              </div>
              
              <Link href="/track/1" className="block w-full py-5 mt-4 bg-foreground text-background rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all">
                Track Live Location
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
