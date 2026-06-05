import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { login, register, googleAuth, githubAuth } from '../services/api'

function AuthCore() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.1
    meshRef.current.rotation.y += 0.005
  })
  return (
    <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.3}>
      <mesh ref={meshRef} scale={1.2}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#FFD60A"
          emissive="#FFD60A"
          emissiveIntensity={0.08}
          metalness={0.9}
          roughness={0.15}
          distort={0.1}
          speed={2}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

function Auth3DBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#FFD60A" />
        <AuthCore />
      </Canvas>
    </div>
  )
}

function SocialButton({ provider, icon, label, onClick, disabled }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        width: '100%',
        padding: '0.8125rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: disabled ? '#555' : '#E0E0E0',
        fontSize: '0.9375rem',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color 0.3s ease, background 0.3s ease, opacity 0.3s ease',
      }}
      onMouseEnter={e => {
        if (disabled) return
        e.currentTarget.style.borderColor = 'rgba(255, 214, 10, 0.25)'
        e.currentTarget.style.background = 'rgba(255, 214, 10, 0.04)'
      }}
      onMouseLeave={e => {
        if (disabled) return
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.background = 'var(--surface)'
      }}
    >
      {icon}
      <span>Continue with {label}</span>
    </motion.button>
  )
}

function InputField({ label, type = 'text', value, onChange, placeholder, autoComplete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{
        fontSize: '0.8125rem',
        fontWeight: 600,
        color: '#B0B0B0',
        letterSpacing: '0.01em',
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          width: '100%',
          padding: '0.8125rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--surface)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#fff',
          fontSize: '0.9375rem',
          fontFamily: 'var(--font-display)',
          outline: 'none',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = 'rgba(255, 214, 10, 0.4)'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 214, 10, 0.06)'
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
    </div>
  )
}

export default function AuthPage({ onNavigate }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const googleBtnRef = useRef(null)
  const gsiInited = useRef(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      handleGithubCallback(code)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  useEffect(() => {
    if (googleBtnRef.current && !gsiInited.current && window.google?.accounts?.id) {
      gsiInited.current = true
      window.google.accounts.id.initialize({
        client_id: '113326705204-skc1a789arq7tg0t029tf8drplogqgg2.apps.googleusercontent.com',
        callback: handleGoogleResponse,
        cancel_on_tap_outside: false,
      })
    }
  }, [])

  const handleGoogleResponse = async (response) => {
    if (!response?.credential) {
      setAuthError('Google sign-in failed. No credential received.')
      return
    }
    setAuthLoading(true)
    setAuthError('')
    try {
      await googleAuth(response.credential)
      onNavigate('dashboard')
    } catch (err) {
      setAuthError(err.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleGithubCallback = async (code) => {
    setAuthLoading(true)
    setAuthError('')
    try {
      await githubAuth(code)
      onNavigate('dashboard')
    } catch (err) {
      setAuthError(err.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleSocialAuth = async (provider) => {
    setAuthError('')
    if (provider === 'google') {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.prompt()
      } else {
        setAuthError('Google Sign-In is still loading. Please try again.')
      }
      return
    }
    if (provider === 'github') {
      const clientId = 'Ov23li92WZJ6olldWBBJ'
      const redirectUri = window.location.origin + '/auth'
      const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`
      window.location.href = url
      return
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#050505',
      position: 'relative',
      padding: '6rem 1.25rem 2rem',
    }}>
      <Auth3DBackground />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 50% 40% at 30% 20%, rgba(255, 214, 10, 0.03) 0%, transparent 70%),
          radial-gradient(ellipse 40% 30% at 70% 80%, rgba(255, 214, 10, 0.02) 0%, transparent 70%)
        `,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 440,
          padding: '2.5rem',
          borderRadius: 'var(--radius-xl)',
          background: 'rgba(11, 11, 11, 0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('landing') }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              marginBottom: '1.5rem',
              textDecoration: 'none',
            }}
          >
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#FFD60A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#050505',
              fontWeight: 900,
              fontSize: '1rem',
            }}>
              N
            </div>
            <span style={{
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.03em',
              color: '#fff',
            }}>
              Nexus
            </span>
          </a>

          <div style={{
            display: 'flex',
            gap: '0.25rem',
            padding: '0.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255,255,255,0.04)',
            width: '100%',
          }}>
            <button
              onClick={() => setMode('login')}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                borderRadius: 'calc(var(--radius-md) - 2px)',
                background: mode === 'login' ? 'rgba(255, 214, 10, 0.12)' : 'transparent',
                color: mode === 'login' ? '#FFD60A' : '#666',
                fontWeight: 600,
                fontSize: '0.875rem',
                transition: 'all 0.3s ease',
                border: mode === 'login' ? '1px solid rgba(255, 214, 10, 0.2)' : '1px solid transparent',
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                borderRadius: 'calc(var(--radius-md) - 2px)',
                background: mode === 'signup' ? 'rgba(255, 214, 10, 0.12)' : 'transparent',
                color: mode === 'signup' ? '#FFD60A' : '#666',
                fontWeight: 600,
                fontSize: '0.875rem',
                transition: 'all 0.3s ease',
                border: mode === 'signup' ? '1px solid rgba(255, 214, 10, 0.2)' : '1px solid transparent',
              }}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <SocialButton
            provider="google"
            label="Google"
            onClick={() => handleSocialAuth('google')}
            disabled={authLoading}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            }
          />
          <SocialButton
            provider="github"
            label="GitHub"
            onClick={() => handleSocialAuth('github')}
            disabled={authLoading}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            }
          />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: '#555',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            or
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <AnimatePresence mode="wait">
            {mode === 'signup' && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <InputField
                  label="Full Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@example.com"
            autoComplete="email"
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />

          {mode === 'login' && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  fontSize: '0.8125rem',
                  color: '#8A8A8A',
                  fontWeight: 500,
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#FFD60A'}
                onMouseLeave={e => e.currentTarget.style.color = '#8A8A8A'}
              >
                Forgot password?
              </a>
            </div>
          )}

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            cursor: 'pointer',
            userSelect: 'none',
          }}>
            <div
              onClick={() => setKeepSignedIn(!keepSignedIn)}
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                border: keepSignedIn
                  ? '2px solid #FFD60A'
                  : '2px solid rgba(255,255,255,0.15)',
                background: keepSignedIn ? '#FFD60A' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >
              {keepSignedIn && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: '#8A8A8A',
            }}>
              Keep me signed in
            </span>
          </label>

          {authError && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 50, 50, 0.1)',
              border: '1px solid rgba(255, 50, 50, 0.2)',
              color: '#FF6B6B',
              fontSize: '0.875rem',
              textAlign: 'center',
            }}>
              {authError}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={authLoading}
            whileHover={authLoading ? {} : { y: -2 }}
            whileTap={authLoading ? {} : { scale: 0.98 }}
            style={{
              width: '100%',
              padding: '0.875rem',
              borderRadius: 'var(--radius-md)',
              background: '#FFD60A',
              color: '#050505',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              cursor: authLoading ? 'not-allowed' : 'pointer',
              opacity: authLoading ? 0.6 : 1,
              boxShadow: '0 4px 16px rgba(255, 214, 10, 0.2)',
              transition: 'box-shadow 0.3s ease, opacity 0.3s ease',
            }}
            onMouseEnter={e => {
              if (authLoading) return
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(255, 214, 10, 0.3)'
            }}
            onMouseLeave={e => {
              if (authLoading) return
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 214, 10, 0.2)'
            }}
          >
            {authLoading
              ? mode === 'login' ? 'Signing in...' : 'Creating account...'
              : mode === 'login' ? 'Sign In' : 'Create Account'
            }
          </motion.button>
        </form>

        {mode === 'signup' && (
          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.875rem',
            color: '#666',
          }}>
            Already have an account?{' '}
            <button
              onClick={() => setMode('login')}
              style={{
                color: '#FFD60A',
                fontWeight: 600,
                fontSize: '0.875rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Sign in
            </button>
          </p>
        )}
      </motion.div>
    </div>
  )
}
