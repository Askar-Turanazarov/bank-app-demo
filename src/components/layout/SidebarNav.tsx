import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useBankStore } from '../../store/useBankStore';

const navItems = [
  { to: '/', icon: '🏠', key: 'nav.home' },
  { to: '/payments', icon: '💳', key: 'nav.payments' },
  { to: '/cards', icon: '🪪', key: 'nav.cards' },
  { to: '/history', icon: '📋', key: 'nav.history' },
];

export function SidebarNav() {
  const { t } = useTranslation();
  const user = useBankStore((s) => s.user);

  return (
    <aside className="hidden md:flex w-64 flex-col justify-between border-r border-white/10 glass p-6 sticky top-0 h-screen">
      <div className="space-y-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-accent to-brand-success shadow-lg shadow-purple-900/40">
            <span className="text-xl font-black text-white">A</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">{t('app.name')}</h1>
            <p className="text-[11px] text-white/50">Online Banking</p>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 border border-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-accent/20 text-brand-accent font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-semibold text-white">{user.name}</p>
            <p className="text-[11px] text-brand-success font-medium">● Premium Client</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-2">
          {navItems.map(({ to, icon, key }) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {({ isActive }) => (
                <motion.div
                  className={`flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-accent/80 to-purple-600/60 text-white shadow-lg shadow-purple-900/30'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xl">{icon}</span>
                  <span>{t(key)}</span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Language Switcher at Bottom */}
      <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
        <p className="text-xs text-white/40 font-medium">Language / Язык</p>
        <LanguageSwitcher />
      </div>
    </aside>
  );
}
