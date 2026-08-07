import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBankStore } from '../../store/useBankStore';
import { BankCardView } from './BankCardView';
import { cardCarouselVariants } from '../../motion/variants';
import { motionTokens } from '../../motion/tokens';

export function CardCarousel() {
  const cards = useBankStore((s) => s.cards);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (cards.length === 0) return null;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return cards.length - 1;
      if (next >= cards.length) return 0;
      return next;
    });
  };

  const currentCard = cards[index];

  return (
    <div className="perspective-scene px-5">
      <div className="relative mx-auto h-52 max-w-sm overflow-visible">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentCard.id}
            custom={direction}
            variants={cardCarouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) paginate(1);
              else if (info.offset.x > 60) paginate(-1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing preserve-3d"
            style={{ transformStyle: 'preserve-3d', perspective: motionTokens.perspective }}
          >
            <BankCardView card={currentCard} />
          </motion.div>
        </AnimatePresence>
      </div>

      {cards.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {cards.map((card, i) => (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-brand-success' : 'w-2 bg-white/30'
              }`}
              animate={{ scale: i === index ? 1.2 : 1 }}
              transition={{ duration: motionTokens.duration.fast }}
              aria-label={`Card ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
