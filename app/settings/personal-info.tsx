import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { User, Mail, Phone, Building, Save } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useTranslations } from '@/hooks/use-translations';

export default function PersonalInfoScreen() {
  const { user, updateProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslations();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    position: user?.position || '',
    company: user?.company || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfile(formData);
      // Show success message or handle success case
    } catch (error) {
      // Handle error
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: t('settings.personalInfo'),
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={handleSave}>
              <Save size={20} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.avatarSection}>
            <Avatar 
              source={user?.avatar} 
              name={user?.name || "User"} 
              size={100} 
            />
            <TouchableOpacity style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>{t('settings.changePhoto')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Input
              label={t('settings.fullName')}
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
              leftIcon={<User size={20} color={colors.textSecondary} />}
              containerStyle={styles.inputContainer}
            />
            
            <Input
              label={t('settings.emailAddress')}
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={colors.textSecondary} />}
              containerStyle={styles.inputContainer}
            />
            
            <Input
              label={t('settings.phoneNumber')}
              value={formData.phone}
              onChangeText={(value) => handleChange('phone', value)}
              keyboardType="phone-pad"
              leftIcon={<Phone size={20} color={colors.textSecondary} />}
              containerStyle={styles.inputContainer}
            />
            
            {user?.role === 'Сотрудник' && (
              <Input
                label={t('settings.position')}
                value={formData.position}
                onChangeText={(value) => handleChange('position', value)}
                leftIcon={<Building size={20} color={colors.textSecondary} />}
                containerStyle={styles.inputContainer}
              />
            )}
            
            {user?.role === 'Клиент' && (
              <Input
                label={t('settings.company')}
                value={formData.company}
                onChangeText={(value) => handleChange('company', value)}
                leftIcon={<Building size={20} color={colors.textSecondary} />}
                containerStyle={styles.inputContainer}
              />
            )}
          </View>

          <Button
            title={t('settings.saveChanges')}
            onPress={handleSave}
            isLoading={isLoading}
            style={styles.saveButton}
          />
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
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
  scrollContent: {
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  changePhotoButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changePhotoText: {
    color: colors.secondary,
    fontWeight: '500',
  },
  formSection: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  saveButton: {
    marginBottom: 40,
  },
});