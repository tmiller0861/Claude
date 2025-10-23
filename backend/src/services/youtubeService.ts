import { google } from 'googleapis';
import { FeedItem, OAuthTokens } from '../types';

export class YouTubeService {
  /**
   * Create OAuth2 client with user credentials
   */
  private createOAuth2Client(clientId: string, clientSecret: string) {
    return new google.auth.OAuth2(
      clientId,
      clientSecret,
      'http://localhost:3000/api/auth/callback'
    );
  }

  /**
   * Fetch recent videos from subscribed channels
   */
  async fetchSubscriptionVideos(
    clientId: string,
    clientSecret: string,
    tokens: OAuthTokens,
    maxResults: number = 20
  ): Promise<FeedItem[]> {
    const oauth2Client = this.createOAuth2Client(clientId, clientSecret);
    oauth2Client.setCredentials(tokens);

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    try {
      // Get user's subscriptions
      const subscriptionsResponse = await youtube.subscriptions.list({
        part: ['snippet'],
        mine: true,
        maxResults: 50,
      });

      if (!subscriptionsResponse.data.items || subscriptionsResponse.data.items.length === 0) {
        return [];
      }

      // Get channel IDs
      const channelIds = subscriptionsResponse.data.items
        .map(sub => sub.snippet?.resourceId?.channelId)
        .filter((id): id is string => !!id);

      // Fetch recent videos from each channel
      const videoPromises = channelIds.slice(0, 10).map(channelId =>
        youtube.search.list({
          part: ['snippet'],
          channelId,
          order: 'date',
          maxResults: 5,
          type: ['video'],
        })
      );

      const videoResults = await Promise.allSettled(videoPromises);

      const allVideos = videoResults
        .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
        .flatMap(result => result.value.data.items || []);

      // Convert to FeedItem format
      const feedItems: FeedItem[] = allVideos.map(video => ({
        id: video.id.videoId,
        title: video.snippet.title,
        content: video.snippet.description,
        excerpt: video.snippet.description?.substring(0, 200),
        source: 'youtube' as const,
        sourceUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        author: video.snippet.channelTitle,
        publishedAt: new Date(video.snippet.publishedAt),
        isRead: false,
        isSaved: false,
        thumbnailUrl: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url,
        metadata: {
          videoId: video.id.videoId,
          channelName: video.snippet.channelTitle,
        },
      }));

      // Sort by published date and limit results
      return feedItems
        .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
        .slice(0, maxResults);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      return [];
    }
  }

  /**
   * Get activity feed (alternative method using activities API)
   */
  async fetchActivityFeed(
    clientId: string,
    clientSecret: string,
    tokens: OAuthTokens,
    maxResults: number = 20
  ): Promise<FeedItem[]> {
    const oauth2Client = this.createOAuth2Client(clientId, clientSecret);
    oauth2Client.setCredentials(tokens);

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    try {
      const response = await youtube.activities.list({
        part: ['snippet', 'contentDetails'],
        home: true,
        maxResults,
      });

      if (!response.data.items) {
        return [];
      }

      return response.data.items
        .filter(activity => activity.snippet?.type === 'upload')
        .map(activity => {
          const videoId = activity.contentDetails?.upload?.videoId;

          return {
            id: videoId || activity.id!,
            title: activity.snippet?.title || 'Untitled Video',
            content: activity.snippet?.description || '',
            excerpt: activity.snippet?.description?.substring(0, 200),
            source: 'youtube' as const,
            sourceUrl: `https://www.youtube.com/watch?v=${videoId}`,
            author: activity.snippet?.channelTitle || 'Unknown',
            publishedAt: new Date(activity.snippet?.publishedAt || new Date()),
            isRead: false,
            isSaved: false,
            thumbnailUrl: activity.snippet?.thumbnails?.high?.url,
            metadata: {
              videoId: videoId,
              channelName: activity.snippet?.channelTitle,
            },
          };
        });
    } catch (error) {
      console.error('Error fetching YouTube activity feed:', error);
      // Fallback to subscription videos if activity feed fails
      return this.fetchSubscriptionVideos(clientId, clientSecret, tokens, maxResults);
    }
  }
}

export default new YouTubeService();
