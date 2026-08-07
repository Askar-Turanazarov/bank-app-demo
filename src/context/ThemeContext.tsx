import React, { createContext, useState, useMemo, ReactNode } from 'react';

type Theme = 'apple-dark' | 'apple-light' | 'default';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'apple-dark',
  toggleTheme: () => {}
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('apple-dark');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'apple-dark' ? 'apple-light' : 'apple-dark'));
  };

  // Apply theme class to body
  useMemo(() => {
    document.body.classList.remove('apple-dark', 'apple-light');
    document.body.classList.add(theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
