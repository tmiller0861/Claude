import { FeedItem, OAuthTokens } from '../types';
import gmailService from './gmailService';
import youtubeService from './youtubeService';
import rssService from './rssService';
import storageService from './storageService';

export class FeedAggregator {
  /**
   * Fetch all feeds for a user
   */
  async aggregateFeeds(
    userId: string,
    tokens?: OAuthTokens,
    rssFeedUrls?: string[],
    podcastFeedUrls?: string[]
  ): Promise<FeedItem[]> {
    const feedPromises: Promise<FeedItem[]>[] = [];

    // Fetch Gmail emails if tokens are provided
    if (tokens) {
      feedPromises.push(
        gmailService.fetchEmails(tokens).catch(err => {
          console.error('Gmail fetch error:', err);
          return [];
        })
      );

      // Fetch YouTube videos if tokens are provided
      feedPromises.push(
        youtubeService.fetchActivityFeed(tokens).catch(err => {
          console.error('YouTube fetch error:', err);
          return [];
        })
      );
    }

    // Fetch Hacker News
    feedPromises.push(
      rssService.fetchHackerNews().catch(err => {
        console.error('Hacker News fetch error:', err);
        return [];
      })
    );

    // Fetch RSS feeds
    if (rssFeedUrls && rssFeedUrls.length > 0) {
      feedPromises.push(
        rssService.fetchMultipleFeeds(rssFeedUrls).catch(err => {
          console.error('RSS feeds fetch error:', err);
          return [];
        })
      );
    }

    // Fetch podcast feeds
    if (podcastFeedUrls && podcastFeedUrls.length > 0) {
      feedPromises.push(
        rssService.fetchPodcasts(podcastFeedUrls).catch(err => {
          console.error('Podcast feeds fetch error:', err);
          return [];
        })
      );
    }

    // Wait for all feeds to be fetched
    const results = await Promise.allSettled(feedPromises);

    // Flatten all results
    const allItems = results
      .filter((result): result is PromiseFulfilledResult<FeedItem[]> => result.status === 'fulfilled')
      .flatMap(result => result.value);

    // Sort by published date (most recent first)
    const sortedItems = allItems.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    // Apply user's read/saved status
    const itemsWithStatus = storageService.applyUserStatus(userId, sortedItems);

    // Cache the results
    storageService.cacheFeedItems(userId, itemsWithStatus);

    return itemsWithStatus;
  }

  /**
   * Get saved items for a user
   */
  async getSavedItems(userId: string): Promise<FeedItem[]> {
    const cachedItems = storageService.getCachedFeedItems(userId) || [];
    const savedItemIds = storageService.getSavedItems(userId).map(item => item.feedItemId);

    return cachedItems.filter(item => savedItemIds.includes(item.id));
  }

  /**
   * Get unread items for a user
   */
  async getUnreadItems(userId: string): Promise<FeedItem[]> {
    const cachedItems = storageService.getCachedFeedItems(userId) || [];
    return cachedItems.filter(item => !item.isRead);
  }
}

export default new FeedAggregator();
