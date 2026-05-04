'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Wrench, Zap, AirVent, Sparkles, UtensilsCrossed, ArrowRight, ShieldCheck, Clock, MapPin, Search, Calendar, CheckCircle2, Moon, Sun, CloudRain, MessageSquare, Star } from 'lucide-react'
import WaitlistForm from '@/components/WaitlistForm'
import { useLanguage } from '@/lib/LanguageContext'
import { useTheme } from '@/lib/ThemeContext'
import { useAuth } from '@/lib/AuthContext'

const categories = [
  { name: 'Plumber', icon: Wrench, description: 'Leaking pipes or new installations' },
  { name: 'Electrician', icon: Zap, description: 'Wiring, repairs, and installations' },
  { name: 'AC Repair', icon: AirVent, description: 'Cooling solutions for your home' },
  { name: 'Cleaning', icon: Sparkles, description: 'Deep clean for a fresh space' },
  { name: 'Sadhya Cook', icon: UtensilsCrossed, description: 'Authentic Kerala feasts at home' },
]

export default function Home() {
  const { t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [weather, setWeather] = useState({ condition: 'Rain', temp: '28°C' })

  return (

    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Weather Widget */}
        <div className="absolute top-10 right-10 z-10 glass-card p-4 rounded-3xl flex flex-col items-center gap-1 group hover:border-primary/30 transition-colors cursor-default hidden md:flex">
          {weather.condition === 'Rain' ? <CloudRain className="w-6 h-6 text-primary animate-bounce" /> : <Sun className="w-6 h-6 text-orange-400" />}
          <span className="text-xs font-black">{weather.temp}</span>
          <span className="eyebrow flex items-center gap-1">
            Thrissur <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
          </span>
        </div>

        {/* Light Background Glows */}
        <div className="absolute rounded-full pointer-events-none bg-primary/10 blur-[100px] w-[700px] h-[700px] -top-[20%] -left-[10%]" />
        <div className="absolute rounded-full pointer-events-none bg-secondary/10 blur-[110px] w-[700px] h-[700px] -bottom-[20%] -right-[10%]" />

        <div className="relative z-10 max-w-6xl w-full text-center space-y-10 animate-in">
          {/* Ultra Premium Location Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-muted/30 backdrop-blur-md border border-border shadow-[0_0_40px_-10px_rgba(0,196,204,0.2)] animate-float mx-auto">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="eyebrow text-foreground/80 tracking-[0.3em]">Exclusive to Thrissur</span>
          </div>

          <div className="space-y-6 py-4">
            <h1 className="h-display text-foreground">
              Elite experts.<br/>
              <span className="gradient-text pb-4 inline-block">
                Effortless living.
              </span>
            </h1>
          </div>


          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            Experience Thrissur's most premium hyper-local network. Uncompromising quality, verified experts, and zero delays. Because your home deserves the absolute best.
          </p>

          {/* World-Class Hyperlocal Search Bar */}
          <div className="pt-8 space-y-8 max-w-3xl mx-auto">
            <div className="relative group p-2 bg-white/60 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-primary/5 rounded-[2.5rem]">
              <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <input 
                type="text" 
                placeholder="What do you need help with?" 
                className="w-full pl-16 pr-40 py-6 rounded-full bg-transparent focus:outline-none text-foreground font-bold text-xl placeholder:text-muted-foreground/60 transition-all"
              />
              <button className="absolute inset-y-3 right-3 px-8 bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95 text-white rounded-[2rem] font-black text-sm md:text-base transition-all shadow-lg shadow-primary/20">
                Search
              </button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-black text-muted-foreground uppercase tracking-widest mr-2">Popular near you:</span>
              {['❄️ AC Service', '🚰 Plumber', '🧹 Cleaning', '⚡ Electrician'].map(service => (
                <button key={service} className="px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-border text-xs font-black text-foreground hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-1 transition-all shadow-sm">
                  {service}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 pt-4 opacity-80">
            <div className="flex -space-x-3">
              {[
                "https://i.pravatar.cc/100?img=33",
                "https://i.pravatar.cc/100?img=47",
                "https://i.pravatar.cc/100?img=12",
                "https://i.pravatar.cc/100?img=5",
              ].map((img, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                  <img src={img} alt={`user-${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-muted-foreground">Trusted by <span className="text-foreground">5,000+</span> locals in Thrissur</p>
          </div>
        </div>
      </section>

      {/* Trending in Thrissur */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <h2 className="text-2xl font-black tracking-tight text-foreground">Trending in Thrissur</h2>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-8 -mx-6 px-6">
          {[
            { title: 'AC Deep Cleaning', price: '₹999', rating: '4.9', views: '200+ booked today' },
            { title: 'Full Home Cleaning', price: '₹2,499', rating: '4.8', views: 'Trending in Ayyanthole' },
            { title: 'Plumbing Repairs', price: 'Starts at ₹299', rating: '4.9', views: 'High demand' }
          ].map((item, idx) => (
            <div key={idx} className="glass-card min-w-[280px] p-6 rounded-3xl snap-center shrink-0 border border-red-500/10 bg-gradient-to-br from-background to-red-50/50">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black bg-red-500/10 text-red-600 px-3 py-1 rounded-full uppercase tracking-widest">Hot</span>
                <span className="text-sm font-bold text-foreground">★ {item.rating}</span>
              </div>
              <h3 className="text-lg font-black text-foreground mb-1">{item.title}</h3>
              <p className="text-primary font-bold text-lg mb-4">{item.price}</p>
              <p className="text-xs font-medium text-muted-foreground">{item.views}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto border-t border-border">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">How Vattam Works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Three simple steps to connect with trusted locals.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-12 relative">
          {/* Connector Line (Workwave Gradient) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-24 blur-sm" />
          
          {[
            { step: '01', title: 'Find a Service', desc: 'Browse through our curated list of essential home services.', icon: Search },
            { step: '02', title: 'Schedule Expert', desc: 'Choose a time slot and get matched with a verified local expert.', icon: Calendar },
            { step: '03', title: 'Relax & Enjoy', desc: 'Our pro arrives on time and gets the job done. Pay after service.', icon: Zap }
          ].map((item, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-8 group">
              <div className="w-28 h-28 rounded-[2.5rem] glass-card flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 animate-float" style={{ animationDelay: `${idx * 0.5}s` }}>
                <item.icon className="w-12 h-12" />
                <span className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-black text-xs font-black flex items-center justify-center border-4 border-background shadow-2xl shadow-primary/40">{item.step}</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black tracking-tight text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium px-4">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">Expert Solutions</h2>
            <p className="text-muted-foreground text-lg max-w-xl">Reliable home solutions, delivered by vetted Vattam Pros.</p>
          </div>
          <button className="text-primary font-black flex items-center gap-2 group tracking-tight text-lg">
            View All Experts 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-6 px-6">
          {categories.map((category, idx) => (
            <Link 
              key={idx}
              href={`/category/${category.name.toLowerCase()}`}
              className="group glass-card p-8 rounded-4xl hover:border-primary/50 hover:scale-105 hover:-rotate-1 active:scale-95 transition-all duration-500 snap-center shrink-0 w-[280px] md:w-auto md:flex-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted border border-border flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <category.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black mb-2 tracking-tight text-foreground">{category.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Safety Section -> Vattam Promise */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                <ShieldCheck className="w-4 h-4" />
                The Vattam Promise
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">100% Trust. Zero Worries.</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">Every Vattam Pro is thoroughly vetted. If something goes wrong, we've got you covered.</p>
            </div>
            
            <div className="space-y-6">
              {[
                { title: 'Background Verified', desc: '100% of our pros undergo a rigorous background and police verification process.' },
                { title: 'Standard Pricing', desc: 'No more haggling. Transparent, fixed pricing for every service before we start.' },
                { title: 'Insurance Covered', desc: 'All services are insured up to â‚¹10,000 against any accidental damage.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground font-medium text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-4xl overflow-hidden shadow-2xl">
            <Image src="/hero-bg.png" alt="Safety First" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 p-8 glass-card bg-white/90 backdrop-blur-2xl rounded-3xl border border-border">
              <p className="text-foreground text-lg font-bold leading-tight italic">"Vattam makes me feel safe. I know exactly who is coming to my home."</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-lg">AK</div>
                <div>
                  <p className="text-foreground text-sm font-black uppercase tracking-widest">Anita Kumar</p>
                  <p className="text-muted-foreground text-[10px] font-black">Thrissur Resident</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section -> Naattukaarude Vakkukal */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">Naattukaarude Vakkukal</h2>
          <p className="text-muted-foreground text-lg">Why Thrissur loves Vattam.</p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Rahul R.',
              location: 'Punkunnam',
              quote: 'Booked an electrician at 9 AM, he was here by 9:30. Absolutely brilliant service and no haggling over prices.',
              img: 'https://i.pravatar.cc/150?img=11'
            },
            {
              name: 'Sneha Menon',
              location: 'Kuriachira',
              quote: 'Finally an app that works in Thrissur! The house cleaning team was extremely professional and thorough.',
              img: 'https://i.pravatar.cc/150?img=5'
            },
            {
              name: 'George K.',
              location: 'Ayyanthole',
              quote: 'My AC broke down during the peak summer. Vattam Pro fixed it the same day. Highly recommended!',
              img: 'https://i.pravatar.cc/150?img=14'
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="glass-card p-8 rounded-[2rem] space-y-6 hover:scale-105 transition-transform duration-500">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-foreground font-medium leading-relaxed italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4 mt-auto pt-4">
                <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                <div>
                  <h4 className="text-sm font-black text-foreground">{testimonial.name}</h4>
                  <p className="text-xs font-bold text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 p-1.5 rounded-xl border border-border/40 bg-card/30 backdrop-blur-md shadow-sm">
              <img src="/brand-logo.png" alt="Cirql Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground">cirql</span>
          </div>
          <p className="text-muted-foreground text-sm font-medium">© 2024 Cirql Platform. All rights reserved. Designed for Kerala.</p>
          <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-primary transition-colors">WhatsApp</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
