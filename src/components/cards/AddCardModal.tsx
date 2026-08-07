import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { useBankStore } from '../../store/useBankStore';
import {
  formatCardNumberInput,
  formatExpiryInput,
  validateExpiry,
  validateLuhn,
} from '../../utils/cardUtils';
import type { CardType } from '../../types';

interface AddCardModalProps {
  open: boolean;
  onClose: () => void;
}

const cardTypes: CardType[] = ['humo', 'visa', 'uzcard'];

export function AddCardModal({ open, onClose }: AddCardModalProps) {
  const { t } = useTranslation();
  const addCard = useBankStore((s) => s.addCard);

  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [holder, setHolder] = useState('');
  const [type, setType] = useState<CardType>('humo');
  const [balance, setBalance] = useState('1000000');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reset = () => {
    setNumber('');
    setExpiry('');
    setHolder('');
    setType('humo');
    setBalance('1000000');
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    const digits = number.replace(/\D/g, '');

    if (!validateLuhn(digits)) newErrors.number = t('cards.invalidNumber');
    if (!validateExpiry(expiry)) newErrors.expiry = t('cards.invalidExpiry');
    if (!holder.trim()) newErrors.holder = t('cards.holderRequired');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addCard({
      number: digits,
      expiry,
      holder: holder.trim(),
      type,
      balance: parseInt(balance, 10) || 0,
    });

    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={() => { reset(); onClose(); }} title={t('cards.addCard')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-white/60">{t('cards.cardNumber')}</label>
          <input
            value={number}
            onChange={(e) => setNumber(formatCardNumberInput(e.target.value))}
            placeholder="9860 1234 5678 9012"
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-brand-accent"
          />
          {errors.number && <p className="mt-1 text-xs text-red-400">{errors.number}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-white/60">{t('cards.expiry')}</label>
            <input
              value={expiry}
              onChange={(e) => setExpiry(formatExpiryInput(e.target.value))}
              placeholder="MM/YY"
              className="w-full rounded-xl bg-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-brand-accent"
            />
            {errors.expiry && <p className="mt-1 text-xs text-red-400">{errors.expiry}</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/60">{t('cards.type')}</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as CardType)}
              className="w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-brand-accent"
            >
              {cardTypes.map((ct) => (
                <option key={ct} value={ct} className="bg-brand-primary">
                  {ct.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-white/60">{t('cards.holder')}</label>
          <input
            value={holder}
            onChange={(e) => setHolder(e.target.value.toUpperCase())}
            placeholder="ALISHER K."
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-brand-accent"
          />
          {errors.holder && <p className="mt-1 text-xs text-red-400">{errors.holder}</p>}
        </div>

        <div>
          <label className="mb-1 block text-xs text-white/60">{t('cards.initialBalance')}</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            min="0"
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="ghost" fullWidth onClick={() => { reset(); onClose(); }}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" fullWidth>
            {t('common.save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
