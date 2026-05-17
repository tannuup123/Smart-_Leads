'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react'

const stats = [
  { icon: Users, label: 'Active Users', value: '12,400+' },
  { icon: TrendingUp, label: 'Revenue Tracked', value: '$2.4M+' },
  { icon: Target, label: 'Deals Closed', value: '98.2%' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm text-muted-foreground"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          New: AI-powered lead scoring now live
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-balance leading-tight mb-6"
        >
          Manage Leads Smarter{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent glow-text-blue">
            & Close Deals Faster
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
        >
          Smart Leads brings your entire sales pipeline into one intelligent dashboard — track leads, analyze conversions, forecast revenue, and empower your team to close more deals.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/signup"
            className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-base hover:opacity-90 transition-all glow-blue"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 glass border border-white/10 text-foreground px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/5 transition-all"
          >
            View Dashboard
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass rounded-xl p-4 text-center">
              <Icon className="w-4 h-4 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Dashboard preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="glass rounded-2xl border border-white/10 p-4 md:p-6 glow-blue">
            {/* Mockup top bar */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/8">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 h-6 rounded-md bg-white/5 max-w-xs mx-auto" />
            </div>
            {/* Mockup grid */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {['Total Leads', 'Qualified', 'Conversion', 'Revenue'].map((label, i) => (
                <div key={label} className="bg-white/4 rounded-xl p-3">
                  <div className="h-2 w-12 rounded-full bg-white/10 mb-2" />
                  <div className={`text-sm font-bold ${i === 0 ? 'text-primary' : i === 1 ? 'text-emerald-400' : i === 2 ? 'text-accent' : 'text-yellow-400'}`}>
                    {i === 0 ? '2,847' : i === 1 ? '1,204' : i === 2 ? '42.3%' : '$84K'}
                  </div>
                  <div className="text-[10px] text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
            {/* Chart mockup bars */}
            <div className="flex items-end gap-2 h-24 mb-3">
              {[40, 65, 45, 80, 60, 90, 55, 75, 85, 70, 95, 60].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(to top, oklch(0.6 0.22 264 / 0.8), oklch(0.58 0.22 300 / 0.4))`,
                  }}
                />
              ))}
            </div>
            <div className="h-2 w-full rounded-full bg-white/5" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
