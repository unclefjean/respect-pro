import { useCallback } from 'react';
import { useLanguageStore } from '@/store/language-store';
import { translations } from '@/translations';

export const useTranslations = () => {
  const { currentLanguage } = useLanguageStore();
  
  const t = useCallback((key: string, defaultValue?: string): string => {
    const keys = key.split('.');
    let result = translations[currentLanguage];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k] as any;
      } else {
        return defaultValue || key;
      }
    }
    
    return typeof result === 'string' ? result : defaultValue || key;
  }, [currentLanguage]);
  
  return { t, currentLanguage };
};