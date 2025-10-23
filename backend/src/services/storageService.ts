import NodeCache from 'node-cache';
import { FeedItem, SavedItem, ReadStatus, User } from '../types';

/**
 * Simple in-memory storage service
 * For production, replace with a proper database (MongoDB, PostgreSQL, etc.)
 */
export class StorageService {
  private cache: NodeCache;
  private savedItems: Map<string, SavedItem[]>;
  private readStatuses: Map<string, Set<string>>;
  private users: Map<string, User>;

  constructor() {
    // Cache TTL: 15 minutes
    this.cache = new NodeCache({ stdTTL: 900, checkperiod: 120 });
    this.savedItems = new Map();
    this.readStatuses = new Map();
    this.users = new Map();
  }

  /**
   * Cache feed items
   */
  cacheFeedItems(userId: string, items: FeedItem[]): void {
    this.cache.set(`feed:${userId}`, items);
  }

  /**
   * Get cached feed items
   */
  getCachedFeedItems(userId: string): FeedItem[] | undefined {
    return this.cache.get(`feed:${userId}`);
  }

  /**
   * Mark item as read
   */
  markAsRead(userId: string, itemId: string): void {
    if (!this.readStatuses.has(userId)) {
      this.readStatuses.set(userId, new Set());
    }
    this.readStatuses.get(userId)!.add(itemId);
  }

  /**
   * Mark item as unread
   */
  markAsUnread(userId: string, itemId: string): void {
    if (this.readStatuses.has(userId)) {
      this.readStatuses.get(userId)!.delete(itemId);
    }
  }

  /**
   * Check if item is read
   */
  isRead(userId: string, itemId: string): boolean {
    return this.readStatuses.get(userId)?.has(itemId) || false;
  }

  /**
   * Get all read item IDs for a user
   */
  getReadItems(userId: string): string[] {
    return Array.from(this.readStatuses.get(userId) || []);
  }

  /**
   * Save item for later
   */
  saveItem(userId: string, itemId: string): void {
    if (!this.savedItems.has(userId)) {
      this.savedItems.set(userId, []);
    }

    const userSavedItems = this.savedItems.get(userId)!;
    if (!userSavedItems.find(item => item.feedItemId === itemId)) {
      userSavedItems.push({
        userId,
        feedItemId: itemId,
        savedAt: new Date(),
      });
    }
  }

  /**
   * Unsave item
   */
  unsaveItem(userId: string, itemId: string): void {
    if (this.savedItems.has(userId)) {
      const userSavedItems = this.savedItems.get(userId)!;
      this.savedItems.set(
        userId,
        userSavedItems.filter(item => item.feedItemId !== itemId)
      );
    }
  }

  /**
   * Check if item is saved
   */
  isSaved(userId: string, itemId: string): boolean {
    return !!this.savedItems.get(userId)?.find(item => item.feedItemId === itemId);
  }

  /**
   * Get all saved items for a user
   */
  getSavedItems(userId: string): SavedItem[] {
    return this.savedItems.get(userId) || [];
  }

  /**
   * Store user data
   */
  storeUser(user: User): void {
    this.users.set(user.id, user);
  }

  /**
   * Get user data
   */
  getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  /**
   * Update user tokens
   */
  updateUserTokens(userId: string, tokens: { googleAccessToken?: string; googleRefreshToken?: string }): void {
    const user = this.users.get(userId);
    if (user) {
      this.users.set(userId, { ...user, ...tokens });
    }
  }

  /**
   * Add RSS feed URL for user
   */
  addRssFeed(userId: string, feedUrl: string): void {
    const user = this.users.get(userId);
    if (user) {
      const rssFeedUrls = user.rssFeedUrls || [];
      if (!rssFeedUrls.includes(feedUrl)) {
        rssFeedUrls.push(feedUrl);
        this.users.set(userId, { ...user, rssFeedUrls });
      }
    }
  }

  /**
   * Add podcast feed URL for user
   */
  addPodcastFeed(userId: string, feedUrl: string): void {
    const user = this.users.get(userId);
    if (user) {
      const podcastFeedUrls = user.podcastFeedUrls || [];
      if (!podcastFeedUrls.includes(feedUrl)) {
        podcastFeedUrls.push(feedUrl);
        this.users.set(userId, { ...user, podcastFeedUrls });
      }
    }
  }

  /**
   * Apply read/saved status to feed items
   */
  applyUserStatus(userId: string, items: FeedItem[]): FeedItem[] {
    return items.map(item => ({
      ...item,
      isRead: this.isRead(userId, item.id),
      isSaved: this.isSaved(userId, item.id),
    }));
  }
}

export default new StorageService();
