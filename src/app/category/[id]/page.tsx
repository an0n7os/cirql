'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, ShieldCheck, ChevronLeft, ArrowRight, Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'

const mockProviders = [
  {
    id: '1',
    name: 'Suresh Kumar',
    avatar: '/logo.png', 
    rating: 4.8,
    reviews: 124,
    distance: '1.2 km',
    isVerified: true,
    bio: 'Expert plumber with 10 years of experience in residential repairs.',
    price: '₹200/hr'
  },
  {
    id: '2',
    name: 'Anish V.M.',
    avatar: '/logo.png',
    rating: 4.5,
    reviews: 89,
    distance: '3.5 km',
    isVerified: true,
    bio: 'Specialist in leak detection and new pipe installations.',
    price: '₹250/hr'
  },
  {
    id: '3',
    name: 'Ramesh Nair',
    avatar: '/logo.png',
    rating: 4.2,
    reviews: 56,
    distance: '2.8 km',
    isVerified: false,
    bio: 'General plumbing and bathroom fittings.',
    price: '₹150/hr'
  }
]

export default function CategoryPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise)
  const id = params.id
  const { user } = useAuth()
  const categoryName = id.charAt(0).toUpperCase() + id.slice(1)
  const [rated, setRated] = useState<Record<string, number>>({})

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl px-6 py-6 flex items-center gap-4 transition-all duration-500">
        <Link href="/" className="p-2 hover:bg-muted rounded-2xl transition-all active:scale-90">
          <ChevronLeft className="w-7 h-7 text-foreground" />
        </Link>
        <h1 className="text-2xl font-black tracking-tight text-foreground">{categoryName}s in Thrissur</h1>
      </header>

      {/* Provider List */}
      <div className="p-8 space-y-8 max-w-4xl mx-auto animate-in">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{mockProviders.length} experts available</span>
          <button className="px-5 py-2 rounded-full bg-muted border border-border text-[10px] font-black uppercase tracking-[0.2em] hover:bg-background transition-all shadow-sm">Filter</button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {mockProviders.map((provider) => (
            <div key={provider.id} className="glass-card p-7 rounded-4xl transition-all duration-500 ios-shadow hover:-translate-y-2">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative w-full md:w-28 h-48 md:h-28 rounded-3xl overflow-hidden shrink-0 border border-border shadow-inner bg-muted">
                  <Image src={provider.avatar} alt={provider.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-2xl tracking-tight text-foreground">{provider.name}</h3>
                      {provider.isVerified && <ShieldCheck className="w-5 h-5 text-primary" />}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-black bg-primary text-primary-foreground px-3 py-1 rounded-xl shadow-lg shadow-primary/10">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{provider.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 text-[10px] text-muted-foreground font-black uppercase tracking-[0.15em]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{provider.distance}</span>
                    </div>
                    <span>{provider.reviews} reviews</span>
                    <span className="text-primary font-black text-sm tracking-tight">{provider.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-2">{provider.bio}</p>
                </div>
              </div>
              
              <div className="mt-7 pt-7 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
                  <div className="bg-muted/50 p-3 rounded-2xl text-center">
                    <p className="text-[8px] font-black text-muted-foreground uppercase">Jobs</p>
                    <p className="text-xs font-black text-foreground">120+</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-2xl text-center">
                    <p className="text-[8px] font-black text-muted-foreground uppercase">Rating</p>
                    <div className="flex items-center justify-center gap-0.5">
                      <Sparkles className="w-3 h-3 text-primary fill-primary" />
                      <p className="text-xs font-black text-foreground">{rated[provider.id] || provider.rating}</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-2xl text-center">
                    <p className="text-[8px] font-black text-muted-foreground uppercase">Experience</p>
                    <p className="text-xs font-black text-foreground">5y+</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        onClick={() => setRated({...rated, [provider.id]: star})}
                        className={`transition-all hover:scale-110 ${rated[provider.id] >= star ? 'text-primary' : 'text-muted-foreground'}`}
                      >
                        <Sparkles className={`w-4 h-4 ${rated[provider.id] >= star ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Rate this Expert</span>
                </div>
              </div>

              <Link 
                href={user?.isLoggedIn ? `/book/${id}?provider=${provider.id}` : `/login`}
                className="w-full mt-6 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                Book Service Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
