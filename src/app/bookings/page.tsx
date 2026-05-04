'use client'

import { Calendar, Clock, MapPin, ChevronRight, Zap, Clock3, User, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useBookings } from '@/lib/BookingContext'
import { useLanguage } from '@/lib/LanguageContext'
import { useRouter } from 'next/navigation'

export default function BookingsPage() {
  const { bookings } = useBookings()
  const { language } = useLanguage()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Active')

  const filteredBookings = bookings.filter(b => 
    activeTab === 'Active' ? (b.status === 'In Progress' || b.status === 'Pending') : (b.status === 'Completed' || b.status === 'Cancelled')
  )

  return (
    <main className="min-h-screen bg-background flex flex-col p-6 pt-24 pb-32 relative overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="bg-glow-primary w-[600px] h-[600px] top-0 right-0" />
      <div className="bg-glow-secondary w-[600px] h-[600px] bottom-0 left-0" />

      <div className="max-w-2xl mx-auto w-full space-y-10 relative z-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tight text-foreground leading-[0.9]">My Bookings</h1>
          <p className="text-muted-foreground font-medium text-lg">Track your active and past home services.</p>
        </div>

        <div className="tab-bar">
          {['Active', 'History'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-item ${activeTab === tab ? 'tab-item-active' : 'tab-item-inactive'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="glass-card p-16 rounded-[3rem] text-center space-y-8">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <Search className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <div className="space-y-2">
                <p className="text-foreground font-black text-xl">No {activeTab.toLowerCase()} bookings</p>
                <p className="text-muted-foreground text-sm">Everything you book will appear here.</p>
              </div>
              {activeTab === 'Active' && (
                <button onClick={() => router.push('/')} className="premium-pill">
                  Explore Services
                </button>
              )}
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="glass-card p-8 rounded-[3rem] hover:border-primary/40 active:scale-[0.98] transition-all group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-primary border border-white/10 group-hover:scale-110 transition-transform">
                      {booking.id.startsWith('B-') ? <Zap className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{booking.id}</span>
                      <h3 className="text-2xl font-black text-foreground">{booking.category || booking.service}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{booking.date} • {booking.time}</p>
                    </div>
                  </div>
                  <div className={`${
                    booking.status === 'Completed' ? 'badge-done' :
                    booking.status === 'In Progress' ? 'badge-active' : 'badge-pending'
                  }`}>
                    {booking.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <User className="w-5 h-5 text-primary" />
                    <span className="text-sm font-black text-foreground">{booking.provider}</span>
                  </div>
                  <div className="flex items-center justify-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-xl font-black text-primary">₹{booking.price}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 px-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-medium text-muted-foreground line-clamp-1">{booking.address}</span>
                  </div>
                  <Link 
                    href={booking.status === 'In Progress' ? `/track/${booking.id}` : '#'}
                    className="w-full premium-pill py-5 text-center block text-base"
                  >
                    {booking.status === 'In Progress' ? 'Track Live' : 'View Receipt'}
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
