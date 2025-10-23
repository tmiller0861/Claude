import React, { useState } from 'react';
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
  const [rssFeedUrl, setRssFeedUrl] = useState('');
  const [podcastFeedUrl, setPodcastFeedUrl] = useState('');

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

  const handleConnectGoogle = async () => {
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
    } catch (error) {
      console.error('Error getting auth URL:', error);
      Alert.alert('Error', 'Failed to start authentication');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.button} onPress={handleConnectGoogle}>
          <Text style={styles.buttonText}>Connect Gmail & YouTube</Text>
        </TouchableOpacity>
        <Text style={styles.helpText}>
          Connect your Google account to sync emails and YouTube subscriptions
        </Text>
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
          A unified feed for all your content sources
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  helpText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});

export default SettingsScreen;
