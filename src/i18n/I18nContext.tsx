import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { translations, type Dict, type Lang } from './translations';

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const STORAGE_KEY = 'lk-lang';
const SUPPORTED: Lang[] = ['ru', 'kk', 'en'];

const detect = (): Lang => {
  if (typeof window === 'undefined') return 'ru';
  const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (saved && SUPPORTED.includes(saved)) return saved;
  const nav = window.navigator.language.slice(0, 2).toLowerCase();
  if (nav === 'kk') return 'kk';
  if (nav === 'en') return 'en';
  return 'ru';
};

const I18nContext = createContext<I18nValue | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(detect);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
