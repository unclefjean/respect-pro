import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, Users } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Project } from '@/types/project';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { ProgressBar } from './ui/ProgressBar';
import { useTranslations } from '@/hooks/use-translations';
import { formatCurrency } from '@/utils/currency';

interface ProjectCardProps {
  project: Project;
  onPress?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onPress }) => {
  const { t } = useTranslations();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-KZ', { month: 'short', day: 'numeric', year: 'numeric' });
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

  const getPriorityLabel = (priority: string): string => {
    return t(`projects.priority.${priority}`);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{project.title}</Text>
          <Badge 
            label={getStatusLabel(project.status)} 
            variant={getStatusVariant(project.status)}
          />
        </View>
        
        <Text style={styles.description} numberOfLines={2}>{project.description}</Text>
        
        <View style={styles.progressContainer}>
          <ProgressBar progress={project.progress} />
          <Text style={styles.progressText}>{project.progress}%</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Calendar size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>{formatDate(project.deadline)}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Users size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>{project.assignedTo.length} {t('projects.teamMembers')}</Text>
          </View>
          
          <Badge 
            label={getPriorityLabel(project.priority)} 
            variant={getPriorityVariant(project.priority)}
            size="small"
          />
        </View>
        
        <View style={styles.tagsContainer}>
          {project.tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              label={tag} 
              variant="default" 
              size="small"
              style={styles.tag}
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    minWidth: 36,
    textAlign: 'right',
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});