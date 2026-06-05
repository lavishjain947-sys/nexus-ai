import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const contacts = [
  {
    label: 'Email',
    value: 'contact@nexusai.com',
    href: 'mailto:contact@nexusai.com',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    value: 'Join our community',
    href: '#',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a1 1 0 100-2 1 1 0 000 2zM15 12a1 1 0 100-2 1 1 0 000 2z" />
        <path d="M7.5 7.5c3.5-1 5.5-1 9 0" />
        <path d="M7.5 16.5c3.5 1 5.5 1 9 0" />
        <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.167 3.5-2" />
        <path d="M8.5 17c0 1-1.5 3-2 3-1.5 0-2.833-1.167-3.5-2" />
        <path d="M17 21v-2.5a3.5 3.5 0 00-1-2.5" />
        <path d="M7 21v-2.5a3.5 3.5 0 011-2.5" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: '@nexus_ai',
    href: '#',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Lavion Tech & Innovations',
    href: '#',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <path d="M8 11v5M8 8v0M12 16v-5M16 16v-3a2 2 0 00-4 0" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    value: '@NexusAI',
    href: '#',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M19 4l-6.768 6.768" />
      </svg>
    ),
  },
]

export default function ContactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="contact"
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
        right: '10%',
        bottom: '20%',
        width: 350,
        height: 350,
        background: 'radial-gradient(circle, rgba(255, 214, 10, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginBottom: '4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Let's{' '}
            <span style={{ color: '#FFD60A' }}>Connect</span>
          </h2>
          <p className="section-subtitle">
            Get in touch with us. We'd love to hear from you.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2 + i * 0.08,
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--surface)',
                border: '1px solid rgba(255,255,255,0.04)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--surface-elevated)'
                e.currentTarget.style.borderColor = 'rgba(255, 214, 10, 0.2)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--surface)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 214, 10, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFD60A',
                transition: 'background 0.3s ease',
              }}
                className="contact-icon-wrapper"
              >
                {contact.icon}
              </div>
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '0.25rem',
                }}>
                  {contact.label}
                </h4>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#8A8A8A',
                }}>
                  {contact.value}
                </p>
              </div>

              <style>{`
                .contact-icon-wrapper svg {
                  transition: transform 0.3s ease;
                }
                a:hover .contact-icon-wrapper {
                  background: rgba(255, 214, 10, 0.15) !important;
                }
                a:hover .contact-icon-wrapper svg {
                  transform: scale(1.1);
                }
              `}</style>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
