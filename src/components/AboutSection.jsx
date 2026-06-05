import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '10K+', label: 'Daily Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '50+', label: 'Countries' },
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const textRef = useRef(null)
  const textInView = useInView(textRef, { once: true, margin: '-80px' })
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '8rem 0',
        position: 'relative',
        background: '#050505',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 40% at 30% 50%, rgba(255, 214, 10, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div ref={textRef} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          marginBottom: '5rem',
          alignItems: 'start',
        }}
          className="about-grid"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">About</span>
            <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}>
              What is Nexus AI?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <p style={{
              fontSize: '1.125rem',
              color: '#B0B0B0',
              lineHeight: 1.8,
              fontWeight: 400,
            }}>
              Nexus AI is more than an AI assistant — it's a{' '}
              <span style={{ color: '#fff', fontWeight: 500 }}>flagship AI product</span> built to make
              artificial intelligence accessible, intuitive, and genuinely powerful for everyone.
            </p>
            <p style={{
              fontSize: '1rem',
              color: '#8A8A8A',
              lineHeight: 1.8,
            }}>
              We believe the future of technology is collaborative — where humans and AI work together
              seamlessly. Every feature, every interaction, every detail is designed with that belief at its core.
            </p>
            <p style={{
              fontSize: '1rem',
              color: '#8A8A8A',
              lineHeight: 1.8,
            }}>
              Built on cutting-edge technology with{' '}
              <span style={{ color: '#FFD60A' }}>thoughtful design</span>, Nexus AI brings the latest
              advancements in language models, context understanding, and creative tools directly to your fingertips.
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            padding: '3rem',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--surface)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
              style={{
                textAlign: 'center',
                padding: '1rem 0',
              }}
            >
              <div style={{
                fontSize: 'clamp(2rem, 3vw, 3rem)',
                fontWeight: 800,
                color: '#FFD60A',
                letterSpacing: '-0.03em',
                marginBottom: '0.5rem',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#8A8A8A',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .stats-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; padding: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
