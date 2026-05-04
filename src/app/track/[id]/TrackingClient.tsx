'use client'

import { use, useState, useEffect } from 'react'
import { ChevronLeft, Phone, MessageSquare, MapPin, Navigation, Clock, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { useBookings } from '@/lib/BookingContext'

export default function TrackingClient({ id }: { id: string }) {
  const { bookings } = useBookings()
  const [progress, setProgress] = useState(30)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)

  const booking = bookings.find(b => b.id === id) || bookings[0]

  useEffect(() => {
    // Real-world Geolocation API (Local & Free)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }, (error) => {
        console.warn("Location permission denied, using default Thrissur center.")
      })
    }

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 0.5 : prev))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="p-4 bg-background/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-50 transition-all duration-500">
        <div className="flex items-center gap-3">
          <Link href="/bookings" className="p-2 hover:bg-muted/50 rounded-2xl transition-all active:scale-90">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h2 className="text-sm font-black uppercase tracking-tighter">On the Way</h2>
            <p className="text-[10px] font-bold text-primary">ARRIVING IN 8 MINS</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-2xl bg-muted/50 text-primary flex items-center justify-center transition-all active:scale-90">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Live Map Background (Radar View) */}
      <div className="flex-1 relative bg-[#0a0a0a] overflow-hidden">
        {/* Animated Radar Grid */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle, #5DD62C 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Pulsing Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[300px] h-[300px] rounded-full border border-primary/20 animate-ping duration-[4000ms]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/10 animate-ping duration-[6000ms] delay-1000" />
        </div>

        {/* Thrissur Landmarks (Simulated Map Points) */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary/40 rounded-full blur-sm" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-primary/40 rounded-full blur-sm" />
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-primary/40 rounded-full blur-sm" />

        {/* Status Indicator */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
          <div className="bg-background/80 backdrop-blur-md border border-primary/20 px-4 py-2 rounded-full flex items-center gap-3 shadow-xl">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
              {userLocation ? 'GPS: Active Tracking' : 'Scanning Thrissur...'}
            </span>
          </div>
        </div>

        {/* Destination (Your Home) */}
        <div className="absolute top-[20%] left-[20%] z-20">
          <div className="relative">
            <div className="absolute -top-10 -left-12 bg-card border border-border px-3 py-1 rounded-lg text-[10px] font-black shadow-lg whitespace-nowrap">
              {userLocation ? '📍 YOUR LIVE LOCATION' : 'YOUR HOME'}
            </div>
            <MapPin className="w-10 h-10 text-primary fill-primary/20 animate-bounce" />
          </div>
        </div>

        {/* Provider Location Dot */}
        <div 
          className="absolute transition-all duration-[2000ms] ease-linear z-10"
          style={{ 
            top: `${80 - (progress / 1.5)}%`, 
            left: `${80 - (progress / 1.5)}%` 
          }}
        >
          <div className="relative">
            <div className="absolute -top-16 -left-20 bg-card border border-border px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 min-w-[150px] animate-bounce-subtle z-30">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
                <Image src={booking?.providerImage || '/logo.png'} alt={booking?.provider || 'Suresh'} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-primary uppercase">{booking?.provider.split(' ')[0]}</p>
                <p className="text-[8px] font-bold text-muted-foreground whitespace-nowrap">Near Swaraj Round</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-ping absolute -inset-1" />
            <div className="relative w-12 h-12 rounded-full bg-primary border-4 border-background shadow-xl flex items-center justify-center text-primary-foreground">
              <Navigation className="w-6 h-6 rotate-45" />
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="p-6 bg-background/80 backdrop-blur-xl border-t border-border space-y-6 rounded-t-[40px] shadow-2xl relative z-10 animate-in pb-32 md:pb-6">
        <div className="w-12 h-1 bg-muted rounded-full mx-auto" />
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20">
              <Image src={booking?.providerImage || '/logo.png'} alt={booking?.provider || 'Suresh'} fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-black">{booking?.provider || 'Suresh Kumar'}</h3>
              <div className="flex items-center gap-1 text-xs font-bold text-primary">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Platinum Provider</span>
              </div>
            </div>
          </div>
          <Link 
            href="/chat/1"
            className="w-12 h-12 rounded-2xl bg-muted/50 text-primary flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
          >
            <MessageSquare className="w-6 h-6" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-muted/30 border border-border flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">ETA</p>
              <p className="text-sm font-black">8 Minutes</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-muted/30 border border-border flex items-center gap-3">
            <Navigation className="w-5 h-5 text-primary" />
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Distance</p>
              <p className="text-sm font-black">1.2 KM</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-xs font-medium text-muted-foreground">For your safety, verify the provider using the OTP shown in your booking details before letting them in.</p>
        </div>
      </div>
    </main>
  )
}
