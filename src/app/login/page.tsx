'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Phone, ArrowRight, Loader2, ShieldCheck } from 'lucide-react'

import { useAuth } from '@/lib/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    setStep(2)
  }

  const handleVerifyOtp = async () => {
    setLoading(true)
    await login(phone)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col p-8 pt-20 relative overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="bg-glow-primary w-[100%] h-[100%] top-[-10%] left-[-10%] animate-pulse-glow" />
      <div className="bg-glow-secondary w-[100%] h-[100%] bottom-[-10%] right-[-10%] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="flex-1 max-w-sm mx-auto w-full space-y-12 relative z-10">
        <div className="space-y-8 text-center">
          <div className="w-24 h-24 p-3 rounded-4xl border border-border bg-white shadow-lg overflow-hidden mx-auto">
            <img src="/brand-logo.png" alt="Cirql" className="w-full h-full object-contain" />
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl font-black tracking-tight text-foreground leading-[0.9]">
              {step === 1 ? 'Job discovery made smart' : 'Verify Phone'}
            </h1>
            <p className="text-muted-foreground font-medium text-sm">
              {step === 1 ? 'Your neighbourhood, one click away.' : `We sent a code to +91 ${phone}`}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <span className="text-muted-foreground/50 font-black">+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="glass-input py-6 pl-16 text-xl font-black"
                />
              </div>
              <button 
                onClick={handleSendOtp}
                disabled={phone.length < 10 || loading}
                className="w-full premium-pill py-6 text-lg disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>Continue <ArrowRight className="w-6 h-6" /></>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input
                    key={i}
                    type="tel"
                    maxLength={1}
                    className="w-12 h-16 bg-white/5 border border-white/10 rounded-2xl text-center text-2xl font-black focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                  />
                ))}
              </div>
              <button 
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full premium-pill py-6 text-lg disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>Verify Code <ShieldCheck className="w-6 h-6" /></>
                )}
              </button>
              <button 
                onClick={() => setStep(1)}
                className="btn-ghost w-full py-2 text-[10px] uppercase tracking-widest"
              >
                Change Number
              </button>
            </div>
          )}

          <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">
              By continuing, you agree to Cirql's <span className="text-primary cursor-pointer underline">Terms</span> and <span className="text-primary cursor-pointer underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
