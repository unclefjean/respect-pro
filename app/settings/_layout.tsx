import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { useTranslations } from '@/hooks/use-translations';

export default function SettingsLayout() {
const { t } = useTranslations();

return (
  <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerTintColor: colors.text,
      contentStyle: {
        backgroundColor: colors.background,
      },
      // Добавляем заголовок для корневой страницы настроек
      headerTitle: t('settings.title')
    }}
  />
);
}