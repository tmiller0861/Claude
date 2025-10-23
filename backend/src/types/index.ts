export interface FeedItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  source: 'gmail' | 'youtube' | 'rss' | 'podcast' | 'hackernews';
  sourceUrl: string;
  author?: string;
  publishedAt: Date;
  isRead: boolean;
  isSaved: boolean;
  thumbnailUrl?: string;
  metadata?: {
    emailFrom?: string;
    videoId?: string;
    channelName?: string;
    podcastName?: string;
    feedName?: string;
  };
}

export interface User {
  id: string;
  email: string;
  googleClientId?: string;
  googleClientSecret?: string;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  rssFeedUrls?: string[];
  podcastFeedUrls?: string[];
}

export interface OAuthTokens {
  access_token: string;
  refresh_token?: string;
  expiry_date?: number;
}

export interface SavedItem {
  userId: string;
  feedItemId: string;
  savedAt: Date;
}

export interface ReadStatus {
  userId: string;
  feedItemId: string;
  readAt: Date;
}
