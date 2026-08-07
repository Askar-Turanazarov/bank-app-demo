import { AnimatePresence, motion } from 'framer-motion';
import { motionTokens } from '../../motion/tokens';

interface ToastProps {
  message: string;
  visible: boolean;
  type?: 'success' | 'error';
}

export function Toast({ message, visible, type = 'success' }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, z: motionTokens.depth.mid }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing }}
          className={`fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-2xl px-5 py-3 text-sm font-medium shadow-xl ${
            type === 'success'
              ? 'bg-brand-success text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
