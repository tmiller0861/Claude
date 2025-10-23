export interface FeedItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  source: 'gmail' | 'youtube' | 'rss' | 'podcast' | 'hackernews';
  sourceUrl: string;
  author?: string;
  publishedAt: Date | string;
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
  googleAccessToken?: string;
  googleRefreshToken?: string;
  rssFeedUrls?: string[];
  podcastFeedUrls?: string[];
}

export type SourceType = 'all' | 'gmail' | 'youtube' | 'rss' | 'podcast' | 'hackernews';
