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

const SavedScreen: React.FC = () => {
  const [savedItems, setSavedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadSavedItems = async () => {
    try {
      const items = await api.getSavedItems();
      setSavedItems(items);
    } catch (error) {
      console.error('Error loading saved items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedItems();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadSavedItems();
    setRefreshing(false);
  }, []);

  const handleMarkRead = async (itemId: string) => {
    try {
      await api.markAsRead(itemId);
      setSavedItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, isRead: true } : item
        )
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleToggleSave = async (itemId: string) => {
    try {
      await api.unsaveItem(itemId);
      // Remove from saved items list
      setSavedItems(prev => prev.filter(i => i.id !== itemId));
    } catch (error) {
      console.error('Error unsaving item:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading saved items...</Text>
      </View>
    );
  }

  if (savedItems.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No saved items</Text>
        <Text style={styles.emptySubtext}>Save items from your feed to read later</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedItems}
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
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  listContent: {
    paddingVertical: 8,
  },
});

export default SavedScreen;
