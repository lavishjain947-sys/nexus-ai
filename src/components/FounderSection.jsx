import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const socials = [
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M19 4l-6.768 6.768" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <path d="M8 11v5M8 8v0M12 16v-5M16 16v-3a2 2 0 00-4 0" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:lavish@laviontech.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
]

export default function FounderSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const imgRef = useRef(null)
  const imgInView = useInView(imgRef, { once: true, margin: '-80px' })

  return (
    <section
      id="founder"
      ref={sectionRef}
      style={{
        padding: '8rem 0',
        position: 'relative',
        background: 'linear-gradient(180deg, #0B0B0B 0%, #050505 100%)',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        right: '5%',
        top: '20%',
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(255, 214, 10, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <span className="section-label">Founder</span>
          <h2 className="section-title">
            Meet The<span style={{ color: '#FFD60A' }}> Founder</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '400px 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
          className="founder-grid"
        >
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={imgInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              background: 'var(--surface-elevated)',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,214,10,0.05) 0%, transparent 50%)',
              }} />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#555',
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M18 21a6 6 0 00-12 0" />
                </svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Photo coming soon</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <span style={{
              display: 'inline-block',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FFD60A',
              marginBottom: '1rem',
            }}>
              Lavish Jain
            </span>
            <h3 style={{
              fontSize: 'clamp(2rem, 3vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '0.75rem',
              lineHeight: 1.1,
            }}>
              Founder of Lavion Tech & Innovations
            </h3>
            <div style={{
              width: 60,
              height: 3,
              background: '#FFD60A',
              borderRadius: 2,
              marginBottom: '1.5rem',
            }} />
            <p style={{
              fontSize: '1.063rem',
              color: '#B0B0B0',
              lineHeight: 1.8,
              marginBottom: '1rem',
            }}>
              A young builder focused on technology, innovation, AI, and digital products. 
              Passionate about solving real-world problems while learning publicly.
            </p>
            <p style={{
              fontSize: '1rem',
              color: '#8A8A8A',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}>
              Every product built with intention. Every line of code with purpose.
            </p>

            <div style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.625rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: '#B0B0B0',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255, 214, 10, 0.08)'
                    e.currentTarget.style.borderColor = 'rgba(255, 214, 10, 0.2)'
                    e.currentTarget.style.color = '#FFD60A'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--surface)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = '#B0B0B0'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {social.icon}
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .founder-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .founder-grid > div:first-child { max-width: 300px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
