'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import frTranslations from '@/translations/fr.json';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [translations, setTranslations] = useState<any>(frTranslations);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && savedLanguage !== 'fr') {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // French is preloaded, only load other languages dynamically
    if (language === 'fr') {
      setTranslations(frTranslations);
      setIsLoading(false);
      return;
    }

    // Load other languages dynamically
    setIsLoading(true);
    import(`@/translations/${language}.json`)
      .then((module) => {
        setTranslations(module.default);
        setIsLoading(false);
      })
      .catch(() => {
        setTranslations(frTranslations);
        setIsLoading(false);
      });
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }

    return value || key;
  };

  // Ne pas afficher le contenu tant que les traductions ne sont pas chargées
  if (isLoading || !translations) {
    return (
      <div className="fixed inset-0 bg-cygne-cream flex items-center justify-center">
        <div className="text-cygne-brown text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
