import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { confettiVariants, successCheckVariants } from '../../motion/variants';
import { Button } from '../shared/Button';
import { motionTokens } from '../../motion/tokens';

interface PaymentSuccessOverlayProps {
  visible: boolean;
}

const CONFETTI_COLORS = ['#3d1a78', '#7c3aed', '#00C853', '#1a0533'];

export function PaymentSuccessOverlay({ visible }: PaymentSuccessOverlayProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-dark/95 px-6"
          style={{ perspective: motionTokens.perspective }}
        >
          <div className="relative mb-8">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={confettiVariants}
                initial="initial"
                animate="animate"
                className="absolute left-1/2 top-1/2 h-3 w-3 rounded-sm"
                style={{ backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }}
              />
            ))}

            <motion.div
              initial={{ scale: 0, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing }}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-success/20"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <motion.path
                  d="M12 24 L20 32 L36 16"
                  stroke="#00C853"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  variants={successCheckVariants}
                  initial="initial"
                  animate="animate"
                />
              </svg>
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-2 text-2xl font-bold text-white"
          >
            {t('payments.success')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 w-full max-w-xs"
          >
            <Button fullWidth onClick={() => navigate('/')}>
              {t('common.home')}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
