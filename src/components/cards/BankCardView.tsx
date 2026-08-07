import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { BankCard } from '../../types';
import { formatMoney } from '../../utils/formatMoney';
import { useTranslation } from 'react-i18next';

const gradientMap = {
  visa: 'card-gradient-visa',
  humo: 'card-gradient-humo',
  uzcard: 'card-gradient-uzcard',
};

interface BankCardViewProps {
  card: BankCard;
  interactive?: boolean;
  compact?: boolean;
}

export function BankCardView({ card, interactive = true, compact = false }: BankCardViewProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language as 'ru' | 'uz' | 'en';

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`relative w-full select-none preserve-3d ${compact ? 'h-44' : 'h-52'}`}
      style={interactive ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute inset-0 overflow-hidden rounded-3xl p-5 shadow-2xl ${gradientMap[card.type]}`}
      >
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-white/5" />

        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium uppercase tracking-widest text-white/70">
              {card.type}
            </span>
            {card.isDefault && (
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase">
                default
              </span>
            )}
          </div>

          <p className="font-mono text-lg tracking-widest text-white">
            {card.maskedNumber}
          </p>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase text-white/60">Holder</p>
              <p className="text-sm font-semibold text-white">{card.holder}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase text-white/60">Balance</p>
              <p className="text-sm font-bold text-white">
                {formatMoney(card.balance, locale)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
