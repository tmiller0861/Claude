import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';
import api from '../services/api';

const SettingsScreen: React.FC = () => {
  const [googleClientId, setGoogleClientId] = useState('');
  const [googleClientSecret, setGoogleClientSecret] = useState('');
  const [rssFeedUrl, setRssFeedUrl] = useState('');
  const [podcastFeedUrl, setPodcastFeedUrl] = useState('');
  const [hasGoogleCreds, setHasGoogleCreds] = useState(false);

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    const user = await api.getUser();
    if (user) {
      setHasGoogleCreds(!!(user.googleClientId && user.googleClientSecret));
    }
  };

  const handleSaveGoogleCreds = async () => {
    if (!googleClientId.trim() || !googleClientSecret.trim()) {
      Alert.alert('Error', 'Please enter both Client ID and Client Secret');
      return;
    }

    try {
      await api.saveGoogleCredentials(googleClientId, googleClientSecret);
      Alert.alert('Success', 'Google OAuth credentials saved! You can now connect your Google account.');
      setGoogleClientId('');
      setGoogleClientSecret('');
      setHasGoogleCreds(true);
    } catch (error) {
      console.error('Error saving Google credentials:', error);
      Alert.alert('Error', 'Failed to save Google credentials');
    }
  };

  const handleConnectGoogle = async () => {
    if (!hasGoogleCreds) {
      Alert.alert(
        'Setup Required',
        'Please enter your Google OAuth credentials first in the section above.'
      );
      return;
    }

    try {
      const authUrl = await api.getAuthUrl();
      Alert.alert(
        'Connect Google Account',
        'You will be redirected to Google to authorize access to Gmail and YouTube.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Continue', onPress: () => Linking.openURL(authUrl) },
        ]
      );
    } catch (error: any) {
      console.error('Error getting auth URL:', error);
      Alert.alert('Error', error.response?.data?.error || 'Failed to start authentication');
    }
  };

  const handleAddRssFeed = async () => {
    if (!rssFeedUrl.trim()) {
      Alert.alert('Error', 'Please enter a valid RSS feed URL');
      return;
    }

    try {
      await api.addRssFeed(rssFeedUrl);
      Alert.alert('Success', 'RSS feed added successfully');
      setRssFeedUrl('');
    } catch (error) {
      console.error('Error adding RSS feed:', error);
      Alert.alert('Error', 'Failed to add RSS feed');
    }
  };

  const handleAddPodcastFeed = async () => {
    if (!podcastFeedUrl.trim()) {
      Alert.alert('Error', 'Please enter a valid podcast feed URL');
      return;
    }

    try {
      await api.addPodcastFeed(podcastFeedUrl);
      Alert.alert('Success', 'Podcast feed added successfully');
      setPodcastFeedUrl('');
    } catch (error) {
      console.error('Error adding podcast feed:', error);
      Alert.alert('Error', 'Failed to add podcast feed');
    }
  };

  const openGoogleCloudConsole = () => {
    Linking.openURL('https://console.cloud.google.com/apis/credentials');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Google OAuth Setup</Text>
        <Text style={styles.helpText}>
          To connect Gmail and YouTube, you need to create OAuth credentials from Google Cloud Console:
        </Text>

        <TouchableOpacity style={styles.linkButton} onPress={openGoogleCloudConsole}>
          <Text style={styles.linkButtonText}>Open Google Cloud Console</Text>
        </TouchableOpacity>

        <Text style={styles.setupSteps}>
          {'\n'}1. Create a new project (or select existing)
          {'\n'}2. Enable Gmail API and YouTube Data API v3
          {'\n'}3. Create OAuth 2.0 credentials (Web application)
          {'\n'}4. Add redirect URI: http://localhost:3000/api/auth/callback
          {'\n'}5. Copy the Client ID and Client Secret below:
        </Text>

        <Text style={styles.label}>Google Client ID</Text>
        <TextInput
          style={styles.input}
          value={googleClientId}
          onChangeText={setGoogleClientId}
          placeholder="Enter your Google Client ID"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Google Client Secret</Text>
        <TextInput
          style={styles.input}
          value={googleClientSecret}
          onChangeText={setGoogleClientSecret}
          placeholder="Enter your Google Client Secret"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveGoogleCreds}>
          <Text style={styles.buttonText}>Save Google Credentials</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connect Google Services</Text>
        <TouchableOpacity
          style={[styles.button, !hasGoogleCreds && styles.buttonDisabled]}
          onPress={handleConnectGoogle}
        >
          <Text style={styles.buttonText}>
            {hasGoogleCreds ? 'Connect Gmail & YouTube' : 'Setup OAuth First'}
          </Text>
        </TouchableOpacity>
        {hasGoogleCreds && (
          <Text style={styles.helpText}>
            Connect your Google account to sync emails and YouTube subscriptions
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RSS Feeds</Text>
        <Text style={styles.label}>Add RSS Feed URL</Text>
        <TextInput
          style={styles.input}
          value={rssFeedUrl}
          onChangeText={setRssFeedUrl}
          placeholder="https://example.com/feed.xml"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddRssFeed}>
          <Text style={styles.buttonText}>Add RSS Feed</Text>
        </TouchableOpacity>
        <Text style={styles.helpText}>
          Add any RSS feed including Substack newsletters
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Podcasts</Text>
        <Text style={styles.label}>Add Podcast RSS Feed</Text>
        <TextInput
          style={styles.input}
          value={podcastFeedUrl}
          onChangeText={setPodcastFeedUrl}
          placeholder="https://example.com/podcast.rss"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddPodcastFeed}>
          <Text style={styles.buttonText}>Add Podcast Feed</Text>
        </TouchableOpacity>
        <Text style={styles.helpText}>
          Get podcast RSS feed URLs from Apple Podcasts or your podcast app
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Content Dashboard v1.0{'\n'}
          A unified feed for all your content sources{'\n\n'}

          No setup files required - just add your credentials above and start using the app!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    backgroundColor: '#34C759',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  helpText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  setupSteps: {
    fontSize: 13,
    color: '#333',
    lineHeight: 22,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});

export default SettingsScreen;
