import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

const NEXUS_POINTS = (() => {
  const points = []
  const steps = 30
  for (let i = 0; i < steps; i++) {
    const t = i / steps
    points.push([-1, t * 2 - 1, 0])
  }
  for (let i = 0; i < steps; i++) {
    const t = i / steps
    const x = -1 + t * 2
    const y = -1 + t * 2
    points.push([x, y, 0])
  }
  for (let i = 0; i < steps; i++) {
    const t = i / steps
    points.push([1, t * 2 - 1, 0])
  }
  for (let i = 0; i < steps; i++) {
    const t = i / steps
    const r = 0.3
    const angle = t * Math.PI * 2
    const cx = 0
    const cy = 0
    points.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 0])
  }
  for (let i = 0; i < steps; i++) {
    const t = i / steps
    const r = 0.6
    const angle = t * Math.PI * 2
    const cx = 0
    const cy = 0
    points.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 0])
  }
  for (let i = 0; i < steps; i++) {
    const t = i / steps
    const r = 0.9
    const angle = t * Math.PI * 2
    const cx = 0
    const cy = 0
    points.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 0])
  }
  return points
})()

function ParticleNexus({ progress }) {
  const ref = useRef()
  const count = NEXUS_POINTS.length

  const [positions, targets, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const tgt = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const [x, y, z] = NEXUS_POINTS[i]
      const spread = 3
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread
      tgt[i * 3] = x * 1.2
      tgt[i * 3 + 1] = y * 1.2
      tgt[i * 3 + 2] = z * 1.2

      const isYellow = Math.random() > 0.6
      col[i * 3] = isYellow ? 1 : 0.9
      col[i * 3 + 1] = isYellow ? 0.84 : 0.9
      col[i * 3 + 2] = isYellow ? 0.04 : 0.95
    }
    return [pos, tgt, col]
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const p = ref.current.geometry.attributes.position
    const ease = Math.min(1, progress * 1.5)
    const easeVal = 1 - Math.pow(1 - ease, 3)

    for (let i = 0; i < count; i++) {
      const px = positions[i * 3] + (targets[i * 3] - positions[i * 3]) * easeVal
      const py = positions[i * 3 + 1] + (targets[i * 3 + 1] - positions[i * 3 + 1]) * easeVal
      const pz = positions[i * 3 + 2] + (targets[i * 3 + 2] - positions[i * 3 + 2]) * easeVal
      p.array[i * 3] = px + Math.sin(Date.now() * 0.001 + i) * 0.02
      p.array[i * 3 + 1] = py + Math.cos(Date.now() * 0.001 + i * 0.5) * 0.02
      p.array[i * 3 + 2] = pz
    }
    p.needsUpdate = true
  })

  const size = Math.min(window.innerWidth, window.innerHeight) * 0.012

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function CameraController({ progress }) {
  const controlsRef = useRef()

  useFrame(({ camera }) => {
    const angle = progress * Math.PI * 1.5
    const radius = 3.5 - progress * 0.5
    camera.position.x = Math.sin(angle) * radius
    camera.position.z = Math.cos(angle) * radius
    camera.position.y = Math.sin(angle * 0.5) * 0.5
    camera.lookAt(0, 0, 0)
    if (controlsRef.current) {
      controlsRef.current.update()
    }
  })

  return <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} enableRotate={false} />
}

function NexusLoadingScene({ progress }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3.5], fov: 50 }}>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 2, 2]} intensity={1} color="#FFD60A" />
      <pointLight position={[-2, -2, -2]} intensity={0.5} color="#ffffff" />
      <ParticleNexus progress={progress} />
      <CameraController progress={progress} />
    </Canvas>
  )
}

function LoadingProgress({ progress, text }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
    }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#8A8A8A',
      }}>
        {text}
      </span>
      <div style={{
        width: 120,
        height: 2,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 1,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress * 100}%`,
          height: '100%',
          background: '#FFD60A',
          borderRadius: 1,
          transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  )
}

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    const duration = 3800
    const start = Date.now()

    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      setProgress(p)

      if (p < 0.5) {
        setPhase('initializing')
      } else if (p < 0.75) {
        setPhase('assembling')
      } else if (p < 1) {
        setPhase('finalizing')
      } else {
        setPhase('complete')
      }

      if (p >= 1) {
        setTimeout(onComplete, 600)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    let raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  const phaseText = {
    initializing: 'Initializing Nexus Core',
    assembling: 'Assembling AI Matrix',
    finalizing: 'Establishing Connection',
    complete: 'Ready',
  }[phase]

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050505',
        }}
        exit={{
          opacity: 0,
          scale: 1.05,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <NexusLoadingScene progress={progress} />
        </div>

        <div style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          <LoadingProgress progress={progress} text={phaseText} />
        </div>

        <div style={{
          position: 'absolute',
          top: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
        }}>
          <div style={{
            width: 28,
            height: 28,
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
            fontWeight: 700,
            fontSize: '1.125rem',
            letterSpacing: '-0.02em',
            color: '#fff',
          }}>
            Nexus
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
