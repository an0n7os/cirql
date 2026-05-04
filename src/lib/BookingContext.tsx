'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from './supabase'

export type Booking = {
  id: string
  category: string
  provider: string
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'
  date: string
  time: string
  address: string
  price: string
  providerImage?: string
}

type BookingContextType = {
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'date'>) => Promise<void>
  updateBookingStatus: (id: string, status: Booking['status']) => Promise<void>
  loading: boolean
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch Bookings
  const fetchBookings = async () => {
    setLoading(true)
    
    // Attempt Supabase
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('id', { ascending: false })
        
        if (!error && data) {
          setBookings(data)
          setLoading(false)
          return
        }
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to local simulation", err)
      }
    }

    // High-Fidelity Simulation Fallback
    await new Promise(resolve => setTimeout(resolve, 800)) // Simulated Network Delay
    const saved = localStorage.getItem('cirql_bookings')
    if (saved) {
      setBookings(JSON.parse(saved))
    } else {
      // Default Mock Data if first time
      const initialMock: Booking[] = [
        {
          id: 'B001',
          category: 'Plumber',
          provider: 'Suresh Kumar',
          status: 'In Progress',
          date: 'Today',
          time: '4:00 PM',
          address: 'Flat 4B, Emerald Heights, Thrissur',
          price: '₹200 (estimated)',
          providerImage: '/logo.png'
        }
      ]
      setBookings(initialMock)
      localStorage.setItem('cirql_bookings', JSON.stringify(initialMock))
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const addBooking = async (newBooking: Omit<Booking, 'id' | 'status' | 'date'>) => {
    setLoading(true)
    const booking: Booking = {
      ...newBooking,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      date: 'Today',
      providerImage: '/logo.png'
    }

    if (supabase) {
      const { error } = await supabase.from('bookings').insert([booking])
      if (!error) {
        await fetchBookings()
        return
      }
    }

    // Simulation
    await new Promise(resolve => setTimeout(resolve, 1500)) // "Real" API latency
    const updated = [booking, ...bookings]
    setBookings(updated)
    localStorage.setItem('vattam_bookings', JSON.stringify(updated))
    setLoading(false)
  }

  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    if (supabase) {
      const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
      if (!error) {
        await fetchBookings()
        return
      }
    }

    // Simulation
    await new Promise(resolve => setTimeout(resolve, 600))
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b)
    setBookings(updated)
    localStorage.setItem('vattam_bookings', JSON.stringify(updated))
  }

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBookingStatus, loading }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBookings() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider')
  }
  return context
}
