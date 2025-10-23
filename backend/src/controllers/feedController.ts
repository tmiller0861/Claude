import { Request, Response } from 'express';
import feedAggregator from '../services/feedAggregator';
import storageService from '../services/storageService';

export class FeedController {
  /**
   * Get aggregated feed for a user
   */
  async getFeed(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    try {
      const user = storageService.getUser(userId);

      const tokens = user?.googleAccessToken
        ? {
            access_token: user.googleAccessToken,
            refresh_token: user.googleRefreshToken,
          }
        : undefined;

      const items = await feedAggregator.aggregateFeeds(
        userId,
        tokens,
        user?.rssFeedUrls,
        user?.podcastFeedUrls
      );

      res.json({ items, count: items.length });
    } catch (error) {
      console.error('Error fetching feed:', error);
      res.status(500).json({ error: 'Failed to fetch feed' });
    }
  }

  /**
   * Get saved items
   */
  async getSavedItems(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    try {
      const items = await feedAggregator.getSavedItems(userId);
      res.json({ items, count: items.length });
    } catch (error) {
      console.error('Error fetching saved items:', error);
      res.status(500).json({ error: 'Failed to fetch saved items' });
    }
  }

  /**
   * Get unread items
   */
  async getUnreadItems(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    try {
      const items = await feedAggregator.getUnreadItems(userId);
      res.json({ items, count: items.length });
    } catch (error) {
      console.error('Error fetching unread items:', error);
      res.status(500).json({ error: 'Failed to fetch unread items' });
    }
  }

  /**
   * Mark item as read
   */
  markAsRead(req: Request, res: Response) {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ error: 'Missing userId or itemId' });
    }

    try {
      storageService.markAsRead(userId, itemId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error marking item as read:', error);
      res.status(500).json({ error: 'Failed to mark item as read' });
    }
  }

  /**
   * Mark item as unread
   */
  markAsUnread(req: Request, res: Response) {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ error: 'Missing userId or itemId' });
    }

    try {
      storageService.markAsUnread(userId, itemId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error marking item as unread:', error);
      res.status(500).json({ error: 'Failed to mark item as unread' });
    }
  }

  /**
   * Save item for later
   */
  saveItem(req: Request, res: Response) {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ error: 'Missing userId or itemId' });
    }

    try {
      storageService.saveItem(userId, itemId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error saving item:', error);
      res.status(500).json({ error: 'Failed to save item' });
    }
  }

  /**
   * Unsave item
   */
  unsaveItem(req: Request, res: Response) {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ error: 'Missing userId or itemId' });
    }

    try {
      storageService.unsaveItem(userId, itemId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error unsaving item:', error);
      res.status(500).json({ error: 'Failed to unsave item' });
    }
  }
}

export default new FeedController();
