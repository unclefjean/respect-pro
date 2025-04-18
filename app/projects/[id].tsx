import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  Tag, 
  AlertTriangle,
  Edit,
  Share
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useProjectsStore } from '@/store/projects-store';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { mockUsers } from '@/mocks/users';
import { formatCurrency } from '@/utils/currency';

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getProjectById } = useProjectsStore();
  const [project, setProject] = useState(getProjectById(id as string));

  useEffect(() => {
    if (!project) {
      // If project not found, go back
      router.back();
    }
  }, [project]);

  if (!project) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-KZ', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getStatusVariant = (status: string): 'default' | 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'info';
      case 'planning': return 'default';
      case 'review': return 'warning';
      case 'on_hold': return 'error';
      default: return 'default';
    }
  };

  const getPriorityVariant = (priority: string): 'default' | 'success' | 'warning' | 'error' | 'info' => {
    switch (priority) {
      case 'low': return 'success';
      case 'medium': return 'info';
      case 'high': return 'warning';
      case 'urgent': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string): string => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const assignedUsers = mockUsers.filter(user => project.assignedTo.includes(user.id));

  return (
    <>
      <Stack.Screen 
        options={{
          title: project.title,
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
                label={getStatusLabel(project.status)} 
                variant={getStatusVariant(project.status)}
                size="medium"
              />
              <Badge 
                label={project.priority.toUpperCase()} 
                variant={getPriorityVariant(project.priority)}
                size="medium"
              />
            </View>
            
            <Text style={styles.description}>{project.description}</Text>
          </View>
          
          <Card style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Прогресс</Text>
              <Text style={styles.progressPercent}>{project.progress}%</Text>
            </View>
            <ProgressBar progress={project.progress} height={10} />
          </Card>
          
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Calendar size={20} color={colors.secondary} />
                </View>
                <View>
                  <Text style={styles.infoLabel}>Дата начала</Text>
                  <Text style={styles.infoValue}>{formatDate(project.startDate)}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Clock size={20} color={colors.secondary} />
                </View>
                <View>
                  <Text style={styles.infoLabel}>Срок</Text>
                  <Text style={styles.infoValue}>{formatDate(project.deadline)}</Text>
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
                  <Text style={styles.infoValue}>
                    {project.budget ? formatCurrency(project.budget) : 'Не указан'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Users size={20} color={colors.secondary} />
                </View>
                <View>
                  <Text style={styles.infoLabel}>Клиент</Text>
                  <Text style={styles.infoValue}>{project.clientName}</Text>
                </View>
              </View>
            </View>
          </Card>
          
          <Card style={styles.teamCard}>
            <Text style={styles.cardTitle}>Команда проекта</Text>
            <View style={styles.teamList}>
              {assignedUsers.map(user => (
                <View key={user.id} style={styles.teamMember}>
                  <Avatar source={user.avatar} name={user.name} size={40} />
                  <View style={styles.teamMemberInfo}>
                    <Text style={styles.teamMemberName}>{user.name}</Text>
                    <Text style={styles.teamMemberRole}>{user.position}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
          
          <Card style={styles.tagsCard}>
            <Text style={styles.cardTitle}>Теги</Text>
            <View style={styles.tagsContainer}>
              {project.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  label={tag} 
                  variant="default" 
                  size="medium"
                  style={styles.tag}
                />
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
  progressCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
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
  teamCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  teamList: {
    gap: 12,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamMemberInfo: {
    marginLeft: 12,
  },
  teamMemberName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  teamMemberRole: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  tagsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  footer: {
    height: 40,
  },
});