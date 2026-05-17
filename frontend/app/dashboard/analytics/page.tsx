'use client'

import { useState, useEffect } from 'react'
import { LeadsAreaChart, RevenueBarChart, LeadSourcePieChart } from '@/components/dashboard/charts'
import { StatCards } from '@/components/dashboard/stat-cards'
import api from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'

export default function AnalyticsPage() {
  const user = useAuthStore(state => state.user)

  // Fetch analytics data
  const statsQuery = useQuery({
    queryKey: ['analyticsStats'],
    queryFn: async () => {
      const { data } = await api.get('/analytics/stats')
      return data
    },
    enabled: user?.role === 'Sales User'
  })

  const monthlyDataQuery = useQuery({
    queryKey: ['analyticsMonthly'],
    queryFn: async () => {
      const { data } = await api.get('/analytics/monthly')
      return data
    },
    enabled: user?.role === 'Sales User'
  })

  const sourcesDataQuery = useQuery({
    queryKey: ['analyticsSources'],
    queryFn: async () => {
      const { data } = await api.get('/analytics/sources')
      return data
    },
    enabled: user?.role === 'Sales User'
  })

  // Fallback data for when API calls are loading or fail
  const fallbackStats = {
    totalLeads: 0,
    qualifiedLeads: 0,
    lostLeads: 0,
    monthlyRevenue: 0,
    conversionRate: 0,
    deltas: {
      totalLeads: '+0%',
      qualifiedLeads: '+0%',
      lostLeads: '+0%',
      monthlyRevenue: '+0%',
      conversionRate: '+0%'
    }
  }

  const fallbackMonthly = []
  const fallbackSources = []

  const stats = { ...fallbackStats, ...(statsQuery.data || {}) }
  const monthlyData = [...fallbackMonthly, ...(monthlyDataQuery.data || [])]
  const sourcesData = [...fallbackSources, ...(sourcesDataQuery.data || [])]

  return (
    <div className="max-w-[1400px] space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
        <p className="text-muted-foreground mt-1">Deep dive into your sales performance</p>
      </div>
      <StatCards
        totalLeads={stats.totalLeads}
        qualifiedLeads={stats.qualifiedLeads}
        lostLeads={stats.lostLeads}
        monthlyRevenue={stats.monthlyRevenue}
        conversionRate={stats.conversionRate}
        deltas={stats.deltas}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <LeadsAreaChart monthlyData={monthlyData} />
        <RevenueBarChart monthlyData={monthlyData} />
        <LeadSourcePieChart sourcesData={sourcesData} />
      </div>
    </div>
  )
}
