import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Technology', href: '#technology' },
  { label: 'About', href: '#about' },
  { label: 'Founder', href: '#founder' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'X / Twitter', href: '#', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M19 4l-6.768 6.768" />
    </svg>
  )},
  { label: 'Discord', href: '#', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a1 1 0 100-2 1 1 0 000 2zM15 12a1 1 0 100-2 1 1 0 000 2z" />
      <path d="M7.5 7.5c3.5-1 5.5-1 9 0" />
      <path d="M7.5 16.5c3.5 1 5.5 1 9 0" />
      <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.167 3.5-2" />
      <path d="M8.5 17c0 1-1.5 3-2 3-1.5 0-2.833-1.167-3.5-2" />
    </svg>
  )},
  { label: 'LinkedIn', href: '#', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <path d="M8 11v5M8 8v0M12 16v-5M16 16v-3a2 2 0 00-4 0" />
    </svg>
  )},
  { label: 'GitHub', href: '#', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  )},
]

export default function Footer() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <motion.footer
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: '#050505',
      }}
    >
      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '4rem',
        }}
          className="footer-grid"
        >
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              marginBottom: '1.25rem',
            }}>
              <div style={{
                width: 30,
                height: 30,
                borderRadius: 6,
                background: '#FFD60A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#050505',
                fontWeight: 900,
                fontSize: '0.875rem',
              }}>
                N
              </div>
              <span style={{
                fontWeight: 800,
                fontSize: '1.125rem',
                letterSpacing: '-0.03em',
              }}>
                Nexus
              </span>
            </div>
            <p style={{
              fontSize: '0.9375rem',
              color: '#8A8A8A',
              lineHeight: 1.7,
              maxWidth: 300,
              marginBottom: '1.5rem',
            }}>
              The future of AI, built for everyone. A flagship product by{' '}
              <span style={{ color: '#B0B0B0' }}>Lavion Tech & Innovations</span>.
            </p>
            <p style={{
              fontSize: '0.8125rem',
              color: '#666',
            }}>
              Founder: <span style={{ color: '#8A8A8A' }}>Lavish Jain</span>
            </p>
          </div>

          <div>
            <h4 style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#666',
              marginBottom: '1.25rem',
            }}>
              Quick Links
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none' }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.9375rem',
                      color: '#8A8A8A',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8A8A8A'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#666',
              marginBottom: '1.25rem',
            }}>
              Legal
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      fontSize: '0.9375rem',
                      color: '#8A8A8A',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8A8A8A'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#666',
              marginBottom: '1.25rem',
            }}>
              Follow
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none' }}>
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9375rem',
                      color: '#8A8A8A',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFD60A'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8A8A8A'}
                  >
                    {social.icon}
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
          className="footer-bottom"
        >
          <p style={{
            fontSize: '0.8125rem',
            color: '#555',
          }}>
            &copy; {new Date().getFullYear()} Lavion Tech & Innovations. Nexus AI. All rights reserved.
          </p>
          <p style={{
            fontSize: '0.8125rem',
            color: '#555',
          }}>
            Crafted with intent by{' '}
            <span style={{ color: '#8A8A8A' }}>Lavish Jain</span>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </motion.footer>
  )
}
