import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageCode, LanguageState } from '@/types/language';

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: 'ru',
      setLanguage: (language: LanguageCode) => set({ currentLanguage: language }),
    }),
    {
      name: 'respect-language-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);