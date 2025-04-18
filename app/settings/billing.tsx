import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { CreditCard, Plus, DollarSign, Calendar, CheckCircle, AlertCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/currency';

// Mock payment methods
const paymentMethods = [
  {
    id: '1',
    type: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
  },
  {
    id: '2',
    type: 'mastercard',
    last4: '5555',
    expMonth: 8,
    expYear: 2024,
    isDefault: false,
  }
];

// Mock invoices
const invoices = [
  {
    id: 'INV-001',
    date: '2023-10-15',
    amount: 3990, // 2500 USD * 450 KZT
    status: 'paid',
    description: 'Ежемесячная подписка - Март 2025',
  },
  {
    id: 'INV-002',
    date: '2023-09-15',
    amount: 3990, // 2500 USD * 450 KZT
    status: 'paid',
    description: 'Ежемесячная подписка - Февраль 2025',
  },
  {
    id: 'INV-003',
    date: '2023-08-15',
    amount: 3990, // 2500 USD * 450 KZT
    status: 'paid',
    description: 'Ежемесячная подписка - Январь 2025',
  },
];

export default function BillingScreen() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-KZ', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Оплата и платежи' }} />
      <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Текущий план</Text>
            <Card style={styles.planCard}>
              <View style={styles.planHeader}>
                <Text style={styles.planName}>Корпоративный план</Text>
                <Badge label="АКТИВЕН" variant="success" size="medium" />
              </View>
              <Text style={styles.planPrice}>{formatCurrency(3990)}/месяц</Text>
              <Text style={styles.planDescription}>
                Полный доступ ко всем функциям, неограниченное количество проектов, приоритетная поддержка
              </Text>
              <Button 
                title="Управление подпиской" 
                variant="outline" 
                style={styles.manageButton}
              />
            </Card>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Способы оплаты</Text>
            {paymentMethods.map(method => (
              <Card key={method.id} style={styles.paymentCard}>
                <View style={styles.paymentCardContent}>
                  <View style={styles.cardIconContainer}>
                    <CreditCard size={24} color={colors.secondary} />
                  </View>
                  <View style={styles.cardDetails}>
                    <Text style={styles.cardType}>
                      {method.type.charAt(0).toUpperCase() + method.type.slice(1)} •••• {method.last4}
                    </Text>
                    <Text style={styles.cardExpiry}>
                      Истекает {method.expMonth}/{method.expYear}
                    </Text>
                  </View>
                  {method.isDefault && (
                    <Badge label="ПО УМОЛЧАНИЮ" variant="info" size="small" />
                  )}
                </View>
              </Card>
            ))}
            <Button 
              title="Добавить способ оплаты" 
              variant="outline" 
              leftIcon={<Plus size={18} color={colors.primary} />}
              style={styles.addButton}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>История платежей</Text>
            {invoices.map(invoice => (
              <Card key={invoice.id} style={styles.invoiceCard}>
                <View style={styles.invoiceHeader}>
                  <Text style={styles.invoiceId}>{invoice.id}</Text>
                  <Badge 
                    label={invoice.status === 'paid' ? 'ОПЛАЧЕН' : 'ОЖИДАЕТ'} 
                    variant={invoice.status === 'paid' ? 'success' : 'warning'} 
                    size="small" 
                  />
                </View>
                <Text style={styles.invoiceDescription}>{invoice.description}</Text>
                <View style={styles.invoiceDetails}>
                  <View style={styles.invoiceDetail}>
                    <Calendar size={16} color={colors.textSecondary} />
                    <Text style={styles.invoiceDetailText}>{formatDate(invoice.date)}</Text>
                  </View>
                  <View style={styles.invoiceDetail}>
                    <DollarSign size={16} color={colors.textSecondary} />
                    <Text style={styles.invoiceDetailText}>{formatCurrency(invoice.amount)}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.downloadButton}>
                  <Text style={styles.downloadButtonText}>Скачать PDF</Text>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
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
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  planCard: {
    padding: 16,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  manageButton: {
    marginTop: 8,
  },
  paymentCard: {
    marginBottom: 12,
    padding: 16,
  },
  paymentCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardDetails: {
    flex: 1,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  cardExpiry: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  addButton: {
    marginTop: 8,
  },
  invoiceCard: {
    marginBottom: 12,
    padding: 16,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  invoiceId: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  invoiceDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  invoiceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  invoiceDetailText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  downloadButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  downloadButtonText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
});