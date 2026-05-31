import { motion } from 'framer-motion'
import MetricCounter from '../components/MetricCounter'
import SectionTitle from '../components/SectionTitle'
import { metrics } from '../data/metrics'
import { fadeUp, staggerContainer } from '../lib/motion'

export default function Metrics() {
  return (
    <section id="metrics" className="section-block">
      <div className="section-container">
        <SectionTitle
          eyebrow="Impact"
          title="Production metrics that matter"
          subtitle="Real outcomes from fintech and security-focused backend work."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={fadeUp}
              className="glass glow-blue rounded-2xl p-6 text-center"
            >
              <MetricCounter
                value={metric.value}
                decimals={metric.decimals ?? 0}
                prefix={metric.prefix}
                suffix={metric.suffix}
              />
              <p className="mt-2 text-sm text-muted">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
