'use client'

import { motion } from 'framer-motion'
import { Users, TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react'

interface StatCard {
  label: string
  value: string | number
  delta: string
  positive: boolean
  icon: any
  color: string
  bg: string
  glow: string
}

interface StatCardsProps {
  totalLeads: number
  qualifiedLeads: number
  lostLeads: number
  monthlyRevenue: number
  conversionRate: number
  deltas: {
    totalLeads: string
    qualifiedLeads: string
    lostLeads: string
    monthlyRevenue: string
    conversionRate: string
  }
}

export function StatCards({ totalLeads, qualifiedLeads, lostLeads, monthlyRevenue, conversionRate, deltas }: StatCardsProps) {
  const cards = [
    {
      label: 'Total Leads',
      value: totalLeads.toLocaleString(),
      delta: deltas.totalLeads,
      positive: true,
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/10',
      glow: 'glow-blue',
    },
    {
      label: 'Qualified Leads',
      value: qualifiedLeads.toLocaleString(),
      delta: deltas.qualifiedLeads,
      positive: true,
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      glow: '',
    },
    {
      label: 'Lost Leads',
      value: lostLeads.toLocaleString(),
      delta: deltas.lostLeads,
      positive: false,
      icon: TrendingDown,
      color: 'text-red-400',
      bg: 'bg-red-400/10',
      glow: '',
    },
    {
      label: 'Monthly Revenue',
      value: `$${(monthlyRevenue / 1000).toFixed(0)}K`,
      delta: deltas.monthlyRevenue,
      positive: true,
      icon: DollarSign,
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
      glow: '',
    },
    {
      label: 'Conversion Rate',
      value: `${conversionRate.toFixed(1)}%`,
      delta: deltas.conversionRate,
      positive: true,
      icon: Target,
      color: 'text-accent',
      bg: 'bg-accent/10',
      glow: '',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.07 }}
          className={`glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all group ${card.glow}`}
        >
          <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
            <card.icon className={`w-4 h-4 ${card.color}`} />
          </div>
          <div className="text-2xl font-bold text-foreground mb-0.5">{card.value}</div>
          <div className="text-xs text-muted-foreground mb-2">{card.label}</div>
          <div className={`inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 ${card.positive ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
            {card.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {card.delta}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
