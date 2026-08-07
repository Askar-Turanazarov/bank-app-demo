import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBankStore } from '../store/useBankStore';
import { CategoryGrid } from '../components/payments/CategoryGrid';
import { ServiceList } from '../components/payments/ServiceList';

export function PaymentsPage() {
  const { t } = useTranslation();
  const { categoryId } = useParams<{ categoryId?: string }>();
  const navigate = useNavigate();
  const getCategory = useBankStore((s) => s.getCategory);

  const category = categoryId ? getCategory(categoryId) : undefined;

  return (
    <div className="py-4">
      {category ? (
        <div className="mb-4 flex items-center gap-3 px-5">
          <button
            type="button"
            onClick={() => navigate('/payments')}
            className="flex h-9 w-9 items-center justify-center rounded-xl glass text-lg text-white hover:bg-white/15"
          >
            ←
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">{t(category.nameKey)}</h1>
            <p className="text-xs text-white/50">{t('payments.selectService')}</p>
          </div>
        </div>
      ) : (
        <div className="mb-4 px-5">
          <h1 className="text-xl font-bold text-white">{t('payments.title')}</h1>
          <p className="text-xs text-white/50">{t('payments.categories')}</p>
        </div>
      )}

      {categoryId ? <ServiceList categoryId={categoryId} /> : <CategoryGrid />}
    </div>
  );
}
