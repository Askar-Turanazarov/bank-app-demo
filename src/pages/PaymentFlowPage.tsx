import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBankStore } from '../store/useBankStore';
import { Button } from '../components/shared/Button';
import { Toast } from '../components/shared/Toast';
import { PaymentSuccessOverlay } from '../components/payments/PaymentSuccessOverlay';
import { formatMoney } from '../utils/formatMoney';

const QUICK_AMOUNTS = [10_000, 50_000, 100_000, 200_000];

export function PaymentFlowPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as 'ru' | 'uz' | 'en';
  const { categoryId, serviceId } = useParams<{ categoryId: string; serviceId: string }>();
  const navigate = useNavigate();

  const getService = useBankStore((s) => s.getService);
  const cards = useBankStore((s) => s.cards);
  const processPayment = useBankStore((s) => s.processPayment);

  const service = serviceId ? getService(serviceId) : undefined;
  const defaultCard = cards.find((c) => c.isDefault) || cards[0];

  const [selectedCardId, setSelectedCardId] = useState<string>(defaultCard?.id || '');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' }>({
    visible: false,
    message: '',
    type: 'error',
  });

  useEffect(() => {
    if (cards.length > 0 && !selectedCardId) {
      setSelectedCardId(cards.find((c) => c.isDefault)?.id || cards[0].id);
    }
  }, [cards, selectedCardId]);

  if (!service) {
    return (
      <div className="p-5 text-center">
        <p className="text-white/60">{t('errors.serviceNotFound')}</p>
        <Button className="mt-4" onClick={() => navigate('/payments')}>
          {t('common.back')}
        </Button>
      </div>
    );
  }

  const selectedCard = cards.find((c) => c.id === selectedCardId);

  const showToastMsg = (message: string, type: 'success' | 'error' = 'error') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();

    if (!account.trim()) {
      showToastMsg(t('errors.invalidAmount'));
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      showToastMsg(t('errors.invalidAmount'));
      return;
    }

    if (!selectedCard) {
      showToastMsg(t('errors.cardNotFound'));
      return;
    }

    if (selectedCard.balance < numAmount) {
      showToastMsg(t('errors.insufficientFunds'));
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = processPayment({
        cardId: selectedCardId,
        serviceId: service.id,
        account,
        amount: numAmount,
      });

      setLoading(false);

      if (result.success) {
        setShowSuccess(true);
      } else {
        const errorKey = `errors.${result.error}`;
        showToastMsg(t(errorKey));
      }
    }, 1500);
  };

  return (
    <div className="relative py-4 max-w-2xl mx-auto">
      {/* Card Wrapper */}
      <div className="glass rounded-3xl p-6 md:p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4 border-b border-white/10 pb-5">
          <button
            type="button"
            onClick={() => navigate(categoryId ? `/payments/${categoryId}` : '/payments')}
            className="flex h-10 w-10 items-center justify-center rounded-xl glass text-lg text-white hover:bg-white/15"
          >
            ←
          </button>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              {service.icon}
            </span>
            <div>
              <h1 className="text-xl font-bold text-white">{t(service.nameKey)}</h1>
              <p className="text-xs text-white/50">{t('payments.details')}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handlePay} className="space-y-6">
          {/* Account Number or Phone Input */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
              {t(service.accountLabelKey)}
            </label>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder={t(service.accountPlaceholderKey)}
              className="w-full rounded-2xl bg-white/10 px-4 py-3.5 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          {/* Amount Input */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
              {t('payments.amount')}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0 UZS"
              min="1000"
              className="w-full rounded-2xl bg-white/10 px-4 py-3.5 text-2xl font-bold text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-brand-accent"
            />
            {/* Quick pills */}
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt.toString())}
                  className="rounded-xl glass px-3.5 py-2 text-xs font-semibold text-white/80 transition-colors hover:bg-white/20"
                >
                  {formatMoney(amt, locale)}
                </button>
              ))}
            </div>
          </div>

          {/* Card Selector */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
              {t('payments.selectCard')}
            </label>
            {cards.length === 0 ? (
              <p className="text-xs text-red-400">{t('cards.noCards')}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setSelectedCardId(card.id)}
                    className={`flex items-center justify-between rounded-2xl p-4 text-left transition-all ${
                      selectedCardId === card.id
                        ? 'border-2 border-brand-accent bg-white/15 shadow-lg'
                        : 'glass opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {card.type === 'visa' ? '💳' : card.type === 'humo' ? '🟢' : '🟧'}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{card.maskedNumber}</p>
                        <p className="text-xs text-white/50">{card.holder}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-white">{formatMoney(card.balance, locale)}</p>
                      {card.isDefault && (
                        <span className="text-[10px] text-brand-success">★ {t('common.default')}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" fullWidth loading={loading} disabled={cards.length === 0}>
            {loading ? t('payments.processing') : t('payments.confirm')}
          </Button>
        </form>
      </div>

      {/* Toast Notification */}
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />

      {/* Success Animation Overlay */}
      <PaymentSuccessOverlay visible={showSuccess} />
    </div>
  );
}
