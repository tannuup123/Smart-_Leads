'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'VP of Sales, Cloudify',
    avatar: 'SC',
    rating: 5,
    text: "Smart Leads completely transformed how our team tracks pipeline. The real-time analytics alone saved us 8 hours a week in reporting.",
  },
  {
    name: 'Marcus Webb',
    role: 'Sales Director, Nexora',
    avatar: 'MW',
    rating: 5,
    text: "The lead status filtering and CSV export are game changers. We went from chaotic spreadsheets to a clean, fast CRM in one afternoon.",
  },
  {
    name: 'Priya Rajan',
    role: 'Founder, Launchpad AI',
    avatar: 'PR',
    rating: 5,
    text: "Absolutely love the UI. It actually looks as premium as Stripe and Linear — not like a typical boring CRM. Our team adopted it instantly.",
  },
  {
    name: 'Tom Harrington',
    role: 'Head of Growth, Finblox',
    avatar: 'TH',
    rating: 5,
    text: "Role-based access was the thing we needed most. Admins see everything, reps see their own leads. Clean separation, zero confusion.",
  },
  {
    name: 'Aisha Okonkwo',
    role: 'CRO, ScaleOps',
    avatar: 'AO',
    rating: 5,
    text: "The conversion rate charts and monthly revenue widgets give us exactly the data we need in exec reviews. No more PowerPoint decks.",
  },
  {
    name: 'James Liu',
    role: 'Sales Ops Manager, Verity',
    avatar: 'JL',
    rating: 5,
    text: "Onboarding the team was seamless. The skeleton loading states and empty states make the app feel incredibly polished and professional.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/6 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-muted-foreground">
            Loved by sales teams
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4">
            Trusted by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              high-performing teams
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
