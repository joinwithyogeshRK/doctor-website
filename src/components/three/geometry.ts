/**
 * Positions for the hero's drifting particle cloud, biased into a soft shell so
 * the field reads as depth around the subject rather than an even fog.
 */
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
