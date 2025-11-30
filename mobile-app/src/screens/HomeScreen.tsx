import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RootStackParamList, ContentSource } from '../types';
import SourceCard from '../components/SourceCard';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

const contentSources: ContentSource[] = [
  {
    id: 'email',
    name: 'Email',
    icon: 'email',
    iconFamily: 'MaterialIcons',
    color: '#4285F4',
    unreadCount: 12,
    description: 'Check your inbox',
  },
  {
    id: 'news',
    name: 'News',
    icon: 'newspaper',
    iconFamily: 'MaterialCommunityIcons',
    color: '#FF6B6B',
    unreadCount: 5,
    description: 'Latest headlines',
  },
  {
    id: 'substack',
    name: 'Substack',
    icon: 'book-open-variant',
    iconFamily: 'MaterialCommunityIcons',
    color: '#FF6719',
    unreadCount: 3,
    description: 'Newsletter articles',
  },
  {
    id: 'rss',
    name: 'RSS Feeds',
    icon: 'rss',
    iconFamily: 'MaterialCommunityIcons',
    color: '#FFA500',
    unreadCount: 23,
    description: 'Blog updates',
  },
  {
    id: 'podcasts',
    name: 'Podcasts',
    icon: 'podcast',
    iconFamily: 'MaterialIcons',
    color: '#9B59B6',
    unreadCount: 8,
    description: 'New episodes',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'youtube',
    iconFamily: 'FontAwesome',
    color: '#FF0000',
    unreadCount: 15,
    description: 'Video subscriptions',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    icon: 'reddit',
    iconFamily: 'FontAwesome',
    color: '#FF4500',
    unreadCount: 7,
    description: 'Saved posts',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'twitter',
    iconFamily: 'FontAwesome',
    color: '#1DA1F2',
    unreadCount: 20,
    description: 'Timeline & bookmarks',
  },
  {
    id: 'pocket',
    name: 'Pocket',
    icon: 'get-pocket',
    iconFamily: 'FontAwesome',
    color: '#EF3F56',
    unreadCount: 42,
    description: 'Reading list',
  },
  {
    id: 'medium',
    name: 'Medium',
    icon: 'medium',
    iconFamily: 'FontAwesome',
    color: '#00AB6C',
    description: 'Articles to read',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleSourcePress = (source: ContentSource) => {
    navigation.navigate('ContentList', {
      sourceId: source.id,
      sourceName: source.name,
    });
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const totalUnread = contentSources.reduce(
    (sum, source) => sum + (source.unreadCount || 0),
    0
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.subtitle}>
            You have {totalUnread} unread items
          </Text>
        </View>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Ionicons name="settings-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        {contentSources.map((source) => (
          <SourceCard
            key={source.id}
            source={source}
            onPress={handleSourcePress}
            width={CARD_WIDTH}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#1a1a2e',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0b0',
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
});

export default HomeScreen;
