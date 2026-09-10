import { useState, useCallback } from 'react';

type FontSize = 'small' | 'medium' | 'large';

const FONT_SIZES: Record<FontSize, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

export function useAccessibility() {
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const setFontSize = useCallback((size: FontSize) => {
    setFontSizeState(size);
    document.documentElement.style.fontSize = FONT_SIZES[size];
  }, []);

  return { fontSize, setFontSize, language, setLanguage };
}
