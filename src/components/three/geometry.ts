import * as THREE from 'three'

/**
 * A heart built from the classic parametric curve, extruded and bevelled.
 * Procedural rather than a loaded model, so it costs nothing to download.
 */
export function createHeartGeometry(depth = 0.42) {
  const points: THREE.Vector2[] = []
  const steps = 128

  for (let i = 0; i <= steps; i += 1) {
    const t = (i / steps) * Math.PI * 2
    const x = 16 * Math.sin(t) ** 3
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    points.push(new THREE.Vector2(x / 16, y / 16))
  }

  const shape = new THREE.Shape(points)
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.18,
    bevelSize: 0.16,
    bevelSegments: 10,
    curveSegments: 48,
  })

  geometry.center()
  geometry.computeVertexNormals()
  return geometry
}

/** A plus sign made from one shape, used for the floating medical crosses. */
export function createCrossGeometry(arm = 0.34, thickness = 0.13, depth = 0.16) {
  const shape = new THREE.Shape()
  const t = thickness
  shape.moveTo(-t, -arm)
  shape.lineTo(t, -arm)
  shape.lineTo(t, -t)
  shape.lineTo(arm, -t)
  shape.lineTo(arm, t)
  shape.lineTo(t, t)
  shape.lineTo(t, arm)
  shape.lineTo(-t, arm)
  shape.lineTo(-t, t)
  shape.lineTo(-arm, t)
  shape.lineTo(-arm, -t)
  shape.lineTo(-t, -t)
  shape.closePath()

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.035,
    bevelSegments: 4,
  })
  geometry.center()
  geometry.computeVertexNormals()
  return geometry
}

/** Positions for the drifting particle cloud, biased into a soft shell. */
export function createParticlePositions(count: number, radius = 7) {
  const positions = new Float32Array(count * 3)
  const scales = new Float32Array(count)

  for (let i = 0; i < count; i += 1) {
    const r = radius * (0.45 + Math.random() * 0.55)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.65
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.5 - 1
    scales[i] = 0.4 + Math.random() * 0.6
  }

  return { positions, scales }
}
