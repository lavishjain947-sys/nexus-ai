import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'Home', href: '#home', page: 'landing' },
  { label: 'Features', href: '#features' },
  { label: 'Technology', href: '#technology' },
  { label: 'About', href: '#about' },
  { label: 'Founder', href: '#founder' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onNavigate, currentPage }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isAuth = currentPage === 'auth'

  const handleLinkClick = (link) => {
    setMobileOpen(false)
    if (link.page) {
      onNavigate(link.page)
    }
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
        background: isAuth || scrolled
          ? 'rgba(5, 5, 5, 0.82)'
          : 'transparent',
        backdropFilter: isAuth || scrolled ? 'blur(20px) saturate(1.3)' : 'none',
        WebkitBackdropFilter: isAuth || scrolled ? 'blur(20px) saturate(1.3)' : 'none',
        borderBottom: isAuth || scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate('landing') }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}
        >
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
            transition: 'transform 0.3s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            N
          </div>
          <span style={{
            fontWeight: 800,
            fontSize: '1.125rem',
            letterSpacing: '-0.03em',
          }}>
            Nexus
          </span>
        </a>

        {!isAuth && (
          <ul style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            listStyle: 'none',
          }}
            className="nav-links-desktop"
          >
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (link.page) {
                      e.preventDefault()
                      handleLinkClick(link)
                    }
                  }}
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#8A8A8A',
                    transition: 'color 0.3s ease',
                    position: 'relative',
                    padding: '0.25rem 0',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#8A8A8A'}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {isAuth && (
          <ul style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            listStyle: 'none',
          }}
            className="nav-links-desktop"
          >
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('landing') }}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#8A8A8A',
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#8A8A8A'}
              >
                Home
              </a>
            </li>
            <li>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#FFD60A',
              }}>
                Sign In
              </span>
            </li>
          </ul>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {!isAuth && (
            <button
              onClick={() => onNavigate('auth')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                color: '#B0B0B0',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              className="btn-signin"
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255, 214, 10, 0.3)'
                e.currentTarget.style.color = '#FFD60A'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.color = '#B0B0B0'
              }}
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => onNavigate('auth')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: '#FFD60A',
              color: '#050505',
              fontWeight: 700,
              fontSize: '0.875rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 2px 12px rgba(255, 214, 10, 0.2)',
              border: 'none',
              cursor: 'pointer',
            }}
            className="btn-launch"
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(255, 214, 10, 0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(255, 214, 10, 0.2)'
            }}
          >
            {isAuth ? 'Launch Nexus AI' : 'Launch Nexus AI'}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.3s ease' }}>
              <path d="M1 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle"
            style={{
              display: 'none',
              width: 36,
              height: 36,
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.1)',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
            }}
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {mobileOpen ? (
                <path d="M4 4L14 14M14 4L4 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 5H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 9H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 13H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            position: 'absolute',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            background: 'rgba(5,5,5,0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '1rem 1.25rem',
          }}
        >
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none' }}>
            {!isAuth ? (
              links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.page) { e.preventDefault() }
                      handleLinkClick(link)
                    }}
                    style={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#B0B0B0',
                      padding: '0.5rem 0',
                      display: 'block',
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))
            ) : (
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleLinkClick({ page: 'landing' }) }}
                  style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#B0B0B0',
                    padding: '0.5rem 0',
                    display: 'block',
                  }}
                >
                  Home
                </a>
              </li>
            )}
            <li>
              <button
                onClick={() => { setMobileOpen(false); onNavigate('auth') }}
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#FFD60A',
                  padding: '0.5rem 0',
                  display: 'block',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                Sign In
              </button>
            </li>
          </ul>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .btn-launch { padding: 0.5rem 1rem !important; font-size: 0.8125rem !important; }
          .btn-signin { display: none !important; }
        }
      `}</style>
    </motion.nav>
  )
}
