import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BarChart2, Users, DollarSign, TrendingUp } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useProjectsStore } from '@/store/projects-store';
import { useCampaignsStore } from '@/store/campaigns-store';
import { useReviewsStore } from '@/store/reviews-store';
import { useAuthStore } from '@/store/auth-store';
import { ProjectCard } from '@/components/ProjectCard';
import { CampaignCard } from '@/components/CampaignCard';
import { ReviewCard } from '@/components/ReviewCard';
import { StatCard } from '@/components/StatCard';
import { useTranslations } from '@/hooks/use-translations';
import { formatCurrency } from '@/utils/currency';

export default function DashboardScreen() {
  const router = useRouter();
  const { projects, fetchProjects, getUpcomingDeadlines } = useProjectsStore();
  const { campaigns, fetchCampaigns, getActiveCampaigns } = useCampaignsStore();
  const { reviews, fetchReviews, getFeaturedReviews } = useReviewsStore();
  const { user } = useAuthStore();
  const { t } = useTranslations();

  useEffect(() => {
    fetchProjects();
    fetchCampaigns();
    fetchReviews();
  }, []);

  const upcomingDeadlines = getUpcomingDeadlines(14);
  const activeCampaigns = getActiveCampaigns();
  const featuredReviews = getFeaturedReviews();

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>{t('dashboard.greeting')}</Text>
          <Text style={styles.name}>{user?.name || t('common.guest')}</Text>
        </View>

        <Text style={styles.sectionTitle}>{t('dashboard.overview')}</Text>
        <View style={styles.statsContainer}>
          <StatCard
            title={t('dashboard.activeProjects')}
            value={projects.filter(p => p.status === 'in_progress').length}
            icon={<BarChart2 size={20} color={colors.secondary} />}
            change={{ value: 12, isPositive: true }}
            style={styles.statCard}
          />
          <StatCard
            title={t('dashboard.activeCampaigns')}
            value={activeCampaigns.length}
            icon={<TrendingUp size={20} color={colors.secondary} />}
            change={{ value: 9, isPositive: true }}
            style={styles.statCard}
          />
          <StatCard
            title={t('dashboard.totalClients')}
            value="63"
            icon={<Users size={20} color={colors.secondary} />}
            style={styles.statCard}
          />
          <StatCard
            title={t('dashboard.revenue')}
            value={formatCurrency(56430)} // 125,400 USD * 450 KZT
            icon={<DollarSign size={20} color={colors.secondary} />}
            change={{ value: 8, isPositive: true }}
            style={styles.statCard}
          />
        </View>

        <Text style={styles.sectionTitle}>{t('dashboard.upcomingDeadlines')}</Text>
        {upcomingDeadlines.length > 0 ? (
          <FlatList
            data={upcomingDeadlines}
            renderItem={({ item }) => (
              <ProjectCard 
                project={item} 
                onPress={() => router.push(`/projects/${item.id}`)}
              />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            style={styles.horizontalList}
          />
        ) : (
          <Text style={styles.emptyText}>{t('dashboard.noDeadlines')}</Text>
        )}

        <Text style={styles.sectionTitle}>{t('dashboard.activeCampaignsSection')}</Text>
        {activeCampaigns.length > 0 ? (
          <FlatList
            data={activeCampaigns}
            renderItem={({ item }) => (
              <CampaignCard 
                campaign={item} 
                onPress={() => router.push(`/campaigns/${item.id}`)}
              />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            style={styles.horizontalList}
          />
        ) : (
          <Text style={styles.emptyText}>{t('dashboard.noCampaigns')}</Text>
        )}

        <Text style={styles.sectionTitle}>{t('dashboard.clientTestimonials')}</Text>
        {featuredReviews.length > 0 ? (
          <FlatList
            data={featuredReviews}
            renderItem={({ item }) => <ReviewCard review={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            style={styles.horizontalList}
          />
        ) : (
          <Text style={styles.emptyText}>{t('dashboard.noTestimonials')}</Text>
        )}
        
        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  statCard: {
    width: '48%',
    marginBottom: 0,
  },
  horizontalList: {
    marginBottom: 8,
  },
  horizontalListContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  emptyText: {
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
  },
  footer: {
    height: 40,
  },
});