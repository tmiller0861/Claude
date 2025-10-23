import { Request, Response } from 'express';
import gmailService from '../services/gmailService';
import storageService from '../services/storageService';

export class AuthController {
  /**
   * Get Google OAuth URL
   */
  getAuthUrl(req: Request, res: Response) {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Missing userId' });
    }

    try {
      const user = storageService.getUser(userId);

      if (!user || !user.googleClientId || !user.googleClientSecret) {
        return res.status(400).json({
          error: 'User Google OAuth credentials not set. Please configure them first in Settings.'
        });
      }

      const authUrl = gmailService.getAuthUrl(user.googleClientId, user.googleClientSecret);
      res.json({ authUrl });
    } catch (error) {
      console.error('Error generating auth URL:', error);
      res.status(500).json({ error: 'Failed to generate auth URL' });
    }
  }

  /**
   * Handle OAuth callback
   */
  async handleCallback(req: Request, res: Response) {
    const { code, userId } = req.body;

    if (!code || !userId) {
      return res.status(400).json({ error: 'Missing code or userId' });
    }

    try {
      const user = storageService.getUser(userId);

      if (!user || !user.googleClientId || !user.googleClientSecret) {
        return res.status(400).json({ error: 'User Google OAuth credentials not found' });
      }

      const tokens = await gmailService.getTokens(
        user.googleClientId,
        user.googleClientSecret,
        code
      );

      // Store tokens for the user
      const tokenUpdate: { googleAccessToken: string; googleRefreshToken?: string } = {
        googleAccessToken: tokens.access_token,
      };
      if (tokens.refresh_token) {
        tokenUpdate.googleRefreshToken = tokens.refresh_token;
      }
      storageService.updateUserTokens(userId, tokenUpdate);

      res.json({ success: true, tokens });
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
      res.status(500).json({ error: 'Failed to exchange code for tokens' });
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(req: Request, res: Response) {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    try {
      const user = storageService.getUser(userId);

      if (!user || !user.googleRefreshToken || !user.googleClientId || !user.googleClientSecret) {
        return res.status(400).json({ error: 'User credentials or refresh token not found' });
      }

      const tokens = await gmailService.refreshAccessToken(
        user.googleClientId,
        user.googleClientSecret,
        user.googleRefreshToken
      );

      // Update tokens
      storageService.updateUserTokens(userId, {
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token || user.googleRefreshToken,
      });

      res.json({ tokens });
    } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(500).json({ error: 'Failed to refresh token' });
    }
  }
}

export default new AuthController();
