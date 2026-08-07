import { Suspense, lazy } from 'react';
import { useReducedMotion } from '../../motion/tokens';

const FloatingCardSceneInner = lazy(() =>
  import('./FloatingCardScene').then((m) => ({ default: m.FloatingCardScene })),
);

export function FloatingCardBackground() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-15 blur-sm">
      <Suspense fallback={null}>
        <FloatingCardSceneInner />
      </Suspense>
    </div>
  );
}
