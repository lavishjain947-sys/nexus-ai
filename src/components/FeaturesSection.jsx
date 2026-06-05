import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="22" height="22" rx="6" stroke="#FFD60A" strokeWidth="1.5" />
        <path d="M10 14L13 17L18 11" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'AI Chat',
    description: 'Natural, context-aware conversations that feel human. Powered by advanced language models.',
    color: '#FFD60A',
    size: 'large',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L17.09 9.26L24 10.27L19 15.14L20.18 22.02L14 18.77L7.82 22.02L9 15.14L4 10.27L10.91 9.26L14 3Z" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Fast Responses',
    description: 'Optimized inference delivers answers in milliseconds, not seconds.',
    size: 'normal',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4V14L20 20" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="11" stroke="#FFD60A" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Context Memory',
    description: 'Seamless conversation history that remembers everything across sessions.',
    size: 'normal',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 21H21M7 7H21" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="5" y="10" width="18" height="8" rx="2" stroke="#FFD60A" strokeWidth="1.5" />
        <path d="M5 14H23" stroke="#FFD60A" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Document Analysis',
    description: 'Upload and analyze files instantly. Extract insights from any document.',
    size: 'normal',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3V25" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 10L14 3L21 10" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 18L14 25L21 18" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Productivity Tools',
    description: 'Write, code, create, and build faster with AI-powered assistance across every workflow.',
    size: 'large',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#FFD60A" strokeWidth="1.5" />
        <path d="M14 8V14L18 18" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Future Ecosystem',
    description: 'An expanding platform of integrations and tools. More power coming soon.',
    size: 'normal',
  },
]

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      style={{
        position: 'relative',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--surface)',
        border: '1px solid rgba(255,255,255,0.04)',
        transition: 'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        cursor: 'default',
        gridColumn: feature.size === 'large' ? 'span 2' : 'span 1',
      }}
      className="feature-card"
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.borderColor = 'rgba(255, 214, 10, 0.2)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 'var(--radius-md)',
        background: 'rgba(255, 214, 10, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.25rem',
        transition: 'background 0.3s ease, transform 0.3s ease',
      }}
        className="feature-icon-wrapper"
      >
        {feature.icon}
      </div>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        marginBottom: '0.75rem',
        letterSpacing: '-0.02em',
      }}>
        {feature.title}
      </h3>
      <p style={{
        fontSize: '0.9375rem',
        color: '#8A8A8A',
        lineHeight: 1.7,
        maxWidth: '90%',
      }}>
        {feature.description}
      </p>

      <style>{`
        .feature-card:hover .feature-icon-wrapper {
          background: rgba(255, 214, 10, 0.15) !important;
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .feature-card { grid-column: span 1 !important; }
        }
      `}</style>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="features"
      ref={sectionRef}
      style={{
        padding: '8rem 0',
        position: 'relative',
        background: 'linear-gradient(180deg, #050505 0%, #0B0B0B 100%)',
      }}
    >
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
          <span className="section-label">Features</span>
          <h2 className="section-title">
            Everything you need,<br />
            <span style={{ color: '#FFD60A' }}>nothing you don't.</span>
          </h2>
          <p className="section-subtitle">
            Purpose-built tools that make AI genuinely useful for real work.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
        }}
          className="features-grid-content"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .features-grid-content { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .features-grid-content { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
