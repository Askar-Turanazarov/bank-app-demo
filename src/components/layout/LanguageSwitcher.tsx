import { useTranslation } from 'react-i18next';
import i18n, { setStoredLocale } from '../../i18n';
import type { Locale } from '../../types';

const locales: { code: Locale; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
  { code: 'en', label: 'EN' },
];

export function LanguageSwitcher() {
  const { i18n: i18nInstance } = useTranslation();
  const current = i18nInstance.language as Locale;

  const handleChange = (locale: Locale) => {
    void i18n.changeLanguage(locale);
    setStoredLocale(locale);
  };

  return (
    <div className="flex items-center gap-0.5 rounded-xl glass p-0.5">
      {locales.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => handleChange(code)}
          className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
            current === code
              ? 'bg-brand-accent text-white shadow'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
