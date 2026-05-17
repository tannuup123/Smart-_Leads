'use client'

import { StatCards } from '@/components/dashboard/stat-cards'
import { LeadsAreaChart, RevenueBarChart, LeadSourcePieChart } from '@/components/dashboard/charts'
import { LeadTable } from '@/components/dashboard/lead-table'
import { MOCK_LEADS } from '@/lib/leads-data'
import { useAuthStore } from '@/store/useAuthStore'
import { SalesDashboard } from '@/components/dashboard/sales-dashboard'

export default function DashboardPage() {
  const { user } = useAuthStore()

  if (user?.role === 'Sales User') {
    return <SalesDashboard />
  }

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Stats */}
      <StatCards leads={MOCK_LEADS} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <LeadsAreaChart />
        <RevenueBarChart />
        <LeadSourcePieChart />
      </div>

      {/* Lead Table */}
      <LeadTable />
    </div>
  )
}
