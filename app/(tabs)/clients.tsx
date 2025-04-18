import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Phone, Mail, Building } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { mockUsers } from '@/mocks/users';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

export default function ClientsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const clients = mockUsers.filter(user => user.role === 'Клиент');
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderClientCard = ({ item }) => (
    <Card style={styles.clientCard}>
      <View style={styles.clientHeader}>
        <Avatar source={item.avatar} name={item.name} size={50} />
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{item.name}</Text>
          <Text style={styles.clientCompany}>{item.company}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.contactInfo}>
        <View style={styles.contactItem}>
          <Mail size={16} color={colors.textSecondary} />
          <Text style={styles.contactText}>{item.email}</Text>
        </View>
        
        {item.phone && (
          <View style={styles.contactItem}>
            <Phone size={16} color={colors.textSecondary} />
            <Text style={styles.contactText}>{item.phone}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Посмотреть проекты</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Контакты</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Поиск клиентов..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={20} color={colors.textSecondary} />}
          containerStyle={styles.searchInput}
        />
      </View>
      
      <FlatList
        data={filteredClients}
        renderItem={renderClientCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Клиенты не найдены</Text>
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
  listContent: {
    padding: 16,
    gap: 12,
  },
  clientCard: {
    padding: 16,
  },
  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientInfo: {
    marginLeft: 16,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  clientCompany: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginBottom: 16,
  },
  contactInfo: {
    marginBottom: 16,
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: colors.text,
    fontWeight: '500',
    fontSize: 14,
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