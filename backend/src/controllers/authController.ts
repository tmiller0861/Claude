import { Request, Response } from 'express';
import gmailService from '../services/gmailService';
import storageService from '../services/storageService';

export class AuthController {
  /**
   * Get Google OAuth URL
   */
  getAuthUrl(req: Request, res: Response) {
    try {
      const authUrl = gmailService.getAuthUrl();
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
      const tokens = await gmailService.getTokens(code);

      // Store tokens for the user
      storageService.updateUserTokens(userId, {
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
      });

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
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Missing refresh token' });
    }

    try {
      const tokens = await gmailService.refreshAccessToken(refreshToken);
      res.json({ tokens });
    } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(500).json({ error: 'Failed to refresh token' });
    }
  }
}

export default new AuthController();
