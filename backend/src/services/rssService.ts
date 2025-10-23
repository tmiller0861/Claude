import Parser from 'rss-parser';
import { FeedItem } from '../types';

const parser = new Parser();

export class RSSService {
  /**
   * Fetch and parse RSS feed
   */
  async fetchFeed(feedUrl: string, source: 'rss' | 'podcast' = 'rss'): Promise<FeedItem[]> {
    try {
      const feed = await parser.parseURL(feedUrl);

      return feed.items.map((item, index) => ({
        id: item.guid || item.link || `${feedUrl}-${index}`,
        title: item.title || 'Untitled',
        content: item.content || item.contentSnippet || '',
        excerpt: item.contentSnippet?.substring(0, 200),
        source: source,
        sourceUrl: item.link || feedUrl,
        author: item.creator || item.author || feed.title,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        isRead: false,
        isSaved: false,
        thumbnailUrl: this.extractThumbnail(item),
        metadata: {
          feedName: feed.title,
          podcastName: source === 'podcast' ? feed.title : undefined,
        },
      }));
    } catch (error) {
      console.error(`Error fetching RSS feed ${feedUrl}:`, error);
      return [];
    }
  }

  /**
   * Fetch Hacker News top stories via RSS
   */
  async fetchHackerNews(): Promise<FeedItem[]> {
    const hnRssUrl = 'https://news.ycombinator.com/rss';
    const items = await this.fetchFeed(hnRssUrl, 'rss');

    return items.map(item => ({
      ...item,
      source: 'hackernews' as const,
    }));
  }

  /**
   * Extract thumbnail from RSS item
   */
  private extractThumbnail(item: any): string | undefined {
    // Try various thumbnail fields
    if (item.enclosure?.url) return item.enclosure.url;
    if (item['media:thumbnail']?.$?.url) return item['media:thumbnail'].$.url;
    if (item['media:content']?.$?.url) return item['media:content'].$.url;

    // Try to extract from content
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = item.content?.match(imgRegex);
    return match ? match[1] : undefined;
  }

  /**
   * Fetch multiple RSS feeds
   */
  async fetchMultipleFeeds(feedUrls: string[]): Promise<FeedItem[]> {
    const feedPromises = feedUrls.map(url => this.fetchFeed(url));
    const results = await Promise.allSettled(feedPromises);

    return results
      .filter((result): result is PromiseFulfilledResult<FeedItem[]> => result.status === 'fulfilled')
      .flatMap(result => result.value);
  }

  /**
   * Fetch podcast feeds
   */
  async fetchPodcasts(podcastUrls: string[]): Promise<FeedItem[]> {
    const feedPromises = podcastUrls.map(url => this.fetchFeed(url, 'podcast'));
    const results = await Promise.allSettled(feedPromises);

    return results
      .filter((result): result is PromiseFulfilledResult<FeedItem[]> => result.status === 'fulfilled')
      .flatMap(result => result.value);
  }
}

export default new RSSService();
