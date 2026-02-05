import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import en from './locales/en.json';
import pt from './locales/pt.json';

export const SUPPORTED_LOCALES = ['en', 'pt'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

// Resources for i18next
export const resources = {
  en: { translation: en },
  pt: { translation: pt },
};

// Initialize i18next for desktop (React apps without Next.js)
export function initI18n(locale: SupportedLocale = DEFAULT_LOCALE) {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources,
      lng: locale,
      fallbackLng: DEFAULT_LOCALE,
      interpolation: {
        escapeValue: false,
      },
    });
  } else {
    i18n.changeLanguage(locale);
  }
  return i18n;
}

// Hook for using translations (desktop)
export function useTranslations(namespace?: string) {
  const { t, i18n: i18nInstance } = useTranslation(namespace);
  return {
    t,
    locale: i18nInstance.language as SupportedLocale,
    changeLocale: (locale: SupportedLocale) => i18nInstance.changeLanguage(locale),
  };
}

// Get translation function for non-React contexts
export function getTranslations(locale: SupportedLocale = DEFAULT_LOCALE) {
  initI18n(locale);
  return i18n.getFixedT(locale);
}

// Re-export i18n instance for advanced usage
export { i18n };

// Export locale data for web (next-intl compatibility)
export { en, pt };
