'use client'

import { useState } from 'react'
import { Search, Bell, ChevronDown, X } from 'lucide-react'

const notifications = [
  { id: 1, text: 'New lead "Acme Corp" assigned to you', time: '2m ago', unread: true },
  { id: 2, text: 'Lead "TechStart" moved to Qualified', time: '1h ago', unread: true },
  { id: 3, text: 'Monthly report is ready for download', time: '3h ago', unread: false },
]

interface TopbarProps {
  title?: string
}

export function Topbar({ title = 'Dashboard' }: TopbarProps) {
  const [search, setSearch] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 gap-4 relative" style={{ background: 'oklch(0.1 0.008 264)' }}>
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-foreground hidden md:block">{title}</h1>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads, contacts..."
            className="bg-secondary border border-border rounded-xl pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all w-60 md:w-80"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
            className="relative w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 glass border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 border-b border-border/50 hover:bg-white/5 transition-all ${n.unread ? 'bg-primary/5' : ''}`}>
                    <div className="flex items-start gap-3">
                      {n.unread && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
                      <div className={n.unread ? '' : 'ml-5'}>
                        <p className="text-sm text-foreground leading-snug">{n.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3">
                <button className="w-full text-xs text-primary hover:underline text-center">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
            className="flex items-center gap-2 glass border border-white/10 rounded-xl px-3 py-1.5 hover:bg-white/5 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white">
              JD
            </div>
            <span className="text-sm text-foreground hidden sm:block">Jane Doe</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-48 glass border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden p-1">
              {['Profile', 'Settings', 'Billing'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all"
                >
                  {item}
                </button>
              ))}
              <div className="border-t border-border my-1" />
              <button
                onClick={() => window.location.href = '/login'}
                className="w-full text-left px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close dropdowns */}
      {(notifOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setNotifOpen(false); setProfileOpen(false) }}
        />
      )}
    </header>
  )
}
