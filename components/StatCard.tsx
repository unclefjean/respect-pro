import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { Card } from './ui/Card';
import { useTranslations } from '@/hooks/use-translations';
import { getCurrencySymbol } from '@/utils/currency';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon,
  change,
  style 
}) => {
  const { t } = useTranslations();
  
  // Если значение начинается с $ (доллар), заменяем на ₸ (тенге)
  const formattedValue = typeof value === 'string' && value.startsWith('$') 
    ? `${getCurrencySymbol()}${value.substring(1)}`
    : value;
  
  return (
    <Card style={[styles.card, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconContainer}>{icon}</View>
      </View>
      
      <Text style={styles.value}>{formattedValue}</Text>
      
      {change && (
        <View style={styles.changeContainer}>
          <View style={[
            styles.changeIndicator, 
            { backgroundColor: change.isPositive ? colors.success : colors.error }
          ]}>
            <Text style={styles.changeValue}>
              {change.isPositive ? '+' : ''}{change.value}%
            </Text>
          </View>
          <Text style={styles.changePeriod}>{t('dashboard.vsLastMonth')}</Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  changeIndicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  changeValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.background,
  },
  changePeriod: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});