'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Users, BarChart3, MessageSquare, FileText,
  Download, Settings, Zap, LogOut, ChevronLeft, UserCircle
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/useAuthStore'

interface NavItem {
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: number
}

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Leads', icon: Users, href: '/dashboard/leads' },
  { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Messages', icon: MessageSquare, href: '/dashboard/messages', badge: 3 },
  { label: 'Reports', icon: FileText, href: '/dashboard/reports' },
  { label: 'Export CSV', icon: Download, href: '/dashboard/export' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

const salesNavItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'My Leads', icon: Users, href: '/dashboard/leads' },
  { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Messages', icon: MessageSquare, href: '/dashboard/messages', badge: 3 },
  { label: 'Profile', icon: UserCircle, href: '/dashboard/settings' },
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'
  const navItems = user?.role === 'Sales User' ? salesNavItems : adminNavItems

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 68 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="relative flex flex-col h-full border-r border-border overflow-hidden"
      style={{ background: 'oklch(0.1 0.008 264)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border min-h-[65px]">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-semibold text-foreground whitespace-nowrap"
          >
            Smart Leads
          </motion.span>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft className={cn('w-3 h-3 text-muted-foreground transition-transform', collapsed && 'rotate-180')} />
      </button>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative',
                isActive
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              <item.icon className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-primary' : 'group-hover:text-foreground')} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-nowrap flex-1"
                >
                  {item.label}
                </motion.span>
              )}
              {!collapsed && item.badge && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-full"
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-border p-3">
        <div className={cn('flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer', collapsed && 'justify-center')}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 min-w-0"
            >
              <div className="text-sm font-medium text-foreground truncate">{user?.name || 'User'}</div>
              <div className="text-xs text-muted-foreground">{user?.role || 'User'}</div>
            </motion.div>
          )}
          {!collapsed && (
            <button
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Sign out"
              onClick={() => {
                logout()
                window.location.href = '/login'
              }}
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
