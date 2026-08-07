import type { Locale } from '../types';

export function formatMoney(amount: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat(getNumberLocale(locale), {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  switch (locale) {
    case 'uz':
      return `${formatted} so'm`;
    case 'en':
      return `UZS ${formatted}`;
    default:
      return `${formatted} сум`;
  }
}

function getNumberLocale(locale: Locale): string {
  switch (locale) {
    case 'en':
      return 'en-US';
    case 'uz':
      return 'uz-UZ';
    default:
      return 'ru-RU';
  }
}

export function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat(getNumberLocale(locale), {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
