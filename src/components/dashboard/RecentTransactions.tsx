import { useTranslation } from 'react-i18next';
import { useBankStore } from '../../store/useBankStore';
import { formatMoney, formatDate } from '../../utils/formatMoney';

export function RecentTransactions() {
  const { t, i18n } = useTranslation();
  const transactions = useBankStore((s) => s.transactions);
  const recentTransactions = transactions.slice(0, 5);
  const locale = i18n.language as 'ru' | 'uz' | 'en';

  return (
    <div className="px-5 pb-6">
      <h3 className="mb-3 text-sm font-semibold text-white/80">
        {t('dashboard.recentTransactions')}
      </h3>

      {recentTransactions.length === 0 ? (
        <p className="text-sm text-white/40">{t('dashboard.noTransactions')}</p>
      ) : (
        <ul className="space-y-2">
          {recentTransactions.map((tx) => (
            <li
              key={tx.id}
              className="flex items-center justify-between rounded-2xl glass px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg">
                  💸
                </span>
                <div>
                  <p className="text-sm font-medium text-white">
                    {t(tx.serviceNameKey)}
                  </p>
                  <p className="text-xs text-white/40">
                    {formatDate(tx.createdAt, locale)}
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-red-400">
                -{formatMoney(tx.amount, locale)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
