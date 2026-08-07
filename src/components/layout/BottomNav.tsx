import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/', icon: '🏠', key: 'nav.home' },
  { to: '/payments', icon: '💳', key: 'nav.payments' },
  { to: '/cards', icon: '🪪', key: 'nav.cards' },
  { to: '/history', icon: '📋', key: 'nav.history' },
];

export function BottomNav() {
  const { t } = useTranslation();

  return (
    <nav className="sticky bottom-0 z-40 border-t border-white/10 glass px-2 pb-safe pt-2">
      <ul className="flex items-center justify-around">
        {navItems.map(({ to, icon, key }) => (
          <li key={to}>
            <NavLink to={to} end={to === '/'}>
              {({ isActive }) => (
                <motion.div
                  className={`flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-medium transition-colors ${
                    isActive ? 'text-brand-success' : 'text-white/50'
                  }`}
                  animate={{ scale: isActive ? 1.15 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xl">{icon}</span>
                  <span>{t(key)}</span>
                </motion.div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
