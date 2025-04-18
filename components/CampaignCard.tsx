import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, DollarSign, BarChart } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Campaign } from '@/types/campaign';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { formatCurrency } from '@/utils/currency';

interface CampaignCardProps {
  campaign: Campaign;
  onPress?: () => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-KZ', { month: 'short', day: 'numeric' });
  };

  const getStatusVariant = (status: string): 'default' | 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
      case 'active': return 'success';
      case 'scheduled': return 'info';
      case 'draft': return 'default';
      case 'paused': return 'warning';
      case 'completed': return 'error';
      default: return 'default';
    }
  };

  const formatNumber = (num?: number) => {
    if (num === undefined) return 'N/A';
    return new Intl.NumberFormat('ru-KZ', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{campaign.title}</Text>
          <Badge 
            label={campaign.status.toUpperCase()} 
            variant={getStatusVariant(campaign.status)}
          />
        </View>
        
        <Text style={styles.description} numberOfLines={2}>{campaign.description}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Calendar size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>
              {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <DollarSign size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>{formatCurrency(campaign.budget)}</Text>
          </View>
        </View>
        
        {(campaign.reach || campaign.engagement || campaign.conversion) && (
          <View style={styles.statsContainer}>
            {campaign.reach && (
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{formatNumber(campaign.reach)}</Text>
                <Text style={styles.statLabel}>Охват</Text>
              </View>
            )}
            
            {campaign.engagement && (
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{formatNumber(campaign.engagement)}</Text>
                <Text style={styles.statLabel}>Вовлеченность</Text>
              </View>
            )}
            
            {campaign.conversion && (
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{formatNumber(campaign.conversion)}</Text>
                <Text style={styles.statLabel}>Конверсия</Text>
              </View>
            )}
          </View>
        )}
        
        <View style={styles.tagsContainer}>
          <Badge 
            label={campaign.type.toUpperCase()} 
            variant="info" 
            size="small"
            style={styles.typeTag}
          />
          
          {campaign.platforms.slice(0, 3).map((platform, index) => (
            <Badge 
              key={index} 
              label={platform} 
              variant="default" 
              size="small"
              style={styles.platformTag}
            />
          ))}
        </View>
      </Card>
    </TouchableOpacity>
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
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  typeTag: {
    backgroundColor: colors.secondary,
  },
  platformTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});