import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';

export default function ProjectsLayout() {
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
      }}
    />
  );
}