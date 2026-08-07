import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { pageVariants } from '../../motion/variants';
import { motionTokens } from '../../motion/tokens';

export function AnimatedPage() {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 overflow-y-auto"
      style={{ perspective: motionTokens.perspective, transformStyle: 'preserve-3d' }}
    >
      <Outlet />
    </motion.div>
  );
}
