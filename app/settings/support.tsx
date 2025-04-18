import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  FileText, 
  ChevronRight,
  Search
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTranslations } from '@/hooks/use-translations';

// Mock FAQ items
const faqItems = [
  {
    id: '1',
    question: 'Как создать новый проект?',
    answer: 'Чтобы создать новый проект, перейдите во вкладку "Проекты" и нажмите на кнопку "+" в правом верхнем углу. Заполните детали проекта и нажмите "Создать".'
  },
  {
    id: '2',
    question: 'Как пригласить участников в проект?',
    answer: 'Откройте детали проекта, нажмите на "Участники команды", а затем на "Добавить участника". Вы можете найти пользователей по email или имени.'
  },
  {
    id: '3',
    question: 'Как экспортировать отчеты?',
    answer: 'На экране деталей проекта нажмите на "Отчеты", а затем "Экспорт". Вы можете выбрать между форматами PDF, CSV или Excel.'
  },
  {
    id: '4',
    question: 'Какие методы оплаты вы принимаете?',
    answer: 'Мы принимаем все основные кредитные карты (Visa, Mastercard, American Express), а также PayPal и банковские переводы для корпоративных клиентов.'
  },
  {
    id: '5',
    question: 'Как отменить подписку?',
    answer: 'Перейдите в Настройки > Платежи и биллинг > Управление подпиской и нажмите "Отменить подписку". Обратите внимание, что отмена вступает в силу в конце текущего расчетного периода.'
  },
];

export default function SupportScreen() {
  const { t } = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredFaqs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id: string) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage('');
      // Show success message
    }, 1500);
  };

  return (
    <>
      <Stack.Screen options={{ title: t('support.title') }} />
      <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.contactCard}>
            <Text style={styles.cardTitle}>{t('support.contactUs')}</Text>
            <View style={styles.contactMethods}>
              <TouchableOpacity style={styles.contactMethod}>
                <View style={styles.contactIconContainer}>
                  <MessageSquare size={24} color={colors.secondary} />
                </View>
                <Text style={styles.contactMethodText}>{t('support.liveChat')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.contactMethod}>
                <View style={styles.contactIconContainer}>
                  <Phone size={24} color={colors.secondary} />
                </View>
                <Text style={styles.contactMethodText}>{t('support.callUs')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.contactMethod}>
                <View style={styles.contactIconContainer}>
                  <Mail size={24} color={colors.secondary} />
                </View>
                <Text style={styles.contactMethodText}>{t('support.email')}</Text>
              </TouchableOpacity>
            </View>
          </Card>

          <Text style={styles.sectionTitle}>{t('support.faq')}</Text>
          
          <Input
            placeholder={t('support.searchFaq')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Search size={20} color={colors.textSecondary} />}
            containerStyle={styles.searchInput}
          />
          
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(item => (
              <Card key={item.id} style={styles.faqCard}>
                <TouchableOpacity 
                  style={styles.faqQuestion}
                  onPress={() => toggleFaq(item.id)}
                >
                  <Text style={styles.faqQuestionText}>{item.question}</Text>
                  <ChevronRight 
                    size={20} 
                    color={colors.textSecondary} 
                    style={[
                      styles.faqIcon,
                      expandedFaq === item.id && styles.faqIconExpanded
                    ]} 
                  />
                </TouchableOpacity>
                
                {expandedFaq === item.id && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{item.answer}</Text>
                  </View>
                )}
              </Card>
            ))
          ) : (
            <Text style={styles.noResultsText}>{t('support.noFaqResults')}</Text>
          )}

          <Card style={styles.messageCard}>
            <Text style={styles.cardTitle}>{t('support.sendMessage')}</Text>
            <Input
              placeholder={t('support.messagePlaceholder')}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              containerStyle={styles.messageInput}
            />
            <Button
              title={t('support.sendButton')}
              onPress={handleSendMessage}
              isLoading={isLoading}
              disabled={!message.trim()}
            />
          </Card>

          <TouchableOpacity style={styles.documentationLink}>
            <FileText size={20} color={colors.secondary} />
            <Text style={styles.documentationText}>{t('support.viewDocumentation')}</Text>
          </TouchableOpacity>
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
  contactCard: {
    marginBottom: 20,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  contactMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactMethod: {
    alignItems: 'center',
    width: '30%',
  },
  contactIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactMethodText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  searchInput: {
    marginBottom: 16,
  },
  faqCard: {
    marginBottom: 8,
    padding: 0,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    flex: 1,
  },
  faqIcon: {
    transform: [{ rotate: '0deg' }],
  },
  faqIconExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  faqAnswerText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  noResultsText: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginVertical: 20,
  },
  messageCard: {
    marginTop: 20,
    marginBottom: 16,
    padding: 16,
  },
  messageInput: {
    marginBottom: 16,
  },
  documentationLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 8,
  },
  documentationText: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '500',
  },
});