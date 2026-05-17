export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost'
export type LeadSource = 'Website' | 'Referral' | 'LinkedIn' | 'Cold Email' | 'Webinar' | 'Organic'

export interface Lead {
  id: string
  name: string
  email: string
  company: string
  status: LeadStatus
  source: LeadSource
  createdAt: string
  value: number
}

export const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Alice Morgan', email: 'alice@techcorp.com', company: 'TechCorp', status: 'Qualified', source: 'Website', createdAt: '2024-04-01', value: 12000 },
  { id: '2', name: 'Brian Zhou', email: 'brian@nexora.io', company: 'Nexora', status: 'New', source: 'LinkedIn', createdAt: '2024-04-05', value: 8500 },
  { id: '3', name: 'Clara Santos', email: 'clara@launchpad.ai', company: 'Launchpad AI', status: 'Contacted', source: 'Referral', createdAt: '2024-04-07', value: 22000 },
  { id: '4', name: 'David Kim', email: 'david@finblox.co', company: 'Finblox', status: 'Lost', source: 'Cold Email', createdAt: '2024-04-09', value: 5000 },
  { id: '5', name: 'Eva Petrov', email: 'eva@cloudify.dev', company: 'Cloudify', status: 'Qualified', source: 'Webinar', createdAt: '2024-04-12', value: 18000 },
  { id: '6', name: 'Frank Osei', email: 'frank@scaleops.com', company: 'ScaleOps', status: 'New', source: 'Organic', createdAt: '2024-04-14', value: 9500 },
  { id: '7', name: 'Grace Liu', email: 'grace@verity.co', company: 'Verity', status: 'Contacted', source: 'Website', createdAt: '2024-04-16', value: 14000 },
  { id: '8', name: 'Henry Walsh', email: 'henry@pixelapp.com', company: 'PixelApp', status: 'Qualified', source: 'LinkedIn', createdAt: '2024-04-18', value: 31000 },
  { id: '9', name: 'Iris Nakamura', email: 'iris@rocketfuel.io', company: 'RocketFuel', status: 'New', source: 'Referral', createdAt: '2024-04-20', value: 7000 },
  { id: '10', name: 'Jack Carter', email: 'jack@northpeak.com', company: 'NorthPeak', status: 'Lost', source: 'Cold Email', createdAt: '2024-04-21', value: 3500 },
  { id: '11', name: 'Kelly Obi', email: 'kelly@strategen.com', company: 'Strategen', status: 'Qualified', source: 'Organic', createdAt: '2024-04-23', value: 27000 },
  { id: '12', name: 'Liam Torres', email: 'liam@driftlab.io', company: 'DriftLab', status: 'Contacted', source: 'Webinar', createdAt: '2024-04-25', value: 11500 },
  { id: '13', name: 'Mia Chen', email: 'mia@auroradev.com', company: 'AuroraDev', status: 'New', source: 'Website', createdAt: '2024-04-27', value: 6000 },
  { id: '14', name: 'Nathan Brooks', email: 'nathan@heliosai.com', company: 'HeliosAI', status: 'Qualified', source: 'LinkedIn', createdAt: '2024-04-28', value: 42000 },
  { id: '15', name: 'Olivia Park', email: 'olivia@zenflow.co', company: 'ZenFlow', status: 'Contacted', source: 'Referral', createdAt: '2024-04-30', value: 16000 },
]

export const MONTHLY_DATA = [
  { month: 'Jan', leads: 55, qualified: 28, revenue: 42000 },
  { month: 'Feb', leads: 70, qualified: 38, revenue: 58000 },
  { month: 'Mar', leads: 50, qualified: 22, revenue: 35000 },
  { month: 'Apr', leads: 85, qualified: 48, revenue: 71000 },
  { month: 'May', leads: 65, qualified: 32, revenue: 52000 },
  { month: 'Jun', leads: 95, qualified: 58, revenue: 84000 },
  { month: 'Jul', leads: 60, qualified: 30, revenue: 48000 },
  { month: 'Aug', leads: 80, qualified: 44, revenue: 68000 },
  { month: 'Sep', leads: 90, qualified: 52, revenue: 78000 },
  { month: 'Oct', leads: 72, qualified: 40, revenue: 62000 },
  { month: 'Nov', leads: 100, qualified: 62, revenue: 95000 },
  { month: 'Dec', leads: 75, qualified: 42, revenue: 71000 },
]

export const SOURCE_DATA = [
  { name: 'Website', value: 32 },
  { name: 'LinkedIn', value: 24 },
  { name: 'Referral', value: 18 },
  { name: 'Cold Email', value: 12 },
  { name: 'Webinar', value: 8 },
  { name: 'Organic', value: 6 },
]

export const STATUS_COLORS: Record<LeadStatus, string> = {
  New: 'text-blue-400 bg-blue-400/10',
  Contacted: 'text-yellow-400 bg-yellow-400/10',
  Qualified: 'text-emerald-400 bg-emerald-400/10',
  Lost: 'text-red-400 bg-red-400/10',
}
