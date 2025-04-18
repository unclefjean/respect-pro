import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star, Quote } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Review } from '@/types/review';
import { Card } from './ui/Card';
import { Avatar } from './ui/Avatar';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < rating ? colors.warning : 'none'}
        color={index < rating ? colors.warning : colors.textSecondary}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Card style={styles.card}>
      <Quote size={24} color={colors.secondary} style={styles.quoteIcon} />
      
      <Text style={styles.comment}>{review.comment}</Text>
      
      <View style={styles.ratingContainer}>
        {renderStars(review.rating)}
      </View>
      
      <View style={styles.clientContainer}>
        <Avatar 
          source={review.clientAvatar} 
          name={review.clientName} 
          size={40}
        />
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{review.clientName}</Text>
          <Text style={styles.clientCompany}>{review.clientCompany}</Text>
        </View>
        <Text style={styles.date}>{formatDate(review.date)}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
  },
  quoteIcon: {
    marginBottom: 12,
    opacity: 0.6,
  },
  comment: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 4,
  },
  clientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientInfo: {
    flex: 1,
    marginLeft: 12,
  },
  clientName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  clientCompany: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});