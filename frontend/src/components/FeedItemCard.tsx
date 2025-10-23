import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { FeedItem } from '../types';

interface FeedItemCardProps {
  item: FeedItem;
  onMarkRead: (id: string) => void;
  onToggleSave: (id: string) => void;
}

const FeedItemCard: React.FC<FeedItemCardProps> = ({ item, onMarkRead, onToggleSave }) => {
  const formatDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return d.toLocaleDateString();
    }
  };

  const getSourceColor = (source: string): string => {
    switch (source) {
      case 'gmail':
        return '#EA4335';
      case 'youtube':
        return '#FF0000';
      case 'rss':
        return '#FF6600';
      case 'podcast':
        return '#8B5CF6';
      case 'hackernews':
        return '#FF6600';
      default:
        return '#666';
    }
  };

  const getSourceLabel = (source: string): string => {
    switch (source) {
      case 'gmail':
        return 'Email';
      case 'youtube':
        return 'YouTube';
      case 'rss':
        return 'RSS';
      case 'podcast':
        return 'Podcast';
      case 'hackernews':
        return 'HN';
      default:
        return source.toUpperCase();
    }
  };

  const handlePress = () => {
    if (!item.isRead) {
      onMarkRead(item.id);
    }
    Linking.openURL(item.sourceUrl);
  };

  return (
    <TouchableOpacity
      style={[styles.card, item.isRead && styles.readCard]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={[styles.sourceBadge, { backgroundColor: getSourceColor(item.source) }]}>
          <Text style={styles.sourceText}>{getSourceLabel(item.source)}</Text>
        </View>
        <Text style={styles.date}>{formatDate(item.publishedAt)}</Text>
        <TouchableOpacity onPress={() => onToggleSave(item.id)} style={styles.saveButton}>
          <Text style={styles.saveIcon}>{item.isSaved ? '★' : '☆'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {item.thumbnailUrl && (
          <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
        )}
        <View style={styles.textContent}>
          <Text
            style={[styles.title, item.isRead && styles.readTitle]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          {item.excerpt && (
            <Text style={styles.excerpt} numberOfLines={2}>
              {item.excerpt}
            </Text>
          )}
          {item.author && (
            <Text style={styles.author} numberOfLines={1}>
              {item.author}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  readCard: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sourceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  sourceText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  date: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  saveButton: {
    padding: 4,
  },
  saveIcon: {
    fontSize: 20,
    color: '#FFD700',
  },
  content: {
    flexDirection: 'row',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  readTitle: {
    color: '#666',
  },
  excerpt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  author: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default FeedItemCard;
