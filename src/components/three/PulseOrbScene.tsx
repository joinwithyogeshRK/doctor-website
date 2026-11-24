import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { pointerState } from '../../lib/scrollState'

/**
 * A single faceted orb in a wire cage — the second and last WebGL moment on the
 * page, deliberately light so the consultation section stays responsive.
 */
function Orb() {
  const core = useRef<THREE.Mesh>(null)
  const cage = useRef<THREE.LineSegments>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (core.current) {
      core.current.rotation.y = t * 0.25 + pointerState.x * 0.3
      core.current.rotation.x = t * 0.12 + pointerState.y * 0.2
      const beat = 1 + Math.sin(t * 2.2) * 0.035
      core.current.scale.setScalar(beat)
    }
    if (cage.current) {
      cage.current.rotation.y = -t * 0.16
      cage.current.rotation.z = t * 0.07
    }
  })

  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#2e6bff"
          emissive="#36d7f4"
          emissiveIntensity={0.42}
          roughness={0.25}
          metalness={0.55}
          flatShading
        />
      </mesh>
      <lineSegments ref={cage}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.5, 1)]} />
        <lineBasicMaterial color="#36d7f4" transparent opacity={0.35} />
      </lineSegments>
    </Float>
  )
}

export default function PulseOrbScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <pointLight position={[-3, -2, 2]} intensity={24} color="#8b6bff" distance={12} />
      <Orb />
    </Canvas>
  )
}
