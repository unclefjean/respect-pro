import { Platform } from 'react-native';

// Функция для форматирования валюты в тенге
export const formatCurrency = (amount: number): string => {
  // Для больших чисел используем компактный формат
  if (amount >= 1000000) {
    return new Intl.NumberFormat('ru-KZ', {
      style: 'currency',
      currency: 'KZT',
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Для обычных чисел используем стандартный формат
  return new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Функция для отображения символа валюты
export const getCurrencySymbol = (): string => {
  return '₸';
};

// Функция для конвертации из долларов в тенге (для демонстрации)
// Примерный курс: 1 USD = 450 KZT
export const usdToKzt = (usdAmount: number): number => {
  return usdAmount * 400;
};