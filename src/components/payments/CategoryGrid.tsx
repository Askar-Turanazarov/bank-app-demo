import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useBankStore } from '../../store/useBankStore';
import { fadeInUp, staggerContainer } from '../../motion/variants';

export function CategoryGrid() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const categories = useBankStore((s) => s.categories);

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          type="button"
          variants={fadeInUp}
          onClick={() => navigate(`/payments/${cat.id}`)}
          className="flex flex-col items-center text-center gap-3 rounded-3xl glass p-5 transition-all hover:bg-white/15 hover:scale-105 hover:shadow-lg"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
            {cat.icon}
          </span>
          <span className="text-sm font-semibold text-white">{t(cat.nameKey)}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
