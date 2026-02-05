import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { SupportedLocale, translations } from './translations';

type TranslationValue = string | string[];

interface I18nContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

const getNestedValue = (obj: Record<string, unknown>, path: string): TranslationValue => {
  return path.split('.').reduce((prev: unknown, curr: string) => {
    if (prev && typeof prev === 'object' && curr in prev) {
      return (prev as Record<string, unknown>)[curr];
    }
    return '';
  }, obj) as TranslationValue;
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    const savedLocale = localStorage.getItem('locale') as SupportedLocale;
    return savedLocale && (savedLocale === 'en' || savedLocale === 'pt-br') ? savedLocale : 'en';
  });

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: string): string => {
    const translation = getNestedValue(translations[locale] as unknown as Record<string, unknown>, key);

    if (key === 'footer.copyright' && typeof translation === 'string') {
      return translation.replace('{year}', new Date().getFullYear().toString());
    }

    return typeof translation === 'string' ? translation : '';
  };

  const tArray = (key: string): string[] => {
    const translation = getNestedValue(translations[locale] as unknown as Record<string, unknown>, key);
    return Array.isArray(translation) ? translation : [];
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tArray }}>
      {children}
    </I18nContext.Provider>
  );
};
