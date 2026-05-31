import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'
import { fadeUp, staggerContainer } from '../lib/motion'

const highlights = [
  { label: 'Role', value: 'Associate Software Engineer' },
  { label: 'Company', value: 'Trully Capital Fintech Pvt Ltd' },
  { label: 'Location', value: 'Pune, Maharashtra' },
  { label: 'Education', value: 'BCA — Savitribai Phule Pune University' },
  { label: 'Growth', value: 'Intern → Associate in 6 months' },
  { label: 'Open to', value: 'Backend & Full-Stack · On-site / Hybrid / Remote' },
]

const focusAreas = [
  'OAuth2 & JWT',
  'Zero-trust auth',
  'Document fintech',
  'AWS & CI/CD',
  'WebSockets',
  'Audit logging',
]

export default function About() {
  return (
    <section id="about" className="section-block section-bg">
      <div className="section-container">
        <SectionTitle
          eyebrow="About"
          title="I build backend systems that fintech can trust."
          highlight="fintech can trust"
          subtitle="Security, APIs, and production impact — from day one."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 lg:grid-cols-12 lg:gap-8"
        >
          <motion.div
            variants={fadeUp}
            className="glass rounded-xl p-6 leading-relaxed text-muted sm:p-8 lg:col-span-8"
          >
            <p className="mb-4">
              I've built production fintech systems that handle sensitive user data — from
              KYC flows secured with OAuth2 &amp; JWT to real-time document pipelines with
              audit tracking — all within my first year as a software engineer.
            </p>
            <p className="mb-4">
              At Trully Capital, I work on backend-heavy systems powering secure document
              sharing and financial workflows (UDT &amp; UDC). I've designed REST APIs with
              separated authentication, access control, and audit layers — implemented OTP +
              JWT zero-trust auth, WebSockets for real-time updates, RBAC, MFA (OTP +
              WebAuthn), and audit logging pipelines that hold up under real-world security
              constraints.
            </p>
            <p className="mb-4">
              I've deployed production systems on AWS (EC2, S3, Elastic Beanstalk) with
              Nginx and CI/CD via GitHub Actions — with security as a core focus from
              AES-256 encryption to rate limiting and defense-in-depth practices.
            </p>
            <p className="mb-0">
              Open to backend and full-stack roles involving API design, authentication
              systems, and secure, scalable infrastructure.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-6 lg:col-span-4">
            <div className="glass rounded-xl p-6">
              <h3 className="font-heading mb-4 text-sm font-semibold tracking-wide text-white uppercase">
                At a glance
              </h3>
              <dl className="space-y-4">
                {highlights.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-medium tracking-wider text-accent uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-snug text-text">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="font-heading mb-4 text-sm font-semibold tracking-wide text-white uppercase">
                Focus areas
              </h3>
              <ul className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-white/10 bg-bg px-3 py-1 text-xs text-muted"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
