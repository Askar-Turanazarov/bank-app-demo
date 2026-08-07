import { useTranslation } from 'react-i18next';
import { useBankStore } from '../../store/useBankStore';
import { formatMoney } from '../../utils/formatMoney';

export function BalanceHeader() {
  const { t, i18n } = useTranslation();
  const user = useBankStore((s) => s.user);
  const totalBalance = useBankStore((s) => s.totalBalance());
  const locale = i18n.language as 'ru' | 'uz' | 'en';

  return (
    <div className="px-5 pt-2 pb-4">
      <p className="text-sm text-white/60">
        {t('dashboard.greeting')}, {user.name}
      </p>
      <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
        {t('dashboard.totalBalance')}
      </p>
      <p className="mt-1 text-3xl font-bold text-white">
        {formatMoney(totalBalance, locale)}
      </p>
    </div>
  );
}
