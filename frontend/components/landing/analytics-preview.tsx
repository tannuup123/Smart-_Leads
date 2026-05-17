'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react'

const cards = [
  { icon: Users, label: 'Total Leads', value: '2,847', delta: '+12%', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: TrendingUp, label: 'Qualified', value: '1,204', delta: '+8%', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { icon: Target, label: 'Conversion Rate', value: '42.3%', delta: '+3.1%', color: 'text-accent', bg: 'bg-accent/10' },
  { icon: DollarSign, label: 'Monthly Revenue', value: '$84,200', delta: '+18%', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
]

export function AnalyticsPreview() {
  return (
    <section id="analytics" className="py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary/6 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-muted-foreground">
            Live analytics
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4">
            Your pipeline,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              at a glance
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty leading-relaxed">
            Instantly understand the health of your sales funnel with beautiful, real-time metric cards and charts.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{card.value}</div>
              <div className="text-xs text-muted-foreground mb-2">{card.label}</div>
              <div className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 rounded-full px-2 py-0.5">
                <TrendingUp className="w-3 h-3" />
                {card.delta} this month
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-2xl p-6 border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Lead Analytics</h3>
              <p className="text-sm text-muted-foreground">Monthly performance overview</p>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" />Leads</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" />Qualified</span>
            </div>
          </div>
          <div className="flex items-end gap-2 h-40">
            {[
              [55, 30], [70, 40], [50, 28], [85, 50], [65, 38],
              [95, 60], [60, 35], [80, 48], [90, 55], [72, 42], [100, 65], [75, 45]
            ].map(([a, b], i) => (
              <div key={i} className="flex-1 flex gap-0.5 items-end h-full">
                <div
                  className="flex-1 rounded-t-sm opacity-80"
                  style={{ height: `${a}%`, background: 'oklch(0.6 0.22 264 / 0.7)' }}
                />
                <div
                  className="flex-1 rounded-t-sm opacity-80"
                  style={{ height: `${b}%`, background: 'oklch(0.58 0.22 300 / 0.7)' }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
