import { LeadsAreaChart, RevenueBarChart, LeadSourcePieChart } from '@/components/dashboard/charts'
import { StatCards } from '@/components/dashboard/stat-cards'
import { MOCK_LEADS } from '@/lib/leads-data'

export default function AnalyticsPage() {
  return (
    <div className="max-w-[1400px] space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
        <p className="text-muted-foreground mt-1">Deep dive into your sales performance</p>
      </div>
      <StatCards leads={MOCK_LEADS} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <LeadsAreaChart />
        <RevenueBarChart />
        <LeadSourcePieChart />
      </div>
    </div>
  )
}
