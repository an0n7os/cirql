'use client'

import { Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

const items = [
  "🎉 Thrissur Pooram preparations in full swing at Thekkinkadu Maidanam",
  "🌧️ Heavy rain this evening — book a Roof Checkup",
  "🚧 Traffic alert near Swaraj Round — plan your commute",
]

export default function LiveTicker() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % items.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="w-full h-10 bg-slate-50 border-y border-border flex items-center px-6 overflow-hidden mt-16">
      <div className="flex items-center gap-3 animate-in">
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[8px] font-black uppercase tracking-widest">
          <Zap className="w-2.5 h-2.5 fill-current" strokeWidth={0} />
          Live Pulse
        </span>
        <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
          {items[idx]}
        </span>
      </div>
    </div>
  )
}
