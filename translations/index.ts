import { en } from './en';
import { ru } from './ru';
import { kk } from './kk';
import { LanguageCode, Translation } from '@/types/language';

export const translations: Record<LanguageCode, Translation> = {
  en,
  ru,
  kk,
};

export const languageNames = {
  en: {
    name: 'English',
    nativeName: 'English',
  },
  ru: {
    name: 'Russian',
    nativeName: 'Русский',
  },
  kk: {
    name: 'Kazakh',
    nativeName: 'Қазақша',
  },
};