import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import { colors } from '@/constants/colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  disabled,
  ...rest
}) => {
  const getContainerStyle = () => {
    const variantStyle = styles[variant];
    const sizeStyle = styles[`${size}Container`];
    const disabledStyle = disabled ? styles.disabled : {};
    
    return [styles.container, variantStyle, sizeStyle, disabledStyle, style];
  };
  
  const getTextStyle = () => {
    const variantTextStyle = styles[`${variant}Text`];
    const sizeTextStyle = styles[`${size}Text`];
    const disabledTextStyle = disabled ? styles.disabledText : {};
    
    return [styles.text, variantTextStyle, sizeTextStyle, disabledTextStyle, textStyle];
  };
  
  return (
    <TouchableOpacity
      style={getContainerStyle()}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? colors.text : colors.primary} 
          size="small" 
        />
      ) : (
        <>
          {leftIcon}
          <Text style={getTextStyle()}>{title}</Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 8,
  },
  text: {
    fontWeight: '600',
  },
  
  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.text,
  },
  
  secondary: {
    backgroundColor: colors.secondary,
  },
  secondaryText: {
    color: colors.background,
  },
  
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  outlineText: {
    color: colors.primary,
  },
  
  text: {
    backgroundColor: 'transparent',
  },
  textText: {
    color: colors.primary,
  },
  
  // Sizes
  smallContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  smallText: {
    fontSize: 12,
  },
  
  mediumContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  mediumText: {
    fontSize: 14,
  },
  
  largeContainer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  largeText: {
    fontSize: 16,
  },
  
  // Disabled
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.8,
  },
});