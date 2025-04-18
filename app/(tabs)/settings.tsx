import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Moon,
  Globe,
  CreditCard
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/auth-store';
import { Avatar } from '@/components/ui/Avatar';
import { useTranslations } from '@/hooks/use-translations';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { t } = useTranslations();
  
  const renderSettingItem = (
    icon: React.ReactNode, 
    title: string, 
    rightElement?: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIconContainer}>{icon}</View>
      <Text style={styles.settingTitle}>{title}</Text>
      <View style={styles.settingRight}>
        {rightElement || <ChevronRight size={20} color={colors.textSecondary} />}
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView>
        <View style={styles.profileSection}>
          <Avatar 
            source={user?.avatar} 
            name={user?.name || "User"} 
            size={80} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || "User"}</Text>
            <Text style={styles.profileRole}>{user?.role || "Role"}</Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push('/settings/personal-info')}
          >
            <Text style={styles.editButtonText}>{t('settings.editProfile')}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.account')}</Text>
          {renderSettingItem(
            <User size={22} color={colors.secondary} />,
            t('settings.personalInfo'),
            undefined,
            () => router.push('/settings/personal-info')
          )}
          {renderSettingItem(
            <CreditCard size={22} color={colors.secondary} />,
            t('settings.billingPayments'),
            undefined,
            () => router.push('/settings/billing')
          )}
          {renderSettingItem(
            <Shield size={22} color={colors.secondary} />,
            t('settings.security'),
            undefined,
            () => router.push('/settings/security')
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.preferences')}</Text>
          {renderSettingItem(
            <Bell size={22} color={colors.secondary} />,
            t('settings.notifications'),
            <Switch 
              trackColor={{ false: colors.surface, true: colors.secondary }}
              thumbColor={colors.text}
              value={true}
            />
          )}
          {renderSettingItem(
            <Moon size={22} color={colors.secondary} />,
            t('settings.darkMode'),
            <Switch 
              trackColor={{ false: colors.surface, true: colors.secondary }}
              thumbColor={colors.text}
              value={true}
            />
          )}
          {renderSettingItem(
            <Globe size={22} color={colors.secondary} />,
            t('settings.language'),
            undefined,
            () => router.push('/settings/language')
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.support')}</Text>
          {renderSettingItem(
            <HelpCircle size={22} color={colors.secondary} />,
            t('settings.support'),
            undefined,
            () => router.push('/settings/support')
          )}
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>{t('settings.logout')}</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>{t('settings.version')} 14.10.2 Разработчик: Айтмухамедов Эльзат</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  profileRole: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  editButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 20,
  },
  editButtonText: {
    color: colors.text,
    fontWeight: '500',
  },
  section: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  settingRight: {
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    backgroundColor: 'rgba(239, 71, 111, 0.1)',
    borderRadius: 8,
  },
  logoutText: {
    color: colors.error,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 24,
  },
});