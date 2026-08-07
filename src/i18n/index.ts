import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { Locale } from '../types';
import ru from './locales/ru.json';
import uz from './locales/uz.json';
import en from './locales/en.json';

const LOCALE_KEY = 'bank-app-locale';

export function getStoredLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_KEY);
  if (stored === 'ru' || stored === 'uz' || stored === 'en') return stored;
  return 'ru';
}

export function setStoredLocale(locale: Locale): void {
  localStorage.setItem(LOCALE_KEY, locale);
}

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    uz: { translation: uz },
    en: { translation: en },
  },
  lng: getStoredLocale(),
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
});

export default i18n;
