import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightElement?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  rightElement,
}) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={styles.settingIcon}>
      <Ionicons name={icon as any} size={24} color="#4285F4" />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {rightElement || (showArrow && onPress && (
      <Ionicons name="chevron-forward" size={20} color="#a0a0b0" />
    ))}
  </TouchableOpacity>
);

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingSection: React.FC<SettingSectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(true);
  const [autoRefresh, setAutoRefresh] = React.useState(true);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <SettingSection title="Content Sources">
          <SettingItem
            icon="mail-outline"
            title="Email Accounts"
            subtitle="Manage connected email accounts"
            onPress={() => console.log('Email accounts')}
          />
          <SettingItem
            icon="newspaper-outline"
            title="News Sources"
            subtitle="Configure news feeds and subscriptions"
            onPress={() => console.log('News sources')}
          />
          <SettingItem
            icon="logo-rss"
            title="RSS Feeds"
            subtitle="Add and manage RSS feeds"
            onPress={() => console.log('RSS feeds')}
          />
          <SettingItem
            icon="logo-youtube"
            title="YouTube"
            subtitle="Connect YouTube account"
            onPress={() => console.log('YouTube')}
          />
          <SettingItem
            icon="mic-outline"
            title="Podcasts"
            subtitle="Manage podcast subscriptions"
            onPress={() => console.log('Podcasts')}
          />
        </SettingSection>

        <SettingSection title="Preferences">
          <SettingItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="Get notified of new content"
            showArrow={false}
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#2a2a3e', true: '#4285F4' }}
                thumbColor="#fff"
              />
            }
          />
          <SettingItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Use dark theme"
            showArrow={false}
            rightElement={
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#2a2a3e', true: '#4285F4' }}
                thumbColor="#fff"
              />
            }
          />
          <SettingItem
            icon="refresh-outline"
            title="Auto Refresh"
            subtitle="Automatically check for new content"
            showArrow={false}
            rightElement={
              <Switch
                value={autoRefresh}
                onValueChange={setAutoRefresh}
                trackColor={{ false: '#2a2a3e', true: '#4285F4' }}
                thumbColor="#fff"
              />
            }
          />
          <SettingItem
            icon="time-outline"
            title="Refresh Interval"
            subtitle="Every 15 minutes"
            onPress={() => console.log('Refresh interval')}
          />
        </SettingSection>

        <SettingSection title="Data">
          <SettingItem
            icon="download-outline"
            title="Offline Reading"
            subtitle="Download content for offline access"
            onPress={() => console.log('Offline reading')}
          />
          <SettingItem
            icon="trash-outline"
            title="Clear Cache"
            subtitle="Free up storage space"
            onPress={() => console.log('Clear cache')}
          />
        </SettingSection>

        <SettingSection title="About">
          <SettingItem
            icon="information-circle-outline"
            title="App Version"
            subtitle="1.0.0"
            showArrow={false}
          />
          <SettingItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => console.log('Help')}
          />
          <SettingItem
            icon="document-text-outline"
            title="Privacy Policy"
            onPress={() => console.log('Privacy')}
          />
        </SettingSection>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a0a0b0',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionContent: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  settingIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#0f0f1e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#a0a0b0',
  },
});

export default SettingsScreen;
