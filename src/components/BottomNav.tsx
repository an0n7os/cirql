'use client'

import { Home, Search, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useBookings } from '@/lib/BookingContext'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Services', href: '/#services' },
  { icon: Calendar, label: 'Bookings', href: '/bookings' },
  { icon: User, label: 'Profile', href: '/profile' },
]

export default function BottomNav() {
  const pathname = usePathname()
  const { bookings } = useBookings()
  const activeCount = bookings.filter(b => b.status === 'In Progress' || b.status === 'Pending').length

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm">
      <div className="glass-card rounded-[2.5rem] p-2 flex justify-around items-center px-4 shadow-xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex flex-col items-center py-2 px-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative group active:scale-90 ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-md animate-pulse" />
              )}
              <div className="relative">
                <item.icon className={`w-6 h-6 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                {item.label === 'Bookings' && activeCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[8px] font-black rounded-full flex items-center justify-center border-2 border-background">
                    {activeCount}
                  </span>
                )}
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest mt-1 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isActive ? 'opacity-100 h-auto' : 'opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
