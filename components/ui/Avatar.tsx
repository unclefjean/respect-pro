import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: number;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 40,
  style,
}) => {
  const getInitials = (name?: string) => {
    if (!name) return '?';
    
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };
  
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  
  const textStyle = {
    fontSize: size * 0.4,
  };
  
  return (
    <View style={[styles.container, containerStyle, style]}>
      {source ? (
        <Image 
          source={{ uri: source }} 
          style={[styles.image, containerStyle]}
          // Добавляем обработку ошибок загрузки изображения
          onError={(e) => console.log('Error loading avatar:', e.nativeEvent.error)}
        />
      ) : (
        <Text style={[styles.initials, textStyle]}>
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    color: colors.text,
    fontWeight: 'bold',
  },
});