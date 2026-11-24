/**
 * A mutable scroll/pointer snapshot shared with the 3D scene.
 *
 * The Canvas reads these inside useFrame, so scroll and mouse movement drive
 * the scene without pushing state through React on every event.
 */
export const scrollState = {
  /** 0 → 1 across the whole document */
  progress: 0,
  /** pixels scrolled */
  offset: 0,
  /** 0 → 1 across the hero's own height */
  heroProgress: 0,
}

export const pointerState = {
  /** -1 → 1, relative to the viewport centre */
  x: 0,
  y: 0,
}

export function updateScroll(offset: number, limit: number) {
  scrollState.offset = offset
  scrollState.progress = limit > 0 ? offset / limit : 0
  scrollState.heroProgress = Math.min(1, offset / Math.max(1, window.innerHeight))
}
