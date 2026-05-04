'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Wrench, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  MoreVertical,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  ShieldCheck,
  Search,
  Zap,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Loader2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { useBookings } from '@/lib/BookingContext'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const { bookings, updateBookingStatus } = useBookings()
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddingProvider, setIsAddingProvider] = useState(false)
  const [withdrawing, setWithdrawing] = useState(false)
  
  const [platformSettings, setPlatformSettings] = useState({
    surgePricing: true,
    newRegistrations: true,
    publicReviews: false,
    autoAssign: true
  })

  const [providers, setProviders] = useState([
    { id: 'P-101', name: 'Manoj P.', category: 'Plumbing', status: 'Verified', rating: 4.8, jobs: 124 },
    { id: 'P-102', name: 'Sajith V.', category: 'Electrician', status: 'Pending', rating: 0, jobs: 0 },
    { id: 'P-103', name: 'Leela R.', category: 'Cleaning', status: 'Verified', rating: 4.5, jobs: 56 },
  ])

  const approveProvider = (id: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, status: 'Verified' } : p))
  }

  const toggleSetting = (key: keyof typeof platformSettings) => {
    setPlatformSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleWithdraw = async () => {
    setWithdrawing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setWithdrawing(false)
    alert('Withdrawal of ₹84,290 successful! Funds will reach your bank in 24 hours.')
  }

  const stats = [
    { label: 'Total Bookings', value: bookings.length.toString(), trend: '+12%', icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Active Providers', value: providers.filter(p => p.status === 'Verified').length.toString(), trend: '+5%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Revenue', value: '₹2.4L', trend: '+18%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Avg. Rating', value: '4.8', trend: '+0.2', icon: ShieldCheck, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ]

  const filteredBookings = bookings.filter(b => 
    b.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredProviders = providers.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Bookings', icon: ClipboardList },
    { name: 'Providers', icon: Users },
    { name: 'Financials', icon: TrendingUp },
    { name: 'Settings', icon: Settings },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row relative">
      {/* Add Provider Modal (Simulated) */}
      {isAddingProvider && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-card w-full max-w-md p-8 rounded-4xl border border-white/5 ios-shadow space-y-6">
            <h3 className="text-2xl font-black">Add New Provider</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-4 rounded-2xl bg-muted border border-border outline-none focus:ring-2 focus:ring-primary" />
              <select className="w-full p-4 rounded-2xl bg-muted border border-border outline-none focus:ring-2 focus:ring-primary">
                <option>Select Category</option>
                <option>Plumbing</option>
                <option>Electrician</option>
                <option>Cleaning</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setIsAddingProvider(false)} className="flex-1 py-4 rounded-2xl bg-muted font-bold">Cancel</button>
              <button onClick={() => {
                setProviders([...providers, { id: `P-${Date.now()}`, name: 'New Provider', category: 'General', status: 'Pending', rating: 0, jobs: 0 }])
                setIsAddingProvider(false)
              }} className="flex-1 py-4 rounded-2xl bg-primary text-primary-foreground font-black">Add to Cirql</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-background/80 backdrop-blur-xl border-r border-border p-8 space-y-12 flex flex-col ios-shadow z-20 transition-all duration-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-card border border-border p-0.5 shadow-lg shadow-black/5">
            <Image src="/logo.png" alt="Cirql" width={40} height={40} className="rounded-[10px]" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-foreground">cirql <span className="text-[10px] uppercase tracking-widest text-primary ml-1">Admin</span></span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button 
              key={item.name}
              onClick={() => { setActiveTab(item.name); setSearchQuery(''); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all active:scale-95 ${activeTab === item.name ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-border">
          <Link href="/" className="w-full py-4 bg-foreground text-background rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 p-8 md:p-12 space-y-12 overflow-y-auto animate-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-foreground">{activeTab === 'Dashboard' ? 'System Overview' : activeTab}</h1>
            <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">Thrissur Operations Center</p>
          </div>
          <div className="flex gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab.toLowerCase()}...`} 
                className="pl-12 pr-6 py-3 rounded-2xl border border-border bg-card ios-shadow text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64" 
              />
            </div>
            <button 
              onClick={() => activeTab === 'Providers' ? setIsAddingProvider(true) : null}
              className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-black shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              {activeTab === 'Providers' ? '+ Add Provider' : '+ New Service'}
            </button>
          </div>
        </div>

        {activeTab === 'Dashboard' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-card p-8 rounded-4xl border border-border ios-shadow space-y-6 transition-all hover:-translate-y-2">
                  <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-black bg-primary/10 text-primary px-2 py-1 rounded-lg">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.trend}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-3xl font-black tracking-tight text-foreground">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-card rounded-4xl border border-border ios-shadow overflow-hidden">
              <div className="p-8 border-b border-border flex justify-between items-center">
                <h3 className="text-xl font-black tracking-tight text-foreground">Live Operations</h3>
                <button onClick={() => setActiveTab('Bookings')} className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All Records</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-muted/30 text-left border-b border-border">
                      <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Booking ID</th>
                      <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Customer</th>
                      <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Service</th>
                      <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Time</th>
                      <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredBookings.slice(0, 5).map((booking, idx) => (
                      <tr 
                        key={idx} 
                        className="hover:bg-muted/50 transition-colors group cursor-pointer"
                        onClick={() => updateBookingStatus(booking.id, 'Completed')}
                      >
                        <td className="px-8 py-6 font-black text-xs text-muted-foreground">{booking.id}</td>
                        <td className="px-8 py-6 font-bold text-foreground">Aslam K.</td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                            {booking.category}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            booking.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 
                            booking.status === 'Pending' ? 'bg-orange-500/10 text-orange-500' : 'bg-primary/10 text-primary'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-sm font-medium text-muted-foreground">{booking.time}</td>
                        <td className="px-8 py-6 font-black text-foreground text-right">{booking.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Providers' && (
          <div className="bg-card rounded-4xl border border-border ios-shadow overflow-hidden">
            <div className="p-8 border-b border-border flex justify-between items-center">
              <h3 className="text-xl font-black tracking-tight text-foreground">Service Providers</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase tracking-widest">
                  {providers.filter(p => p.status === 'Pending').length} Pending Action
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/30 text-left border-b border-border">
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Provider</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Category</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredProviders.map((provider) => (
                    <tr key={provider.id} className="hover:bg-muted/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">
                            {provider.name[0]}
                          </div>
                          <div className="font-bold text-foreground">{provider.name}</div>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-medium text-muted-foreground">{provider.category}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          provider.status === 'Verified' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                        }`}>
                          {provider.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right space-x-3">
                        {provider.status === 'Pending' ? (
                          <>
                            <button onClick={() => approveProvider(provider.id)} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Approve</button>
                            <button className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Reject</button>
                          </>
                        ) : (
                          <button className="px-4 py-2 rounded-xl bg-muted text-muted-foreground text-[10px] font-black uppercase tracking-widest cursor-default">Management</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Financials' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-card p-8 rounded-4xl border border-border ios-shadow space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black tracking-tight text-foreground">Revenue Analytics</h3>
                <select className="bg-background border border-border rounded-xl px-4 py-2 text-xs font-bold text-muted-foreground outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-64 w-full relative flex items-end justify-between gap-2 px-4">
                {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
                  <div key={i} className="flex-1 group relative">
                    <div 
                      className="w-full bg-primary/20 group-hover:bg-primary/40 transition-all rounded-t-xl" 
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{(height * 100).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-[10px] font-black text-muted-foreground mt-4 text-center">Day {i+1}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-primary p-8 rounded-4xl text-primary-foreground space-y-6 shadow-2xl shadow-primary/20">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Available Payout</p>
                <h3 className="text-4xl font-black tracking-tighter">₹84,290.00</h3>
                <button 
                  onClick={handleWithdraw}
                  disabled={withdrawing}
                  className="w-full py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center"
                >
                  {withdrawing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Withdraw to Bank'}
                </button>
              </div>
              <div className="bg-card p-8 rounded-4xl border border-border ios-shadow space-y-4">
                <h4 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Recent Payouts</h4>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <div className="text-xs font-bold text-foreground">24 Apr 2024</div>
                    <div className="text-xs font-black text-primary">₹12,400</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Bookings' && (
          <div className="bg-card rounded-4xl border border-border ios-shadow overflow-hidden">
            <div className="p-8 border-b border-border flex justify-between items-center">
              <h3 className="text-xl font-black tracking-tight text-foreground">Master Booking Ledger</h3>
              <div className="flex gap-4">
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">Total: {bookings.length}</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/30 text-left border-b border-border">
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">ID</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Customer</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Category</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-8 py-6 text-xs font-black text-muted-foreground">{booking.id}</td>
                      <td className="px-8 py-6 font-bold text-foreground">Aslam K.</td>
                      <td className="px-8 py-6 font-medium text-muted-foreground">{booking.category}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          booking.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-black text-foreground text-right">{booking.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-4xl border border-border ios-shadow space-y-8">
              <h3 className="text-xl font-black tracking-tight text-foreground">Platform Controls</h3>
              <div className="space-y-6">
                {[
                  { id: 'surgePricing', name: 'Surge Pricing', desc: 'Automatically increase prices during peak demand.' },
                  { id: 'newRegistrations', name: 'New Registrations', desc: 'Allow new providers to apply to join.' },
                  { id: 'publicReviews', name: 'Public Reviews', desc: 'Show customer reviews on provider profiles.' },
                  { id: 'autoAssign', name: 'Auto-Assign Pro', desc: 'Automatically match providers to requests.' },
                ].map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-black text-sm text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <div 
                      onClick={() => toggleSetting(item.id as any)}
                      className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${platformSettings[item.id as keyof typeof platformSettings] ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${platformSettings[item.id as keyof typeof platformSettings] ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card p-8 rounded-4xl border border-border ios-shadow space-y-4">
               <h3 className="text-xl font-black tracking-tight text-foreground">System Health</h3>
               <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-4">
                 <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                 <p className="text-xs font-black text-green-500 uppercase tracking-widest">All Systems Operational</p>
               </div>
               <div className="space-y-2 pt-4">
                 <p className="text-xs text-muted-foreground font-medium">Server Latency: <span className="text-foreground font-black">24ms</span></p>
                 <p className="text-xs text-muted-foreground font-medium">Database Load: <span className="text-foreground font-black">12%</span></p>
                 <p className="text-xs text-muted-foreground font-medium">API Requests: <span className="text-foreground font-black">1.2k/hr</span></p>
               </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
