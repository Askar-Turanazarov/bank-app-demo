import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { BottomNav } from './BottomNav';
import { SidebarNav } from './SidebarNav';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AnimatedPage } from '../shared/AnimatedPage';

export function AppLayout() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<'retro' | 'apple'>(localStorage.getItem('appTheme') as 'retro' | 'apple' ?? 'retro');
  const toggleTheme = () => setTheme(prev => (prev === 'retro' ? 'apple' : 'retro'));
  useEffect(() => {
    if (theme === 'apple') {
      document.body.classList.add('theme-apple');
    } else {
      document.body.classList.remove('theme-apple');
    }
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0220] via-[#1a0533] to-[#2d1260] text-white flex flex-col md:flex-row">
      {/* PC / Desktop Sidebar Navigation */}
      <SidebarNav />

      {/* Main Container */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile Header (Hidden on PC) */}
        <header className="sticky top-0 z-30 flex md:hidden items-center justify-between px-5 py-4 glass">
          <div>
            <p className="text-xs text-white/50">{t('app.name')}</p>
            <h1 className="text-lg font-bold text-white">{t('app.name')}</h1>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher />
            <button onClick={toggleTheme} className="ml-2 px-2 py-1 rounded glass text-sm text-white hover:bg-white/15">Toggle Theme</button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">
          <AnimatedPage />
        </main>

        {/* Mobile Bottom Navigation (Hidden on PC) */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
