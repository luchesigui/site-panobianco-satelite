"use client";

import { createContext, use, useEffect, useReducer, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

type State = { theme: Theme; mounted: boolean };
type Action = { type: 'INIT'; theme: Theme } | { type: 'TOGGLE' };

function reducer(state: State, action: Action): State {
  if (action.type === 'INIT') return { theme: action.theme, mounted: true };
  return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { theme: 'light', mounted: false });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    dispatch({ type: 'INIT', theme: savedTheme ?? preferred });
  }, []);

  const toggleTheme = () => {
    const next = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    dispatch({ type: 'TOGGLE' });
  };

  return (
    <ThemeContext.Provider value={{ theme: state.theme, toggleTheme, mounted: state.mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = use(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
