import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '../types';

type ContentDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ContentDetail'
>;

const ContentDetailScreen = () => {
  const route = useRoute<ContentDetailScreenRouteProp>();
  const { item } = route.params;

  const handleOpenLink = () => {
    if (item.url) {
      Linking.openURL(item.url);
    }
  };

  const handleSharePress = () => {
    // Share functionality would go here
    console.log('Share pressed');
  };

  const handleBookmarkPress = () => {
    // Bookmark functionality would go here
    console.log('Bookmark pressed');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={styles.source}>{item.source}</Text>
          <Text style={styles.date}>
            {item.publishedDate?.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>

        {item.excerpt && (
          <Text style={styles.excerpt}>{item.excerpt}</Text>
        )}

        <View style={styles.mockContent}>
          <Text style={styles.contentText}>
            This is a mockup of the content detail screen. In a real
            application, this would display the full content of the article,
            email, video description, or other content type.
          </Text>
          <Text style={styles.contentText}>
            The content would be fetched from your various sources and displayed
            in a clean, readable format. You could scroll through the entire
            article or content piece here.
          </Text>
          <Text style={styles.contentText}>
            Features could include text formatting, embedded images, videos, and
            interactive elements depending on the content type.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleBookmarkPress}
        >
          <Ionicons name="bookmark-outline" size={24} color="#fff" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleSharePress}>
          <Ionicons name="share-outline" size={24} color="#fff" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        {item.url && (
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={handleOpenLink}
          >
            <Ionicons name="open-outline" size={24} color="#fff" />
            <Text style={styles.actionText}>Open</Text>
          </TouchableOpacity>
        )}
      </View>
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
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 16,
  },
  source: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#a0a0b0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    lineHeight: 32,
  },
  excerpt: {
    fontSize: 16,
    color: '#d0d0d0',
    lineHeight: 24,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  mockContent: {
    gap: 16,
  },
  contentText: {
    fontSize: 16,
    color: '#d0d0d0',
    lineHeight: 24,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a3e',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#4285F4',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ContentDetailScreen;
