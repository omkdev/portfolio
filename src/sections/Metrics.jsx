import { motion } from 'framer-motion'
import { Activity, Clock, ShieldCheck, TrendingDown, Users } from 'lucide-react'
import MetricCounter from '../components/MetricCounter'
import SectionTitle from '../components/SectionTitle'
import { metrics } from '../data/metrics'
import { fadeUp, staggerContainer } from '../lib/motion'

const metricIcons = {
  ShieldCheck,
  TrendingDown,
  Activity,
  Users,
  Clock,
}

export default function Metrics() {
  return (
    <section id="metrics" className="section-block section-bg-alt">
      <div className="section-container">
        <SectionTitle
          eyebrow="Impact"
          title="Production metrics that matter"
          highlight="metrics"
          subtitle="Real outcomes from fintech and security-focused backend work."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {metrics.map((metric) => {
            const Icon = metricIcons[metric.icon]
            return (
              <motion.div
                key={metric.label}
                variants={fadeUp}
                className="glass rounded-xl p-5 text-center"
              >
                {Icon && (
                  <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-bg">
                    <Icon size={18} className="text-accent" strokeWidth={1.75} />
                  </div>
                )}
                <MetricCounter
                  value={metric.value}
                  decimals={metric.decimals ?? 0}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
                <p className="mt-2 text-xs leading-snug text-muted">{metric.label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
