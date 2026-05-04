'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from './supabase'

type User = {
  phone: string
  name: string
  isLoggedIn: boolean
  id?: string
}

type AuthContextType = {
  user: User | null
  login: (phone: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check Supabase Session
    const checkSession = async () => {
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser({
            id: session.user.id,
            phone: session.user.phone || '',
            name: session.user.user_metadata?.full_name || 'Thrissur User',
            isLoggedIn: true
          })
          setIsLoading(false)
          return
        }
      }

      // Fallback to local
      const savedUser = localStorage.getItem('cirql_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const login = async (phone: string) => {
    setIsLoading(true)
    
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithOtp({
          phone: `+91${phone}`,
        })
        if (!error) {
          // In a real app, we'd wait for OTP verification. 
          // For this "Real-Simulation," we'll simulate the next step.
          await new Promise(resolve => setTimeout(resolve, 2000))
          const mockUser = { phone, name: 'Aslam K.', isLoggedIn: true, id: 'sb-user-123' }
          setUser(mockUser)
          localStorage.setItem('cirql_user', JSON.stringify(mockUser))
          setIsLoading(false)
          router.push('/')
          return
        }
      } catch (err) {
        console.error("Supabase login failed", err)
      }
    }

    // Simulation Fallback
    await new Promise(resolve => setTimeout(resolve, 1500))
    const mockUser = { phone, name: 'Aslam K.', isLoggedIn: true }
    setUser(mockUser)
    localStorage.setItem('cirql_user', JSON.stringify(mockUser))
    setIsLoading(false)
    router.push('/')
  }

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    setUser(null)
    localStorage.removeItem('cirql_user')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
