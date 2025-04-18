import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  BarChart2,
  Edit,
  Share,
  Globe,
  FileText
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useCampaignsStore } from '@/store/campaigns-store';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/currency';

export default function CampaignDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getCampaignById } = useCampaignsStore();
  const [campaign, setCampaign] = useState(getCampaignById(id as string));

  useEffect(() => {
    if (!campaign) {
      // If campaign not found, go back
      router.back();
    }
  }, [campaign]);

  if (!campaign) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-KZ', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatNumber = (num?: number) => {
    if (num === undefined) return 'N/A';
    return new Intl.NumberFormat('ru-KZ', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num);
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

  return (
    <>
      <Stack.Screen 
        options={{
          title: campaign.title,
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.headerButton}>
                <Share size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Edit size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Badge 
                label={campaign.status.toUpperCase()} 
                variant={getStatusVariant(campaign.status)}
                size="medium"
              />
              <Badge 
                label={campaign.type.toUpperCase()} 
                variant="info"
                size="medium"
              />
            </View>
            
            <Text style={styles.description}>{campaign.description}</Text>
          </View>
          
          {(campaign.reach || campaign.engagement || campaign.conversion) && (
            <Card style={styles.statsCard}>
              <Text style={styles.cardTitle}>Эффективность</Text>
              <View style={styles.statsContainer}>
                {campaign.reach && (
                  <View style={styles.statItem}>
                    <View style={styles.statIconContainer}>
                      <Globe size={20} color={colors.secondary} />
                    </View>
                    <Text style={styles.statValue}>{formatNumber(campaign.reach)}</Text>
                    <Text style={styles.statLabel}>Охват</Text>
                  </View>
                )}
                
                {campaign.engagement && (
                  <View style={styles.statItem}>
                    <View style={styles.statIconContainer}>
                      <BarChart2 size={20} color={colors.secondary} />
                    </View>
                    <Text style={styles.statValue}>{formatNumber(campaign.engagement)}</Text>
                    <Text style={styles.statLabel}>Вовлеченность</Text>
                  </View>
                )}
                
                {campaign.conversion && (
                  <View style={styles.statItem}>
                    <View style={styles.statIconContainer}>
                      <Users size={20} color={colors.secondary} />
                    </View>
                    <Text style={styles.statValue}>{formatNumber(campaign.conversion)}</Text>
                    <Text style={styles.statLabel}>Конверсия</Text>
                  </View>
                )}
              </View>
            </Card>
          )}
          
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Calendar size={20} color={colors.secondary} />
                </View>
                <View>
                  <Text style={styles.infoLabel}>Дата начала</Text>
                  <Text style={styles.infoValue}>{formatDate(campaign.startDate)}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Calendar size={20} color={colors.secondary} />
                </View>
                <View>
                  <Text style={styles.infoLabel}>Дата окончания</Text>
                  <Text style={styles.infoValue}>{formatDate(campaign.endDate)}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <DollarSign size={20} color={colors.secondary} />
                </View>
                <View>
                  <Text style={styles.infoLabel}>Бюджет</Text>
                  <Text style={styles.infoValue}>{formatCurrency(campaign.budget)}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Users size={20} color={colors.secondary} />
                </View>
                <View>
                  <Text style={styles.infoLabel}>Клиент</Text>
                  <Text style={styles.infoValue}>{campaign.clientName}</Text>
                </View>
              </View>
            </View>
          </Card>
          
          <Card style={styles.platformsCard}>
            <Text style={styles.cardTitle}>Платформы</Text>
            <View style={styles.platformsContainer}>
              {campaign.platforms.map((platform, index) => (
                <Badge 
                  key={index} 
                  label={platform} 
                  variant="default" 
                  size="medium"
                  style={styles.platformBadge}
                />
              ))}
            </View>
          </Card>
          
          <Card style={styles.assetsCard}>
            <Text style={styles.cardTitle}>Материалы</Text>
            <View style={styles.assetsContainer}>
              {campaign.assets.map((asset, index) => (
                <View key={index} style={styles.assetItem}>
                  <FileText size={20} color={colors.textSecondary} />
                  <Text style={styles.assetName}>{asset}</Text>
                </View>
              ))}
            </View>
          </Card>
          
          <View style={styles.footer} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerButtons: {
    flexDirection: 'row',
    marginRight: 8,
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  header: {
    padding: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  platformsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  platformsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  platformBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  assetsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  assetsContainer: {
    gap: 12,
  },
  assetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  assetName: {
    fontSize: 14,
    color: colors.text,
  },
  footer: {
    height: 40,
  },
});