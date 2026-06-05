import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const timeline = [
  {
    year: '2023',
    title: 'Foundation',
    description: 'Lavion Tech & Innovations was founded with a vision to build innovative technology products.',
  },
  {
    year: '2024',
    title: 'Nexus AI Launch',
    description: 'Nexus AI, the flagship AI product, was launched — bringing advanced AI to everyone.',
  },
  {
    year: '2025',
    title: 'Growth & Expansion',
    description: 'Expanding the AI ecosystem with new features, integrations, and global partnerships.',
  },
  {
    year: '2026',
    title: 'The Future',
    description: 'Continuing to push boundaries and redefine what AI can do for people everywhere.',
  },
]

export default function CompanySection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const missionRef = useRef(null)
  const missionInView = useInView(missionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="technology"
      ref={sectionRef}
      style={{
        padding: '8rem 0',
        position: 'relative',
        background: '#0B0B0B',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        left: '10%',
        top: '30%',
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(255, 214, 10, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '5rem' }}
        >
          <span className="section-label">Company</span>
          <h2 className="section-title">
            Lavion Tech &{' '}
            <span style={{ color: '#FFD60A' }}>Innovations</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          marginBottom: '5rem',
        }}
          className="company-grid"
        >
          <motion.div
            ref={missionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '2.5rem',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--surface)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}>
              Our Mission
            </h3>
            <p style={{
              fontSize: '1.063rem',
              color: '#8A8A8A',
              lineHeight: 1.8,
            }}>
              Build innovative technology products that empower creators, developers, and future builders
              to achieve more with less friction. We believe in technology that serves people — not the other way around.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              padding: '2.5rem',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--surface)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}>
              The Vision
            </h3>
            <p style={{
              fontSize: '1.063rem',
              color: '#8A8A8A',
              lineHeight: 1.8,
            }}>
              A future where AI is not just accessible, but indispensable. Where technology adapts to
              you, amplifying your abilities and unlocking new possibilities.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '2.5rem',
            color: '#8A8A8A',
          }}>
            Our Journey
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background: 'rgba(255,255,255,0.06)',
            }} />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.15 }}
                style={{
                  padding: '1.5rem 0 1.5rem 2.5rem',
                  position: 'relative',
                  borderBottom: i < timeline.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: -5,
                  top: '2rem',
                  width: 11,
                  height: 11,
                  borderRadius: '50%',
                  background: i === 0 ? '#FFD60A' : 'var(--surface-elevated)',
                  border: '2px solid' + (i === 0 ? '#FFD60A' : '#333'),
                  transition: 'background 0.3s ease, border-color 0.3s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#FFD60A'
                    e.currentTarget.style.borderColor = '#FFD60A'
                  }}
                  onMouseLeave={e => {
                    if (i !== 0) {
                      e.currentTarget.style.background = 'var(--surface-elevated)'
                      e.currentTarget.style.borderColor = '#333'
                    }
                  }}
                />
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#FFD60A',
                    letterSpacing: '0.05em',
                    minWidth: 60,
                  }}>
                    {item.year}
                  </span>
                  <div>
                    <h4 style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      marginBottom: '0.375rem',
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      fontSize: '0.9375rem',
                      color: '#8A8A8A',
                      lineHeight: 1.7,
                    }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .company-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
