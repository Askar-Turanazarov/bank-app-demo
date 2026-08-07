export const motionTokens = {
  perspective: 1200,
  duration: { fast: 0.2, normal: 0.45, slow: 0.7 },
  easing: [0.34, 1.2, 0.64, 1] as [number, number, number, number],
  depth: { near: 40, mid: 80, far: 120 },
};

export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
