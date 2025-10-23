import axios from 'axios';
import { FeedItem, User } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure your backend URL here
const API_URL = 'http://localhost:3000/api';

class ApiService {
  private userId: string | null = null;

  async init() {
    const storedUserId = await AsyncStorage.getItem('userId');
    if (storedUserId) {
      this.userId = storedUserId;
    }
  }

  async createUser(email: string): Promise<User> {
    const response = await axios.post(`${API_URL}/users`, { email });
    const user = response.data.user;
    this.userId = user.id;
    await AsyncStorage.setItem('userId', user.id);
    return user;
  }

  async getUser(): Promise<User | null> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      return null;
    }

    try {
      const response = await axios.get(`${API_URL}/users/${this.userId}`);
      return response.data.user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async getFeed(): Promise<FeedItem[]> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      throw new Error('No user ID found');
    }

    try {
      const response = await axios.get(`${API_URL}/feed/${this.userId}`);
      return response.data.items.map((item: FeedItem) => ({
        ...item,
        publishedAt: new Date(item.publishedAt),
      }));
    } catch (error) {
      console.error('Error fetching feed:', error);
      return [];
    }
  }

  async getSavedItems(): Promise<FeedItem[]> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      throw new Error('No user ID found');
    }

    try {
      const response = await axios.get(`${API_URL}/feed/${this.userId}/saved`);
      return response.data.items.map((item: FeedItem) => ({
        ...item,
        publishedAt: new Date(item.publishedAt),
      }));
    } catch (error) {
      console.error('Error fetching saved items:', error);
      return [];
    }
  }

  async getUnreadItems(): Promise<FeedItem[]> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      throw new Error('No user ID found');
    }

    try {
      const response = await axios.get(`${API_URL}/feed/${this.userId}/unread`);
      return response.data.items.map((item: FeedItem) => ({
        ...item,
        publishedAt: new Date(item.publishedAt),
      }));
    } catch (error) {
      console.error('Error fetching unread items:', error);
      return [];
    }
  }

  async markAsRead(itemId: string): Promise<void> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      throw new Error('No user ID found');
    }

    await axios.post(`${API_URL}/feed/read`, { userId: this.userId, itemId });
  }

  async markAsUnread(itemId: string): Promise<void> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      throw new Error('No user ID found');
    }

    await axios.post(`${API_URL}/feed/unread`, { userId: this.userId, itemId });
  }

  async saveItem(itemId: string): Promise<void> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      throw new Error('No user ID found');
    }

    await axios.post(`${API_URL}/feed/save`, { userId: this.userId, itemId });
  }

  async unsaveItem(itemId: string): Promise<void> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      throw new Error('No user ID found');
    }

    await axios.post(`${API_URL}/feed/unsave`, { userId: this.userId, itemId });
  }

  async addRssFeed(feedUrl: string): Promise<void> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      throw new Error('No user ID found');
    }

    await axios.post(`${API_URL}/users/rss-feed`, { userId: this.userId, feedUrl });
  }

  async addPodcastFeed(feedUrl: string): Promise<void> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      throw new Error('No user ID found');
    }

    await axios.post(`${API_URL}/users/podcast-feed`, { userId: this.userId, feedUrl });
  }

  async saveGoogleCredentials(clientId: string, clientSecret: string): Promise<void> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      throw new Error('No user ID found');
    }

    await axios.post(`${API_URL}/users/google-credentials`, {
      userId: this.userId,
      clientId,
      clientSecret,
    });
  }

  async getAuthUrl(): Promise<string> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      throw new Error('No user ID found');
    }

    const response = await axios.get(`${API_URL}/auth/auth-url?userId=${this.userId}`);
    return response.data.authUrl;
  }

  async handleAuthCallback(code: string): Promise<void> {
    if (!this.userId) {
      await this.init();
    }

    if (!this.userId) {
      throw new Error('No user ID found');
    }

    const response = await axios.post(`${API_URL}/auth/callback`, {
      code,
      userId: this.userId,
    });

    return response.data;
  }
}

export default new ApiService();
