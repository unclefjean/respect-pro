import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  style?: ViewStyle;
  barColor?: string;
  backgroundColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  style,
  barColor,
  backgroundColor,
}) => {
  // Ensure progress is between 0-100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Determine color based on progress
  const getColorByProgress = () => {
    if (!barColor) {
      if (clampedProgress < 30) return colors.error;
      if (clampedProgress < 70) return colors.warning;
      return colors.success;
    }
    return barColor;
  };

  return (
    <View 
      style={[
        styles.container, 
        { height, backgroundColor: backgroundColor || colors.surface },
        style
      ]}
    >
      <View 
        style={[
          styles.progress, 
          { 
            width: `${clampedProgress}%`,
            backgroundColor: getColorByProgress(),
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});