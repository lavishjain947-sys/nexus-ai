import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Core() {
  const meshRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  useFrame(({ pointer }) => {
    if (!meshRef.current) return
    mouseRef.current.x += (pointer.x * 0.3 - mouseRef.current.x) * 0.05
    mouseRef.current.y += (-pointer.y * 0.3 - mouseRef.current.y) * 0.05
    meshRef.current.rotation.x += (mouseRef.current.y - meshRef.current.rotation.x) * 0.02
    meshRef.current.rotation.y += (mouseRef.current.x - meshRef.current.rotation.y) * 0.02
    meshRef.current.rotation.z += 0.002
  })

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#FFD60A"
          emissive="#FFD60A"
          emissiveIntensity={0.15}
          metalness={0.9}
          roughness={0.15}
          distort={0.15}
          speed={2}
          transparent
          opacity={0.95}
        />
      </mesh>
    </Float>
  )
}

function OrbitingRing({ radius, speed, color, thickness }) {
  const ringRef = useRef()
  const segments = 64
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0))
    }
    return pts
  }, [radius])

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    ringRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3 + radius) * 0.4
    ringRef.current.rotation.y += speed * 0.005
  })

  return (
    <group ref={ringRef}>
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(points, true), segments, thickness, 8, true]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.1}
          transparent
          opacity={0.3}
          metalness={0.8}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[
          Math.cos((i / 8) * Math.PI * 2) * radius,
          Math.sin((i / 8) * Math.PI * 2) * radius,
          0,
        ]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
            transparent
            opacity={0.6}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

function Particles() {
  const ref = useRef()
  const count = 200

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 1.5
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r
      pos[i * 3 + 2] = Math.cos(phi) * r
      const isYellow = Math.random() > 0.7
      col[i * 3] = isYellow ? 1 : 0.6
      col[i * 3 + 1] = isYellow ? 0.84 : 0.6
      col[i * 3 + 2] = isYellow ? 0.04 : 0.7
    }
    return [pos, col]
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const p = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2 + clock.elapsedTime * 0.02 * (1 + (i % 3) * 0.3)
      const phi = Math.acos(2 * (i / count) - 1)
      const r = 2 + Math.sin(clock.elapsedTime * 0.1 + i) * 0.5
      p[i * 3] = Math.sin(phi) * Math.cos(theta) * r
      p[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r
      p[i * 3 + 2] = Math.cos(phi) * r
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  const size = Math.min(window.innerWidth, window.innerHeight) * 0.005

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
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#FFD60A" />
      <pointLight position={[-3, -2, -4]} intensity={1} color="#ffffff" />
      <spotLight position={[0, 4, 2]} intensity={1} color="#FFD60A" angle={0.3} penumbra={1} />
    </>
  )
}

export default function NexusCore() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5.5], fov: 45 }} style={{ width: '100%', height: '100%' }}>
      <Lights />
      <Core />
      <OrbitingRing radius={2} speed={1} color="#FFD60A" thickness={0.015} />
      <OrbitingRing radius={2.8} speed={-0.7} color="#FFD60A" thickness={0.01} />
      <Particles />
    </Canvas>
  )
}
