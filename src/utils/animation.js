/**
 * Utility functions for animations
 */

export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
