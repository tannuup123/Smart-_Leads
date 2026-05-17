'use client'

import { motion } from 'framer-motion'
import { BarChart3, Filter, Bell, Download, Shield, Zap } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Monitor lead conversion rates, sales velocity, and pipeline health with live charts and intelligent forecasting.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Filter,
    title: 'Smart Lead Filtering',
    description: 'Filter by status, source, date, or custom tags. Debounced search keeps your workflow fluid and fast.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: Bell,
    title: 'Instant Notifications',
    description: 'Get alerted when leads change status, deals are updated, or team members need your attention.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    icon: Download,
    title: 'One-Click CSV Export',
    description: 'Export any filtered lead view to CSV instantly. Perfect for reports, hand-offs, or external analysis.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Separate views and permissions for Admins and Sales Users ensure data security and clarity.',
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with Next.js and optimized for performance. Instant page loads, skeleton states, and smooth animations.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-muted-foreground">
            Everything you need
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4">
            Built for modern{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              sales teams
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            Every feature is designed to remove friction from your sales process and give your team the insights they need to win.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass rounded-2xl p-6 hover:bg-white/5 transition-all group border border-white/5 hover:border-white/10"
            >
              <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
