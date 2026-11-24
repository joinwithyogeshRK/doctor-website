import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'
import { createParticlePositions } from './geometry'
import { pointerState, scrollState } from '../../lib/scrollState'

const CYAN = '#36d7f4'

type Quality = 'low' | 'high'

function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null)
  const { positions } = useMemo(() => createParticlePositions(count, 8), [count])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame(({ clock }) => {
    if (!points.current) return
    const t = clock.elapsedTime
    points.current.rotation.y = t * 0.028 + pointerState.x * 0.07
    points.current.rotation.x = pointerState.y * 0.04
    points.current.position.y = scrollState.heroProgress * 1.6
  })

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.032}
        color={CYAN}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/** Dollies the camera back and lifts it slightly as the hero scrolls away. */
function ScrollRig() {
  const { camera } = useThree()
  const base = useRef(camera.position.z)

  useFrame(() => {
    const p = scrollState.heroProgress
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, base.current + p * 2.2, 0.08)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, p * 0.8, 0.08)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointerState.x * 0.3, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

/**
 * Atmosphere only. The hero's subject carries its own medical objects, so the
 * scene contributes depth — a parallaxed particle shell and a camera that
 * answers the cursor and the scroll — rather than props that compete with it.
 */
export default function HeroScene({ quality = 'high' }: { quality?: Quality }) {
  const particleCount = quality === 'high' ? 900 : 300

  return (
    <Canvas
      dpr={quality === 'high' ? [1, 1.75] : 1}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      gl={{ antialias: quality === 'high', alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <AdaptiveDpr pixelated={false} />
      <ambientLight intensity={0.9} />
      <ParticleField count={particleCount} />
      <ScrollRig />
    </Canvas>
  )
}
