import { create } from 'zustand';
import { User } from '@/types';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  token: localStorage.getItem('token'),
  isLoading: false,
  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },
  setToken: (token) => {
    set({ token });
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },
  setIsLoading: (loading) => set({ isLoading: loading }),
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
}));

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: localStorage.getItem('theme') === 'dark',
  toggleTheme: () =>
    set((state) => {
      const newValue = !state.isDark;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDark: newValue };
    }),
}));

interface AnalysisStore {
  analyses: any[];
  currentAnalysis: any | null;
  setAnalyses: (analyses: any[]) => void;
  setCurrentAnalysis: (analysis: any) => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  analyses: [],
  currentAnalysis: null,
  setAnalyses: (analyses) => set({ analyses }),
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
}));
