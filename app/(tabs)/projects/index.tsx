import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Filter } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useProjectsStore } from '@/store/projects-store';
import { ProjectCard } from '@/components/ProjectCard';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

type FilterStatus = 'all' | 'in_progress' | 'planning' | 'review' | 'completed' | 'on_hold';

export default function ProjectsScreen() {
  const router = useRouter();
  const { projects, fetchProjects } = useProjectsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const renderStatusFilter = (status: FilterStatus, label: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        statusFilter === status && styles.activeFilterButton
      ]}
      onPress={() => setStatusFilter(status)}
    >
      <Text
        style={[
          styles.filterButtonText,
          statusFilter === status && styles.activeFilterButtonText
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Поиск проектов"
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={20} color={colors.textSecondary} />}
          containerStyle={styles.searchInput}
        />
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
          {renderStatusFilter('all', 'All')}
          {renderStatusFilter('in_progress', 'In Progress')}
          {renderStatusFilter('planning', 'Planning')}
          {renderStatusFilter('review', 'Review')}
          {renderStatusFilter('completed', 'Completed')}
          {renderStatusFilter('on_hold', 'On Hold')}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProjects}
        renderItem={({ item }) => (
          <ProjectCard 
            project={item} 
            onPress={() => router.push(`/projects/${item.id}`)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Проекты не найдены</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchInput: {
    marginBottom: 8,
  },
  filtersContainer: {
    paddingVertical: 8,
  },
  filtersScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  activeFilterButton: {
    backgroundColor: colors.secondary,
  },
  filterButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  activeFilterButtonText: {
    color: colors.background,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});