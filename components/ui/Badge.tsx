import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'small',
  style,
  textStyle,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'success':
        return { backgroundColor: colors.success, color: '#000' };
      case 'warning':
        return { backgroundColor: colors.warning, color: '#000' };
      case 'error':
        return { backgroundColor: colors.error, color: colors.text };
      case 'info':
        return { backgroundColor: colors.secondary, color: colors.background };
      default:
        return { backgroundColor: colors.surface, color: colors.text };
    }
  };

  const variantStyle = getVariantStyle();
  const sizeStyle = size === 'small' ? styles.small : styles.medium;
  const sizeTextStyle = size === 'small' ? styles.smallText : styles.mediumText;

  return (
    <View style={[
      styles.badge, 
      { backgroundColor: variantStyle.backgroundColor },
      sizeStyle,
      style
    ]}>
      <Text style={[
        styles.text, 
        { color: variantStyle.color },
        sizeTextStyle,
        textStyle
      ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
});