import { BarChart3 } from 'lucide-react'

export default function ReportsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] glass rounded-2xl border border-white/5 p-8">
      <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(var(--primary),0.2)]">
        <BarChart3 className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-3xl font-bold text-foreground mb-3 tracking-tight">Advanced Reports</h2>
      <p className="text-muted-foreground text-center max-w-md text-lg">
        Custom report generation is currently under development. It will be available in a future update!
      </p>
      <div className="mt-8 px-6 py-2.5 rounded-full bg-secondary text-sm font-medium border border-border">
        Coming Soon 🚀
      </div>
    </div>
  )
}
