'use client'

import { useState } from 'react'
import { LayoutDashboard, ListChecks, Wallet, UserCircle, Bell, ToggleRight, ToggleLeft, MapPin, Phone, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProviderDashboard() {
  const [isOnline, setIsOnline] = useState(true)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-6 glass border-b border-border flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
            <Image src="/logo.png" alt="Provider" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-sm font-black">Suresh Kumar</h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Platinum Provider</p>
          </div>
        </div>
        <button 
          onClick={() => setIsOnline(!isOnline)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all ${isOnline ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}
        >
          {isOnline ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
          {isOnline ? 'ONLINE' : 'OFFLINE'}
        </button>
      </header>

      <div className="p-6 space-y-8 max-w-2xl mx-auto pb-32">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase">Today's Earnings</p>
            <h3 className="text-2xl font-black text-primary">₹1,240</h3>
          </div>
          <div className="p-6 rounded-3xl bg-secondary/5 border border-secondary/20 space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase">Total Jobs</p>
            <h3 className="text-2xl font-black text-secondary-foreground">42</h3>
          </div>
        </div>

        {/* New Job Request */}
        <div className="space-y-4">
          <h3 className="font-black flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            New Requests (1)
          </h3>
          <div className="p-6 rounded-3xl bg-background border-2 border-primary/50 shadow-xl shadow-primary/5 space-y-4 animate-in zoom-in duration-500">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-black bg-primary text-white px-2 py-0.5 rounded-full">HIGH PRIORITY</span>
                <h4 className="text-xl font-bold">Kitchen Leakage</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Kalyan Nagar, Thrissur (1.5 km away)
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-muted-foreground">Estimated</p>
                <p className="text-lg font-black text-primary">₹300 - 500</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                Accept Job
              </button>
              <button className="px-4 py-3 rounded-2xl bg-muted text-muted-foreground font-bold text-sm">
                Decline
              </button>
            </div>
          </div>
        </div>

        {/* Active Job */}
        <div className="space-y-4">
          <h3 className="font-black">Ongoing Jobs</h3>
          <div className="p-5 rounded-3xl border border-border bg-muted/30 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-bold">Rahul Menon</h4>
                  <p className="text-[10px] text-muted-foreground font-black">CUSTOMER ID: 2930</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button className="w-full py-3 rounded-2xl border-2 border-primary/20 text-primary font-bold text-sm hover:bg-primary/5 transition-all">
              Mark as Completed
            </button>
          </div>
        </div>
      </div>

      {/* Provider Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border px-8 py-4 flex justify-between items-center pb-8">
        <button className="flex flex-col items-center gap-1 text-primary">
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold">DASHBOARD</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground">
          <ListChecks className="w-6 h-6" />
          <span className="text-[10px] font-bold">MY JOBS</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground">
          <Wallet className="w-6 h-6" />
          <span className="text-[10px] font-bold">EARNINGS</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground">
          <UserCircle className="w-6 h-6" />
          <span className="text-[10px] font-bold">PROFILE</span>
        </button>
      </nav>
    </main>
  )
}
