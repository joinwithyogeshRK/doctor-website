import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, Float } from '@react-three/drei'
import * as THREE from 'three'
import {
  createCrossGeometry,
  createHeartGeometry,
  createParticlePositions,
} from './geometry'
import { pointerState, scrollState } from '../../lib/scrollState'

const CYAN = '#36d7f4'
const VIOLET = '#8b6bff'
const ROYAL = '#2e6bff'
const ROSE = '#ff5d7a'

/** Disposes a geometry when the component that created it unmounts. */
function useDisposable<T extends { dispose: () => void }>(factory: () => T) {
  const value = useMemo(() => factory(), [factory])
  useEffect(() => () => value.dispose(), [value])
  return value
}

function HeartCore({ quality }: { quality: 'low' | 'high' }) {
  const group = useRef<THREE.Group>(null)
  const shell = useRef<THREE.Mesh>(null)
  const geometry = useDisposable(() => createHeartGeometry(0.48))

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // A two-stage beat: a strong contraction, then a smaller echo.
    const cycle = (t * 1.05) % 1
    const beat =
      Math.exp(-14 * cycle) * 0.085 + Math.exp(-14 * Math.max(0, cycle - 0.22)) * 0.045
    const scale = 1 + beat

    if (group.current) {
      group.current.scale.setScalar(scale * 0.44)
      group.current.rotation.y = Math.sin(t * 0.3) * 0.22 + pointerState.x * 0.18
      group.current.rotation.x = -0.06 + pointerState.y * 0.1
    }
    if (shell.current) {
      const material = shell.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.14 + beat * 1.6
      shell.current.scale.setScalar(1.12 + beat * 0.7)
    }
  })

  return (
    <group ref={group} position={[-0.78, 1.18, -0.1]}>
      <mesh geometry={geometry} castShadow={false}>
        <meshStandardMaterial
          color="#ff3f66"
          emissive={ROSE}
          emissiveIntensity={0.55}
          roughness={0.18}
          metalness={0.25}
        />
      </mesh>

      {/* Additive shell reads as the glow around the beat */}
      <mesh ref={shell} geometry={geometry}>
        <meshBasicMaterial
          color={ROSE}
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {quality === 'high' ? (
        <mesh rotation={[1.35, 0.2, 0]} position={[0, -0.1, 0]}>
          <torusGeometry args={[1.32, 0.018, 8, 80]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.5} />
        </mesh>
      ) : null}
    </group>
  )
}

function Instruments({ quality }: { quality: 'low' | 'high' }) {
  const group = useRef<THREE.Group>(null)
  const crossGeometry = useDisposable(() => createCrossGeometry())

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.rotation.y = t * 0.12 + pointerState.x * 0.25
    // Objects spread apart slightly as the hero scrolls away
    group.current.scale.setScalar(1 + scrollState.heroProgress * 0.25)
  })

  return (
    <group ref={group}>
      {/* Stethoscope ring */}
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh position={[-1.3, 0.34, -0.3]} rotation={[0.5, 0.3, 0]}>
          <torusGeometry args={[0.3, 0.062, 14, 48]} />
          <meshStandardMaterial
            color={ROYAL}
            emissive={ROYAL}
            emissiveIntensity={0.22}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
      </Float>

      {/* Capsule */}
      <Float speed={1.05} rotationIntensity={0.8} floatIntensity={0.9}>
        <mesh position={[0.52, 1.92, -0.5]} rotation={[0.3, 0, -0.75]}>
          <capsuleGeometry args={[0.14, 0.38, 8, 20]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={CYAN}
            emissiveIntensity={0.28}
            roughness={0.12}
            metalness={0.1}
          />
        </mesh>
      </Float>

      {/* Medical cross */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh geometry={crossGeometry} position={[1.3, 0.78, -0.1]} rotation={[0.2, 0.4, 0.2]} scale={0.7}>
          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      </Float>

      {/* Cell cluster */}
      <Float speed={0.9} rotationIntensity={1} floatIntensity={0.6}>
        <group position={[-1.26, 2.02, -0.35]} scale={0.6}>
          {[
            [0, 0, 0],
            [0.3, 0.26, 0.1],
            [0.26, -0.24, -0.1],
          ].map((p, i) => (
            <mesh key={i} position={p as [number, number, number]}>
              <sphereGeometry args={[0.2, quality === 'high' ? 24 : 12, quality === 'high' ? 24 : 12]} />
              <meshStandardMaterial
                color={i === 1 ? VIOLET : ROYAL}
                emissive={i === 1 ? VIOLET : ROYAL}
                emissiveIntensity={0.4}
                roughness={0.15}
                metalness={0.4}
              />
            </mesh>
          ))}
        </group>
      </Float>

      {quality === 'high' ? (
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}>
          <mesh position={[1.08, -1.52, -0.7]} rotation={[0.4, 0.2, 0]}>
            <icosahedronGeometry args={[0.26, 0]} />
            <meshStandardMaterial
              color={VIOLET}
              emissive={VIOLET}
              emissiveIntensity={0.35}
              roughness={0.25}
              metalness={0.5}
              flatShading
            />
          </mesh>
        </Float>
      ) : null}
    </group>
  )
}

function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null)
  const { positions } = useMemo(() => createParticlePositions(count), [count])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame(({ clock }) => {
    if (!points.current) return
    const t = clock.elapsedTime
    points.current.rotation.y = t * 0.035 + pointerState.x * 0.08
    points.current.rotation.x = pointerState.y * 0.05
    points.current.position.y = scrollState.heroProgress * 1.4
  })

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        color={CYAN}
        transparent
        opacity={0.75}
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
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, base.current + p * 2.4, 0.08)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, p * 0.9, 0.08)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointerState.x * 0.35, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

/** Point light that tracks the cursor, so the objects relight as you move. */
function CursorLight() {
  const light = useRef<THREE.PointLight>(null)

  useFrame(() => {
    if (!light.current) return
    light.current.position.x = THREE.MathUtils.lerp(
      light.current.position.x,
      pointerState.x * 4,
      0.06,
    )
    light.current.position.y = THREE.MathUtils.lerp(
      light.current.position.y,
      -pointerState.y * 3,
      0.06,
    )
  })

  return <pointLight ref={light} position={[2, 2, 4]} intensity={38} color={CYAN} distance={14} />
}

export default function HeroScene({ quality = 'high' }: { quality?: 'low' | 'high' }) {
  const particleCount = quality === 'high' ? 1100 : 350

  return (
    <Canvas
      dpr={quality === 'high' ? [1, 1.75] : 1}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      gl={{ antialias: quality === 'high', alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
      frameloop="always"
    >
      <AdaptiveDpr pixelated={false} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[-4, 5, 6]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={26} color={VIOLET} distance={16} />
      <CursorLight />

      <ParticleField count={particleCount} />
      <HeartCore quality={quality} />
      <Instruments quality={quality} />
      <ScrollRig />
    </Canvas>
  )
}
