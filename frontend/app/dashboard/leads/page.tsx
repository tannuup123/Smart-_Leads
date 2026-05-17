import { LeadTable } from '@/components/dashboard/lead-table'

export default function LeadsPage() {
  return (
    <div className="max-w-[1400px]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Leads</h2>
        <p className="text-muted-foreground mt-1">Manage all your leads and pipeline</p>
      </div>
      <LeadTable />
    </div>
  )
}
