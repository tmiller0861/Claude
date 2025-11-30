import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ContentSource } from '../types';

interface SourceCardProps {
  source: ContentSource;
  onPress: (source: ContentSource) => void;
  width: number;
}

const SourceCard: React.FC<SourceCardProps> = ({ source, onPress, width }) => {
  const renderIcon = () => {
    const iconProps = {
      name: source.icon,
      size: 40,
      color: source.color,
    };

    switch (source.iconFamily) {
      case 'MaterialIcons':
        return <MaterialIcons {...iconProps} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons {...iconProps} />;
      case 'FontAwesome':
        return <FontAwesome {...iconProps} />;
      case 'Ionicons':
        return <Ionicons {...iconProps} />;
      default:
        return <MaterialIcons {...iconProps} />;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width }]}
      onPress={() => onPress(source)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>{renderIcon()}</View>

      <View style={styles.contentContainer}>
        <Text style={styles.sourceName} numberOfLines={1}>
          {source.name}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {source.description}
        </Text>
      </View>

      {source.unreadCount !== undefined && source.unreadCount > 0 && (
        <View style={[styles.badge, { backgroundColor: source.color }]}>
          <Text style={styles.badgeText}>
            {source.unreadCount > 99 ? '99+' : source.unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#0f0f1e',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contentContainer: {
    flex: 1,
  },
  sourceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#a0a0b0',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default SourceCard;
