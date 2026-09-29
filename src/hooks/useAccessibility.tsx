import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { translate, type Language } from '../utils/translations';

export type FontSize = 'small' | 'medium' | 'large';

const FONT_SIZES: Record<FontSize, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (text: string) => string;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('ncrb_lang');
      return (stored === 'hi' || stored === 'en') ? stored : 'en';
    } catch {
      return 'en';
    }
  });

  const setFontSize = useCallback((size: FontSize) => {
    setFontSizeState(size);
    document.documentElement.style.fontSize = FONT_SIZES[size];
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('ncrb_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // storage unavailable
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  }, [language, setLanguage]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((text: string) => {
    return translate(text, language);
  }, [language]);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityContextType {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    // Graceful fallback if called outside provider
    return {
      fontSize: 'medium',
      setFontSize: () => {},
      language: 'en',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (txt: string) => txt,
    };
  }
  return ctx;
}
