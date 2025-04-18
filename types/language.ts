export type LanguageCode = 'en' | 'ru' | 'kk';

export interface Translation {
  [key: string]: string | Translation;
}

export interface LanguageState {
  currentLanguage: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}