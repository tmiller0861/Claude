import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RootStackParamList, ContentItem } from '../types';

type ContentListScreenRouteProp = RouteProp<RootStackParamList, 'ContentList'>;
type ContentListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContentList'
>;

// Mock data - in a real app, this would come from an API based on sourceId
const generateMockContent = (sourceId: string): ContentItem[] => {
  const contentTypes: Record<string, Partial<ContentItem>[]> = {
    email: [
      {
        title: 'Weekly Newsletter - AI Advances',
        source: 'Tech Weekly',
        excerpt: 'Latest developments in artificial intelligence and machine learning...',
        publishedDate: new Date('2025-11-29'),
      },
      {
        title: 'Meeting Reminder: Team Sync',
        source: 'Calendar',
        excerpt: 'Don\'t forget about tomorrow\'s team meeting at 10 AM...',
        publishedDate: new Date('2025-11-30'),
      },
    ],
    news: [
      {
        title: 'Breaking: Major Tech Announcement',
        source: 'TechCrunch',
        excerpt: 'A leading technology company unveiled their latest innovation...',
        publishedDate: new Date('2025-11-30'),
      },
      {
        title: 'Economic Outlook 2026',
        source: 'Financial Times',
        excerpt: 'Experts predict continued growth in the technology sector...',
        publishedDate: new Date('2025-11-29'),
      },
    ],
    youtube: [
      {
        title: 'How to Build a Mobile App in 2025',
        source: 'Code Academy',
        excerpt: 'Complete tutorial on modern mobile development practices',
        publishedDate: new Date('2025-11-28'),
      },
      {
        title: 'The Future of AI Development',
        source: 'Tech Vision',
        excerpt: 'Exploring the latest trends in AI and machine learning',
        publishedDate: new Date('2025-11-27'),
      },
    ],
  };

  const defaultContent = [
    {
      title: 'Sample Content 1',
      source: 'Various Sources',
      excerpt: 'This is a sample content item for demonstration...',
      publishedDate: new Date(),
    },
    {
      title: 'Sample Content 2',
      source: 'Various Sources',
      excerpt: 'Another sample content item to show the layout...',
      publishedDate: new Date(),
    },
  ];

  const items = contentTypes[sourceId] || defaultContent;

  return items.map((item, index) => ({
    id: `${sourceId}-${index}`,
    title: item.title || 'Untitled',
    source: item.source || 'Unknown',
    url: item.url,
    excerpt: item.excerpt,
    thumbnail: item.thumbnail,
    publishedDate: item.publishedDate || new Date(),
    isRead: Math.random() > 0.5,
  }));
};

const ContentListScreen = () => {
  const route = useRoute<ContentListScreenRouteProp>();
  const navigation = useNavigation<ContentListScreenNavigationProp>();
  const { sourceId, sourceName } = route.params;

  const [contentItems] = useState<ContentItem[]>(generateMockContent(sourceId));

  const handleItemPress = (item: ContentItem) => {
    navigation.navigate('ContentDetail', { item });
  };

  const renderItem = ({ item }: { item: ContentItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={[styles.itemTitle, item.isRead && styles.readTitle]}>
            {item.title}
          </Text>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.itemSource}>{item.source}</Text>

        {item.excerpt && (
          <Text style={styles.itemExcerpt} numberOfLines={2}>
            {item.excerpt}
          </Text>
        )}

        <View style={styles.itemFooter}>
          <Text style={styles.itemDate}>
            {item.publishedDate?.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#a0a0b0" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contentItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={64} color="#a0a0b0" />
            <Text style={styles.emptyText}>No items yet</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  itemContent: {
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  readTitle: {
    color: '#a0a0b0',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4285F4',
    marginLeft: 8,
  },
  itemSource: {
    fontSize: 12,
    color: '#4285F4',
    marginBottom: 8,
  },
  itemExcerpt: {
    fontSize: 14,
    color: '#d0d0d0',
    marginBottom: 12,
    lineHeight: 20,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDate: {
    fontSize: 12,
    color: '#a0a0b0',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    color: '#a0a0b0',
    marginTop: 16,
  },
});

export default ContentListScreen;
