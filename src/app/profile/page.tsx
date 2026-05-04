'use client'

import { Settings, HelpCircle, LogOut, Bell, Shield, CreditCard, ChevronRight, Share2, Languages, Camera, Moon, Sun, ArrowRight, Sparkles, Zap, Info } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { useTheme } from '@/lib/ThemeContext'
import { useAuth } from '@/lib/AuthContext'

export default function ProfilePage() {
  const { language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <main className="min-h-screen bg-background flex flex-col p-6 pt-24 pb-32 relative overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="bg-glow-primary w-[600px] h-[600px] top-0 left-0" />
      <div className="bg-glow-secondary w-[600px] h-[600px] bottom-0 right-0" />

      <div className="max-w-2xl mx-auto w-full space-y-10 relative z-10">
        {/* Profile Header */}
        <div className="glass-card p-10 rounded-[3rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:bg-primary/20 transition-all duration-700" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative">
            <div className="relative">
              <div className="w-32 h-32 p-3 rounded-full border-2 border-border bg-white shadow-xl overflow-hidden">
                <img src="/brand-logo.png" alt="User" className="w-full h-full object-contain" />
              </div>
              <button className="absolute -bottom-2 -right-2 p-3 rounded-2xl bg-primary text-black shadow-2xl hover:scale-110 active:scale-95 transition-all">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-4xl font-black tracking-tight text-foreground leading-none">{user?.name || 'Guest User'}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-4 py-1 rounded-full bg-muted border border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {user?.phone || 'No phone'}
                </span>
                <span className="px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary">
                  Pro Member
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-8 rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary border border-border group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-foreground">App Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border">
                <span className="text-sm font-medium text-muted-foreground">Language</span>
                <button onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')} className="text-sm font-black text-primary uppercase">
                  {language === 'en' ? 'English' : 'Malayalam'}
                </button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border">
                <span className="text-sm font-medium text-muted-foreground">Theme</span>
                <button onClick={toggleTheme} className="text-sm font-black text-primary uppercase">
                  {theme === 'light' ? 'Light' : 'Dark'}
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-secondary border border-border group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-foreground">Security</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border">
                <span className="text-sm font-medium text-muted-foreground">Biometrics</span>
                <div className="w-10 h-5 bg-primary/20 rounded-full relative p-1 border border-primary/30">
                  <div className="w-3 h-3 bg-primary rounded-full absolute right-1" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border">
                <span className="text-sm font-medium text-muted-foreground">Privacy Policy</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              </div>
            </div>
          </div>
        </div>

        {/* App Info & Logout */}
        <div className="glass-card p-8 rounded-[2.5rem] space-y-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground/50 border border-border">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-black text-foreground">Cirql v2.1.0</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-1">Made with ❤️ in Kerala</p>
            </div>
          </div>

          <button 
            onClick={logout}
            className="w-full py-6 rounded-[2rem] bg-red-500/10 border border-red-500/20 text-red-400 font-black uppercase tracking-widest text-sm hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-500/5 active:scale-95"
          >
            Logout Securely
          </button>
        </div>
      </div>
    </main>
  )
}
