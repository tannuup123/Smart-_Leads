'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PhoneCall, Mail, Calendar, CheckCircle2, AlertCircle, TrendingUp, Users, Target } from 'lucide-react'
import { LeadTable } from '@/components/dashboard/lead-table'
import { Progress } from '@/components/ui/progress'
import api from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'

const getIcon = (type: string) => {
  switch (type) {
    case 'call': return <PhoneCall className="w-4 h-4" />
    case 'email': return <Mail className="w-4 h-4" />
    case 'meeting': return <Calendar className="w-4 h-4" />
    default: return <CheckCircle2 className="w-4 h-4" />
  }
}

export function SalesDashboard() {
  const user = useAuthStore(state => state.user)

  // Fetch dashboard data
  const statsQuery = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/stats')
      return data
    },
    enabled: user?.role === 'Sales User'
  })

  const activitiesQuery = useQuery({
    queryKey: ['recentActivities'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/activities')
      return data
    },
    enabled: user?.role === 'Sales User'
  })

  const followupsQuery = useQuery({
    queryKey: ['upcomingFollowups'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/followups')
      return data
    },
    enabled: user?.role === 'Sales User'
  })

  const targetsQuery = useQuery({
    queryKey: ['salesTargets'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/targets')
      return data
    },
    enabled: user?.role === 'Sales User'
  })

  // Fallback data for when API calls are loading or fail
  const fallbackStats = {
    assignedLeads: 0,
    contactedToday: 0,
    qualifiedDeals: 0,
    pendingFollowups: 0
  }

  const fallbackActivities = [
    { id: '1', type: 'call', title: 'Welcome to Smart Leads CRM', description: 'Start managing your leads effectively', time: 'Just now', status: 'completed' }
  ]

  const fallbackFollowups = [
    { id: '1', name: 'John Doe', email: 'john@example.com', company: 'example', time: 'Tomorrow, 10:00 AM', priority: 'high' },
    { id: '2', name: 'Jane Smith', email: 'jane@test.com', company: 'test', time: 'Tomorrow, 2:30 PM', priority: 'medium' }
  ]

  const fallbackTargets = [
    { label: 'Outbound Calls', current: 0, target: 50, color: 'bg-blue-500' },
    { label: 'Emails Sent', current: 0, target: 25, color: 'bg-purple-500' },
    { label: 'Meetings Booked', current: 0, target: 4, color: 'bg-green-500' }
  ]

  const stats = statsQuery.data ?? fallbackStats
  const activities = activitiesQuery.data ?? fallbackActivities
  const followups = followupsQuery.data ?? fallbackFollowups
  const targets = targetsQuery.data ?? fallbackTargets

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Welcome Banner */}
      <div className="glass rounded-2xl p-6 border border-white/5 bg-gradient-to-r from-primary/10 via-background to-background">
        <h2 className="text-2xl font-bold text-foreground mb-1">Your Performance Dashboard</h2>
        <p className="text-muted-foreground">Track your targets, follow up on leads, and close deals faster.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Assigned Leads', value: stats.assignedLeads.toString(), icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Contacted Today', value: stats.contactedToday.toString(), icon: PhoneCall, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Qualified Deals', value: stats.qualifiedDeals.toString(), icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Pending Follow-ups', value: stats.pendingFollowups.toString(), icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 border border-white/5 relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">{stat.value}</h3>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities Timeline */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5 flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Activities
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {activities.map((activity, i) => (
              <div key={activity.id} className="relative flex gap-4">
                {i !== activities.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-[-24px] w-[1px] bg-border" />
                )}
                <div className="w-10 h-10 rounded-full bg-secondary border border-white/10 flex items-center justify-center flex-shrink-0 text-muted-foreground z-10">
                  {getIcon(activity.type)}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{activity.title}</p>
                  <p className="text-muted-foreground text-xs mt-1">{activity.description}</p>
                  <p className="text-muted-foreground/60 text-[11px] mt-1.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Targets */}
        <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Daily Targets
            </h3>
          </div>
          <div className="flex-1 space-y-6">
            {targets.map((target) => {
              const percentage = Math.round((target.current / target.target) * 100);
              return (
                <div key={target.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{target.label}</span>
                    <span className="text-muted-foreground">{target.current} / {target.target}</span>
                  </div>
                  <Progress value={percentage} className="h-2" indicatorColor={target.color} />
                </div>
              );
            })}
          </div>

          <div className="mt-auto pt-6 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">Upcoming Follow-ups</h4>
            <div className="space-y-3">
              {followups.slice(0, 2).map(followup => (
                <div key={followup.id} className="flex justify-between items-center p-3 rounded-xl bg-secondary/50 border border-white/5">
                  <div>
                    <p className="text-sm font-medium text-foreground">{followup.name}</p>
                    <p className="text-xs text-muted-foreground">{followup.company}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {followup.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lead Table */}
      <LeadTable />
    </div>
  )
}