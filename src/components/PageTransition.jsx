import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

const POINTS = (() => {
  const pts = []
  for (let i = 0; i < 60; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 0.8 + Math.random() * 0.8
    pts.push([
      Math.sin(phi) * Math.cos(theta) * r,
      Math.sin(phi) * Math.sin(theta) * r,
      Math.cos(phi) * r,
      Math.random() > 0.5 ? 1 : 0.9,
      Math.random() > 0.5 ? 0.84 : 0.9,
      Math.random() > 0.5 ? 0.04 : 0.95,
    ])
  }
  return pts
})()

function ParticleSphere() {
  const ref = useRef()
  const count = POINTS.length
  const positions = useMemo(() => new Float32Array(POINTS.flatMap(p => [p[0], p[1], p[2]])), [])
  const colors = useMemo(() => new Float32Array(POINTS.flatMap(p => [p[3], p[4], p[5]])), [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const p = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      const [x, y, z] = POINTS[i]
      const wave = Math.sin(clock.elapsedTime * 0.5 + i * 0.5) * 0.1
      p[i * 3] = x + wave * x
      p[i * 3 + 1] = y + wave * y
      p[i * 3 + 2] = z + wave * z
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  const size = Math.min(window.innerWidth, window.innerHeight) * 0.01

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function SphereScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 2.5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={['#050505']} />
      <ParticleSphere />
    </Canvas>
  )
}

export default function PageTransition({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 1200
    let raf

    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      setProgress(p)
      if (p >= 1) {
        setTimeout(onComplete, 300)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          background: '#050505',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      >
        <SphereScene />

        <div style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#555',
          }}>
            {progress < 0.5 ? 'Preparing' : 'Readying'}
          </span>
          <div style={{
            width: 80,
            height: 2,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 1,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${progress * 100}%`,
              height: '100%',
              background: '#FFD60A',
              borderRadius: 1,
              transition: 'width 0.15s linear',
            }} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
