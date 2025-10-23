import { Request, Response } from 'express';
import storageService from '../services/storageService';
import { v4 as uuidv4 } from 'uuid';

export class UserController {
  /**
   * Create a new user
   */
  createUser(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    try {
      const userId = uuidv4();
      const user = {
        id: userId,
        email,
        rssFeedUrls: [],
        podcastFeedUrls: [],
      };

      storageService.storeUser(user);
      res.json({ user });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  /**
   * Get user by ID
   */
  getUser(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    try {
      const user = storageService.getUser(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  /**
   * Add RSS feed to user
   */
  addRssFeed(req: Request, res: Response) {
    const { userId, feedUrl } = req.body;

    if (!userId || !feedUrl) {
      return res.status(400).json({ error: 'Missing userId or feedUrl' });
    }

    try {
      storageService.addRssFeed(userId, feedUrl);
      const user = storageService.getUser(userId);
      res.json({ success: true, user });
    } catch (error) {
      console.error('Error adding RSS feed:', error);
      res.status(500).json({ error: 'Failed to add RSS feed' });
    }
  }

  /**
   * Add podcast feed to user
   */
  addPodcastFeed(req: Request, res: Response) {
    const { userId, feedUrl } = req.body;

    if (!userId || !feedUrl) {
      return res.status(400).json({ error: 'Missing userId or feedUrl' });
    }

    try {
      storageService.addPodcastFeed(userId, feedUrl);
      const user = storageService.getUser(userId);
      res.json({ success: true, user });
    } catch (error) {
      console.error('Error adding podcast feed:', error);
      res.status(500).json({ error: 'Failed to add podcast feed' });
    }
  }

  /**
   * Save Google OAuth credentials for user
   */
  saveGoogleCredentials(req: Request, res: Response) {
    const { userId, clientId, clientSecret } = req.body;

    if (!userId || !clientId || !clientSecret) {
      return res.status(400).json({ error: 'Missing userId, clientId, or clientSecret' });
    }

    try {
      storageService.updateUserTokens(userId, {
        googleClientId: clientId,
        googleClientSecret: clientSecret,
      });
      const user = storageService.getUser(userId);
      res.json({ success: true, user });
    } catch (error) {
      console.error('Error saving Google credentials:', error);
      res.status(500).json({ error: 'Failed to save Google credentials' });
    }
  }
}

export default new UserController();
