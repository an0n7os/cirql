'use client'

import { MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/70 backdrop-blur-xl border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center p-1 overflow-hidden">
             <img src="/brand-logo.png" alt="Cirql" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">Your Location</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-foreground">Thrissur</span>
              <MapPin className="w-3 h-3 text-primary" />
            </div>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border shadow-sm">
          <span className="text-xs font-black text-foreground">AK</span>
        </div>
      </div>
    </header>
  )
}
