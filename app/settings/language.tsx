import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Check, Globe } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useLanguageStore } from '@/store/language-store';
import { languageNames } from '@/translations';
import { LanguageCode } from '@/types/language';
import { useTranslations } from '@/hooks/use-translations';

export default function LanguageScreen() {
  const { t } = useTranslations();
  const { currentLanguage, setLanguage } = useLanguageStore();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(currentLanguage);
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageSelect = (langId: LanguageCode) => {
    setSelectedLanguage(langId);
  };

  const handleSave = () => {
    setIsLoading(true);
    // Apply the language change
    setLanguage(selectedLanguage);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
    }, 1000);
  };

  return (
    <>
      <Stack.Screen options={{ title: t('language.title') }} />
      <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.infoCard}>
            <View style={styles.infoCardContent}>
              <Globe size={24} color={colors.secondary} />
              <Text style={styles.infoText}>
                {t('language.selectLanguage')}
              </Text>
            </View>
          </Card>

          <Text style={styles.sectionTitle}>{t('language.availableLanguages')}</Text>
          
          {Object.entries(languageNames).map(([code, language]) => (
            <TouchableOpacity
              key={code}
              style={[
                styles.languageItem,
                selectedLanguage === code && styles.selectedLanguageItem
              ]}
              onPress={() => handleLanguageSelect(code as LanguageCode)}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>{language.name}</Text>
                <Text style={styles.languageNativeName}>{language.nativeName}</Text>
              </View>
              {selectedLanguage === code && (
                <Check size={20} color={colors.secondary} />
              )}
            </TouchableOpacity>
          ))}

          <View style={styles.buttonContainer}>
            <Button
              title={t('Сохранить изменения')}
              onPress={handleSave}
              isLoading={isLoading}
              style={styles.saveButton}
            />
          </View>

          <Card style={styles.translationCard}>
            <Text style={styles.translationTitle}>{t('language.helpTranslate')}</Text>
            <Text style={styles.translationText}>
              {t('language.helpTranslateDesc')}
            </Text>
            <Button
              title={t('language.contactSupport')}
              variant="outline"
              style={styles.contactButton}
            />
          </Card>
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
  infoCard: {
    marginBottom: 20,
    padding: 16,
  },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: colors.surface,
  },
  selectedLanguageItem: {
    backgroundColor: 'rgba(91, 192, 190, 0.15)',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  languageNativeName: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  buttonContainer: {
    marginVertical: 24,
  },
  saveButton: {
    marginBottom: 8,
  },
  translationCard: {
    marginBottom: 20,
    padding: 16,
  },
  translationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  translationText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  contactButton: {
    alignSelf: 'flex-start',
  },
});