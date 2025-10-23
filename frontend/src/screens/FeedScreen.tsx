import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  ActivityIndicator,
} from 'react-native';
import FeedItemCard from '../components/FeedItemCard';
import { FeedItem } from '../types';
import api from '../services/api';

const FeedScreen: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFeed = async () => {
    try {
      const items = await api.getFeed();
      setFeedItems(items);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadFeed();
    setRefreshing(false);
  }, []);

  const handleMarkRead = async (itemId: string) => {
    try {
      await api.markAsRead(itemId);
      setFeedItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, isRead: true } : item
        )
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleToggleSave = async (itemId: string) => {
    const item = feedItems.find(i => i.id === itemId);
    if (!item) return;

    try {
      if (item.isSaved) {
        await api.unsaveItem(itemId);
      } else {
        await api.saveItem(itemId);
      }

      setFeedItems(prev =>
        prev.map(i =>
          i.id === itemId ? { ...i, isSaved: !i.isSaved } : i
        )
      );
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading your content...</Text>
      </View>
    );
  }

  if (feedItems.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No content available</Text>
        <Text style={styles.emptySubtext}>Pull down to refresh</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={feedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FeedItemCard
            item={item}
            onMarkRead={handleMarkRead}
            onToggleSave={handleToggleSave}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  listContent: {
    paddingVertical: 8,
  },
});

export default FeedScreen;
