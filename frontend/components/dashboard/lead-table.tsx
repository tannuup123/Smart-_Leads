'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Download, Plus, ChevronUp, ChevronDown, MoreHorizontal, Edit2, Trash2, Eye as EyeIcon, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { STATUS_COLORS, type LeadStatus, type LeadSource } from '@/lib/leads-data'
import { cn } from '@/lib/utils'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'
import { useDebounce } from '@/hooks/useDebounce'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const PAGE_SIZE = 10
const STATUSES: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost']
const SOURCES: LeadSource[] = ['Website', 'Instagram', 'Referral']

type SortKey = 'name' | 'email' | 'status' | 'source' | 'createdAt'

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  assignedTo?: { _id: string; name: string };
}

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']),
  source: z.enum(['Website', 'Instagram', 'Referral']),
})

type LeadForm = z.infer<typeof leadSchema>

interface LeadModalProps {
  lead?: Lead | null
  mode: 'create' | 'edit' | 'view'
  onClose: () => void
}

function LeadModal({ lead, mode, onClose }: LeadModalProps) {
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState: { errors } } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: lead?.name || '',
      email: lead?.email || '',
      status: lead?.status || 'New',
      source: lead?.source || 'Website',
    }
  })

  const mutation = useMutation({
    mutationFn: async (data: LeadForm) => {
      if (lead && mode === 'edit') {
        return api.put(`/leads/${lead._id}`, data)
      } else {
        return api.post('/leads', data)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
      toast.success(mode === 'edit' ? 'Lead updated' : 'Lead created')
      onClose()
    },
    onError: (error: unknown) => {
      const err = error as any;
      toast.error(err.response?.data?.message || 'Something went wrong')
    }
  })

  const onSubmit = (data: LeadForm) => {
    mutation.mutate(data)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative glass border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">
            {mode === 'view' ? 'Lead Details' : mode === 'edit' ? 'Edit Lead' : 'New Lead'}
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {mode === 'view' && lead ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium text-foreground">{lead.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{lead.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mt-1', STATUS_COLORS[lead.status])}>
                  {lead.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Source</p>
                <p className="font-medium text-foreground mt-1">{lead.source}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p className="font-medium text-foreground">{new Date(lead.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Assigned To</p>
              <p className="font-medium text-foreground">{lead.assignedTo?.name || 'Unassigned'}</p>
            </div>
            <div className="mt-6">
              <button onClick={onClose} className="w-full glass border border-white/10 text-foreground py-2.5 rounded-xl text-sm font-medium hover:bg-white/5 transition-all">
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input
                type="text"
                {...register('name')}
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                {...register('email')}
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
                <select
                  {...register('status')}
                  className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Source</label>
                <select
                  {...register('source')}
                  className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.source && <p className="text-red-500 text-xs mt-1">{errors.source.message}</p>}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button type="button" onClick={onClose} className="flex-1 glass border border-white/10 text-foreground py-2.5 rounded-xl text-sm font-medium hover:bg-white/5 transition-all">
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50"
              >
                {mutation.isPending ? 'Saving...' : (lead ? 'Save Changes' : 'Create Lead')}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}

export function LeadTable() {
  const queryClient = useQueryClient()
  const user = useAuthStore(state => state.user)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All')
  const [sourceFilter, setSourceFilter] = useState<LeadSource | 'All'>('All')
  const [sortKey, setSortKey] = useState<SortKey>('createdAt')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState<{ open: boolean; mode: 'create'|'edit'|'view'; lead?: Lead | null }>({ open: false, mode: 'create' })
  const [actionMenu, setActionMenu] = useState<string | null>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['leads', page, debouncedSearch, statusFilter, sourceFilter, sortKey, sortDir],
    queryFn: async () => {
      const params = new URLSearchParams()
      params.append('page', page.toString())
      if (debouncedSearch) params.append('search', debouncedSearch)
      if (statusFilter !== 'All') params.append('status', statusFilter)
      if (sourceFilter !== 'All') params.append('source', sourceFilter)
      if (sortKey === 'createdAt' && sortDir === 'asc') params.append('sort', 'oldest')
      const { data } = await api.get(`/leads?${params.toString()}`)
      return data
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/leads/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
      toast.success('Lead deleted')
    },
    onError: (error: unknown) => {
      const err = error as any;
      toast.error(err.response?.data?.message || 'Failed to delete lead')
    }
  })

  const handleSort = useCallback((key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }, [sortKey])

  const exportCSV = async () => {
    try {
      const { data } = await api.get('/leads/export', { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'leads.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error: unknown) {
      toast.error('Failed to export CSV')
    }
  }

  const leads: Lead[] = data?.data || []
  const pagination = data?.pagination || { total: 0, pages: 1 }

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span className="ml-1 inline-flex flex-col">
      <ChevronUp className={cn('w-2.5 h-2.5', sortKey === k && sortDir === 'asc' ? 'text-primary' : 'text-muted-foreground/40')} />
      <ChevronDown className={cn('w-2.5 h-2.5 -mt-0.5', sortKey === k && sortDir === 'desc' ? 'text-primary' : 'text-muted-foreground/40')} />
    </span>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass rounded-2xl border border-white/5 overflow-hidden"
    >
      <div className="p-5 border-b border-border flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search leads..."
              className="bg-secondary border border-border rounded-xl pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-48"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value as LeadStatus | 'All'); setPage(1) }}
              className="bg-secondary border border-border rounded-xl pl-8 pr-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
            >
              <option value="All">All Status</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <select
            value={sourceFilter}
            onChange={e => { setSourceFilter(e.target.value as LeadSource | 'All'); setPage(1) }}
            className="bg-secondary border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="All">All Sources</option>
            {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {user?.role === 'Admin' && (
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 glass border border-white/10 text-muted-foreground hover:text-foreground px-3 py-2 rounded-xl text-sm transition-all hover:bg-white/5"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          )}
          <button
            onClick={() => setModal({ open: true, mode: 'create', lead: null })}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            New Lead
          </button>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[400px]">
        {isLoading ? (
          <div className="py-16 text-center text-muted-foreground">Loading leads...</div>
        ) : isError ? (
          <div className="py-16 text-center text-red-500">Failed to load leads. Please try again.</div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No leads found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {[
                  { label: 'Name', key: 'name' as SortKey },
                  { label: 'Email', key: 'email' as SortKey },
                  { label: 'Status', key: 'status' as SortKey },
                  { label: 'Source', key: 'source' as SortKey },
                  { label: 'Created At', key: 'createdAt' as SortKey },
                  { label: 'Assigned To', key: null },
                  { label: '', key: null },
                ].map((col) => (
                  <th
                    key={col.label}
                    className={cn('px-5 py-3.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide', col.key && 'cursor-pointer hover:text-foreground transition-colors select-none')}
                    onClick={() => col.key && handleSort(col.key)}
                  >
                    <span className="flex items-center">
                      {col.label}
                      {col.key && <SortIcon k={col.key} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {leads.map((lead, i) => (
                  <motion.tr
                    key={lead._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="border-b border-border/50 hover:bg-white/3 transition-all group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                          {lead.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div className="font-medium text-foreground">{lead.name}</div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{lead.email}</td>
                    <td className="px-5 py-4">
                      <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium', STATUS_COLORS[lead.status])}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{lead.source}</td>
                    <td className="px-5 py-4 text-muted-foreground">{new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-5 py-4 text-muted-foreground">{lead.assignedTo?.name || '-'}</td>
                    <td className="px-5 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setActionMenu(actionMenu === lead._id ? null : lead._id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {actionMenu === lead._id && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setActionMenu(null)} />
                            <div className="absolute right-0 top-8 z-40 glass border border-white/10 rounded-xl shadow-xl p-1 w-36">
                              <button
                                onClick={() => { setModal({ open: true, mode: 'view', lead }); setActionMenu(null) }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all"
                              >
                                <EyeIcon className="w-3.5 h-3.5" /> View
                              </button>
                              {(user?.role === 'Admin' || (user?.role === 'Sales User' && lead.assignedTo?._id === user?._id)) && (
                                <button
                                  onClick={() => { setModal({ open: true, mode: 'edit', lead }); setActionMenu(null) }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all"
                                >
                                  <Edit2 className="w-3.5 h-3.5" /> Edit
                                </button>
                              )}
                              {user?.role === 'Admin' && (
                                <button
                                  onClick={() => { deleteMutation.mutate(lead._id); setActionMenu(null) }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>

      {pagination.pages > 1 && (
        <div className="px-5 py-4 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, pagination.total)} of {pagination.total} leads
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  'w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all',
                  p === page ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
              disabled={page === pagination.pages}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {modal.open && (
          <LeadModal
            lead={modal.lead}
            mode={modal.mode}
            onClose={() => setModal({ open: false, mode: 'create' })}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
