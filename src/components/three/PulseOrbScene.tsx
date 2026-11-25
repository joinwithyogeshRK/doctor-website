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
        {/* Low metalness on purpose: there is no environment map in this scene,
            and a metal surface with nothing to reflect renders flat and dead. */}
        <meshStandardMaterial
          color="#4fb0dd"
          emissive="#0d6f97"
          emissiveIntensity={0.3}
          roughness={0.38}
          metalness={0.12}
          flatShading
        />
      </mesh>
      <lineSegments ref={cage}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.32, 0)]} />
        <lineBasicMaterial color="#14769f" transparent opacity={0.4} />
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
      <ambientLight intensity={0.6} />
      <directionalLight position={[3.5, 4, 4]} intensity={2.6} color="#eaf1ff" />
      <pointLight position={[-3.2, -1.6, 2.4]} intensity={30} color="#38b6e8" distance={12} />
      {/* Rim from behind, so the facets stay legible against the pale ground */}
      <pointLight position={[0, 1.2, -3.4]} intensity={26} color="#36d7f4" distance={10} />
      <Orb />
    </Canvas>
  )
}
