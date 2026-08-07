import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../motion/variants';

interface QuickActionsProps {
  onAddCard: () => void;
}

export function QuickActions({ onAddCard }: QuickActionsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const actions = [
    { label: t('dashboard.pay'), icon: '💳', onClick: () => navigate('/payments') },
    { label: t('dashboard.addCard'), icon: '➕', onClick: onAddCard },
    { label: t('dashboard.viewHistory'), icon: '📋', onClick: () => navigate('/history') },
  ];

  return (
    <motion.div
      className="grid grid-cols-3 gap-3 px-5"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {actions.map((action) => (
        <motion.button
          key={action.label}
          type="button"
          variants={fadeInUp}
          onClick={action.onClick}
          className="flex flex-col items-center gap-2 rounded-2xl glass p-4 transition-colors hover:bg-white/12"
        >
          <span className="text-2xl">{action.icon}</span>
          <span className="text-center text-xs font-medium text-white/80">{action.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
