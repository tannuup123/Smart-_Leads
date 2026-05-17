'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts'
import { motion } from 'framer-motion'

const PIE_COLORS = [
  'oklch(0.6 0.22 264)',
  'oklch(0.58 0.22 300)',
  'oklch(0.65 0.18 200)',
  'oklch(0.7 0.16 140)',
  'oklch(0.65 0.2 50)',
  'oklch(0.6 0.2 30)',
]

const tooltipStyle = {
  backgroundColor: 'oklch(0.11 0.008 264)',
  border: '1px solid oklch(0.2 0.01 264)',
  borderRadius: '12px',
  color: 'oklch(0.95 0.005 264)',
  fontSize: '12px',
}

interface ChartDataPoint {
  month: string
  leads: number
  qualified: number
  revenue: number
}

interface SourceDataPoint {
  name: string
  value: number
}

export function LeadsAreaChart({ monthlyData }: { monthlyData: ChartDataPoint[] }) {
  const data = monthlyData.length > 0 ? monthlyData : [
    { month: 'Jan', leads: 0, qualified: 0, revenue: 0 },
    { month: 'Feb', leads: 0, qualified: 0, revenue: 0 },
    { month: 'Mar', leads: 0, qualified: 0, revenue: 0 },
    { month: 'Apr', leads: 0, qualified: 0, revenue: 0 },
    { month: 'May', leads: 0, qualified: 0, revenue: 0 },
    { month: 'Jun', leads: 0, qualified: 0, revenue: 0 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-2xl p-6 border border-white/5 col-span-2"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Lead Analytics</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Monthly lead and qualification trends</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: 'oklch(0.6 0.22 264)' }} />
            Total Leads
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: 'oklch(0.58 0.22 300)' }} />
            Qualified
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.6 0.22 264)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="oklch(0.6 0.22 264)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="qualGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.58 0.22 300)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="oklch(0.58 0.22 300)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.01 264 / 0.5)" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'oklch(0.55 0.01 264)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'oklch(0.55 0.01 264)' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="leads" stroke="oklch(0.6 0.22 264)" strokeWidth={2} fill="url(#leadGrad)" />
          <Area type="monotone" dataKey="qualified" stroke="oklch(0.58 0.22 300)" strokeWidth={2} fill="url(#qualGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function RevenueBarChart({ monthlyData }: { monthlyData: ChartDataPoint[] }) {
  const data = monthlyData.length > 0 ? monthlyData : [
    { month: 'Jan', leads: 0, qualified: 0, revenue: 0 },
    { month: 'Feb', leads: 0, qualified: 0, revenue: 0 },
    { month: 'Mar', leads: 0, qualified: 0, revenue: 0 },
    { month: 'Apr', leads: 0, qualified: 0, revenue: 0 },
    { month: 'May', leads: 0, qualified: 0, revenue: 0 },
    { month: 'Jun', leads: 0, qualified: 0, revenue: 0 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-2xl p-6 border border-white/5"
    >
      <div className="mb-6">
        <h3 className="font-semibold text-foreground">Sales Growth</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue from qualified leads</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.01 264 / 0.5)" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'oklch(0.55 0.01 264)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'oklch(0.55 0.01 264)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
          <Bar dataKey="revenue" radius={[4, 4, 0, 0]} fill="oklch(0.6 0.22 264 / 0.8)" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function LeadSourcePieChart({ sourcesData }: { sourcesData: SourceDataPoint[] }) {
  const data = sourcesData.length > 0 ? sourcesData : [
    { name: 'Website', value: 0 },
    { name: 'LinkedIn', value: 0 },
    { name: 'Referral', value: 0 },
    { name: 'Cold Email', value: 0 },
    { name: 'Webinar', value: 0 },
    { name: 'Organic', value: 0 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass rounded-2xl p-6 border border-white/5"
    >
      <div className="mb-6">
        <h3 className="font-semibold text-foreground">Lead Sources</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Distribution by acquisition channel</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, 'Share']} />
          <Legend
            formatter={(value) => <span style={{ fontSize: '11px', color: 'oklch(0.55 0.01 264)' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
