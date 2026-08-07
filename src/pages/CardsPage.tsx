import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useBankStore } from '../store/useBankStore';
import { BankCardView } from '../components/cards/BankCardView';
import { AddCardModal } from '../components/cards/AddCardModal';
import { Button } from '../components/shared/Button';
import { fadeInUp, staggerContainer } from '../motion/variants';

export function CardsPage() {
  const { t } = useTranslation();
  const cards = useBankStore((s) => s.cards);
  const setDefaultCard = useBankStore((s) => s.setDefaultCard);
  const removeCard = useBankStore((s) => s.removeCard);

  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="py-2">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t('cards.title')}</h1>
          <p className="text-sm text-white/50">{cards.length} cards connected</p>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          + {t('cards.addCard')}
        </Button>
      </div>

      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl glass p-12 text-center">
          <span className="mb-3 text-5xl">🪪</span>
          <p className="mb-4 text-base text-white/60">{t('cards.noCards')}</p>
          <Button onClick={() => setShowAddModal(true)}>{t('cards.addCard')}</Button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={fadeInUp}
              className="flex flex-col gap-3 rounded-3xl glass p-4 transition-transform hover:-translate-y-1"
            >
              <BankCardView card={card} interactive={true} />
              <div className="flex items-center justify-between px-2 pt-1">
                {!card.isDefault ? (
                  <button
                    type="button"
                    onClick={() => setDefaultCard(card.id)}
                    className="text-xs font-medium text-brand-accent hover:underline"
                  >
                    ★ {t('cards.setDefault')}
                  </button>
                ) : (
                  <span className="text-xs text-brand-success font-medium flex items-center gap-1">
                    ✓ {t('common.default')}
                  </span>
                )}

                {cards.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCard(card.id)}
                    className="text-xs text-red-400 hover:text-red-300 hover:underline"
                  >
                    {t('cards.deleteCard')}
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          {/* Add New Card Tile */}
          <motion.button
            variants={fadeInUp}
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex h-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/20 bg-white/5 p-6 text-center transition-colors hover:border-brand-accent hover:bg-white/10"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white">
              +
            </div>
            <p className="text-sm font-semibold text-white">{t('cards.addCard')}</p>
          </motion.button>
        </motion.div>
      )}

      <AddCardModal open={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
