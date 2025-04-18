import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Lock, Fingerprint, Shield, AlertTriangle, Smartphone } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SecurityScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      // Show success message
    }, 1500);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Безопасность' }} />
      <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Сменить пароль</Text>
            <Input
              label="Введите текущий пароль"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              leftIcon={<Lock size={20} color={colors.textSecondary} />}
              containerStyle={styles.inputContainer}
            />
            <Input
              label="Введите новый пароль"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              leftIcon={<Lock size={20} color={colors.textSecondary} />}
              containerStyle={styles.inputContainer}
            />
            <Input
              label="Подтвердите новый пароль"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              leftIcon={<Lock size={20} color={colors.textSecondary} />}
              containerStyle={styles.inputContainer}
            />
            <Button
              title="Поменять пароль"
              onPress={handleChangePassword}
              isLoading={isLoading}
              style={styles.button}
            />
          </Card>

          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Двухфакторная аутентификация</Text>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <Smartphone size={20} color={colors.secondary} />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>SMS Аутентификация</Text>
                  <Text style={styles.settingDescription}>
                    Получить код подтверждения по SMS при входе
                  </Text>
                </View>
              </View>
              <Switch
                trackColor={{ false: colors.surface, true: colors.secondary }}
                thumbColor={colors.text}
                value={twoFactorEnabled}
                onValueChange={setTwoFactorEnabled}
              />
            </View>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <Fingerprint size={20} color={colors.secondary} />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>
                    Биометрическая аутентификация
                  </Text>
                  <Text style={styles.settingDescription}>
                    Используйте отпечаток пальца или распознавание лица для входа
                  </Text>
                </View>
              </View>
              <Switch
                trackColor={{ false: colors.surface, true: colors.secondary }}
                thumbColor={colors.text}
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
              />
            </View>
          </Card>

          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Настройки сессии</Text>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <Shield size={20} color={colors.secondary} />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Автоматический выход</Text>
                  <Text style={styles.settingDescription}>
                    Автоматически выйти из системы после 30 минут бездействия
                  </Text>
                </View>
              </View>
              <Switch
                trackColor={{ false: colors.surface, true: colors.secondary }}
                thumbColor={colors.text}
                value={sessionTimeout}
                onValueChange={setSessionTimeout}
              />
            </View>
          </Card>

          <Card style={[styles.card, styles.alertCard]}>
            <View style={styles.alertHeader}>
              <AlertTriangle size={24} color={colors.error} />
              <Text style={styles.alertTitle}>Сообщение о безопасности</Text>
            </View>
            <Text style={styles.alertText}>
              Ваш аккаунт был доступен с нового устройства в г. Алматы 12 апреля 2025 года.
              Если это не были не вы, пожалуйста, измените свой пароль немедленно.
            </Text>
            <Button
              title="Просмотр активности"
              variant="outline"
              style={styles.alertButton}
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
  card: {
    marginBottom: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  settingDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  alertCard: {
    backgroundColor: 'rgba(239, 71, 111, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.error,
    marginLeft: 12,
  },
  alertText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 16,
    lineHeight: 20,
  },
  alertButton: {
    borderColor: colors.error,
  },
});