'use client'

import { StatCards } from '@/components/dashboard/stat-cards'
import { LeadsAreaChart, RevenueBarChart, LeadSourcePieChart } from '@/components/dashboard/charts'
import { LeadTable } from '@/components/dashboard/lead-table'
import { useAuthStore } from '@/store/useAuthStore'
import { SalesDashboard } from '@/components/dashboard/sales-dashboard'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

export default function DashboardPage() {
  const { user } = useAuthStore()

  if (user?.role === 'Sales User') {
    return <SalesDashboard />
  }

  // For Admin role, fetch analytics data
  const statsQuery = useQuery({
    queryKey: ['adminAnalyticsStats'],
    queryFn: async () => {
      const { data } = await api.get('/analytics/stats')
      return data
    },
    enabled: user?.role === 'Admin'
  })

  const monthlyDataQuery = useQuery({
    queryKey: ['adminAnalyticsMonthly'],
    queryFn: async () => {
      const { data } = await api.get('/analytics/monthly')
      return data
    },
    enabled: user?.role === 'Admin'
  })

  const sourcesDataQuery = useQuery({
    queryKey: ['adminAnalyticsSources'],
    queryFn: async () => {
      const { data } = await api.get('/analytics/sources')
      return data
    },
    enabled: user?.role === 'Admin'
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
    <div className="space-y-6 max-w-[1400px]">
      {/* Stats */}
      <StatCards
        totalLeads={stats.totalLeads}
        qualifiedLeads={stats.qualifiedLeads}
        lostLeads={stats.lostLeads}
        monthlyRevenue={stats.monthlyRevenue}
        conversionRate={stats.conversionRate}
        deltas={stats.deltas}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <LeadsAreaChart monthlyData={monthlyData} />
        <RevenueBarChart monthlyData={monthlyData} />
        <LeadSourcePieChart sourcesData={sourcesData} />
      </div>

      {/* Lead Table */}
      <LeadTable />
    </div>
  )
}
