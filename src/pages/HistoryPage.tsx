import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useBankStore } from '../store/useBankStore';
import { formatDate, formatMoney } from '../utils/formatMoney';
import type { HistoryFilter } from '../types';
import { fadeInUp, staggerContainer } from '../motion/variants';

export function HistoryPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as 'ru' | 'uz' | 'en';
  const transactions = useBankStore((s) => s.transactions);
  const cards = useBankStore((s) => s.cards);

  const [filter, setFilter] = useState<HistoryFilter>('all');

  const filters: { id: HistoryFilter; labelKey: string }[] = [
    { id: 'all', labelKey: 'history.all' },
    { id: 'payments', labelKey: 'history.payments' },
    { id: 'topups', labelKey: 'history.topups' },
  ];

  const filteredTransactions = transactions.filter(() => {
    if (filter === 'payments') return true;
    if (filter === 'topups') return false;
    return true;
  });

  const getCardMask = (cardId: string) => {
    const card = cards.find((c) => c.id === cardId);
    return card ? card.maskedNumber.slice(-8) : '';
  };

  return (
    <div className="py-2">
      <div className="glass rounded-3xl p-6 md:p-8 shadow-2xl">
        {/* Header + Filter Row */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-white">{t('history.title')}</h1>
            <p className="text-sm text-white/50">{transactions.length} operations recorded</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 rounded-2xl bg-white/5 p-1.5 border border-white/10 max-w-md">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filter === f.id
                    ? 'bg-brand-accent text-white shadow'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {t(f.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl glass p-12 text-center">
            <span className="mb-3 text-5xl">📋</span>
            <p className="text-base text-white/60">{t('history.noTransactions')}</p>
          </div>
        ) : (
          <motion.ul
            className="space-y-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredTransactions.map((tx) => (
              <motion.li
                key={tx.id}
                variants={fadeInUp}
                className="flex items-center justify-between rounded-2xl glass p-4 md:px-6 transition-all hover:bg-white/12"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                    💸
                  </span>
                  <div>
                    <p className="text-base font-semibold text-white">
                      {t(tx.serviceNameKey)}
                    </p>
                    <p className="text-xs text-white/50">
                      {tx.account} {getCardMask(tx.cardId) ? `• ${getCardMask(tx.cardId)}` : ''}
                    </p>
                    <p className="text-[11px] text-white/40">
                      {formatDate(tx.createdAt, locale)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-base font-bold text-red-400">
                    -{formatMoney(tx.amount, locale)}
                  </p>
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      tx.status === 'success'
                        ? 'bg-brand-success/20 text-brand-success'
                        : tx.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {t(`history.status.${tx.status}`)}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  );
}
