import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import NexusCore from './NexusCore'

export default function HeroSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      sectionRef.current.style.setProperty('--mouse-x', x)
      sectionRef.current.style.setProperty('--mouse-y', y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'var(--nav-height)',
        background: '#050505',
      }}
    >
      {/* Subtle animated background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 20% 30%, rgba(255, 214, 10, 0.04) 0%, transparent 70%),
          radial-gradient(ellipse 60% 50% at 80% 70%, rgba(255, 214, 10, 0.02) 0%, transparent 70%)
        `,
      }} />

      {/* 3D visual */}
      <div style={{
        position: 'absolute',
        right: '-5%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '55%',
        height: '90%',
        zIndex: 1,
      }}
        className="hero-3d-container"
      >
        <NexusCore />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: 640 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <span style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#FFD60A',
              marginBottom: '1.5rem',
              padding: '0.375rem 1rem',
              borderRadius: '100px',
              border: '1px solid rgba(255, 214, 10, 0.2)',
              background: 'rgba(255, 214, 10, 0.05)',
            }}>
              Flagship AI Product by Lavion Tech
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ display: 'block' }}>The Future of AI,</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #FFD60A 0%, #FFE44D 50%, #FFD60A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Built for Everyone.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              color: '#8A8A8A',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: 480,
            }}
          >
            Powerful AI experiences designed by Lavion Tech & Innovations. Built for creators, developers, and future builders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                borderRadius: 'var(--radius-md)',
                background: '#FFD60A',
                color: '#050505',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 20px rgba(255, 214, 10, 0.25)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 214, 10, 0.35)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 214, 10, 0.25)'
              }}
            >
              Try Nexus AI
            </a>
            <a
              href="#features"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'border-color 0.3s ease, transform 0.3s ease, background 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-3d-container {
            position: relative !important;
            width: 100% !important;
            height: 50vh !important;
            right: 0 !important;
            top: auto !important;
            transform: none !important;
            order: -1 !important;
          }
          #home {
            flex-direction: column;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
