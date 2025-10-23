import { google } from 'googleapis';
import { FeedItem, OAuthTokens } from '../types';

export class GmailService {
  /**
   * Create OAuth2 client with user credentials
   */
  private createOAuth2Client(clientId: string, clientSecret: string, redirectUri?: string) {
    return new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri || 'http://localhost:3000/api/auth/callback'
    );
  }

  /**
   * Get authorization URL for OAuth
   */
  getAuthUrl(clientId: string, clientSecret: string, redirectUri?: string): string {
    const oauth2Client = this.createOAuth2Client(clientId, clientSecret, redirectUri);
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/youtube.readonly',
      ],
      prompt: 'consent',
    });
  }

  /**
   * Exchange authorization code for tokens
   */
  async getTokens(clientId: string, clientSecret: string, code: string, redirectUri?: string): Promise<OAuthTokens> {
    const oauth2Client = this.createOAuth2Client(clientId, clientSecret, redirectUri);
    const { tokens } = await oauth2Client.getToken(code);
    return {
      access_token: tokens.access_token!,
      refresh_token: tokens.refresh_token ?? undefined,
      expiry_date: tokens.expiry_date ?? undefined,
    };
  }

  /**
   * Fetch recent emails from Gmail
   */
  async fetchEmails(
    clientId: string,
    clientSecret: string,
    tokens: OAuthTokens,
    maxResults: number = 20
  ): Promise<FeedItem[]> {
    const oauth2Client = this.createOAuth2Client(clientId, clientSecret);
    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    try {
      // Get list of message IDs
      const listResponse = await gmail.users.messages.list({
        userId: 'me',
        maxResults,
        q: 'category:primary', // Only primary inbox
      });

      if (!listResponse.data.messages) {
        return [];
      }

      // Fetch full message details
      const messagePromises = listResponse.data.messages.map(msg =>
        gmail.users.messages.get({
          userId: 'me',
          id: msg.id!,
          format: 'full',
        })
      );

      const messages = await Promise.all(messagePromises);

      return messages.map(msg => {
        const headers = msg.data.payload?.headers || [];
        const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
        const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
        const date = headers.find(h => h.name === 'Date')?.value;

        // Extract email body
        let body = '';
        if (msg.data.payload?.body?.data) {
          body = Buffer.from(msg.data.payload.body.data, 'base64').toString();
        } else if (msg.data.payload?.parts) {
          const textPart = msg.data.payload.parts.find(
            part => part.mimeType === 'text/plain' || part.mimeType === 'text/html'
          );
          if (textPart?.body?.data) {
            body = Buffer.from(textPart.body.data, 'base64').toString();
          }
        }

        // Create excerpt (plain text, first 200 chars)
        const excerpt = body
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .substring(0, 200);

        return {
          id: msg.data.id!,
          title: subject,
          content: body,
          excerpt,
          source: 'gmail' as const,
          sourceUrl: `https://mail.google.com/mail/u/0/#inbox/${msg.data.id}`,
          author: from,
          publishedAt: date ? new Date(date) : new Date(),
          isRead: !msg.data.labelIds?.includes('UNREAD'),
          isSaved: false,
          metadata: {
            emailFrom: from,
          },
        };
      });
    } catch (error) {
      console.error('Error fetching Gmail messages:', error);
      return [];
    }
  }

  /**
   * Refresh access token if expired
   */
  async refreshAccessToken(
    clientId: string,
    clientSecret: string,
    refreshToken: string
  ): Promise<OAuthTokens> {
    const oauth2Client = this.createOAuth2Client(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const { credentials } = await oauth2Client.refreshAccessToken();

    return {
      access_token: credentials.access_token!,
      refresh_token: credentials.refresh_token ?? undefined,
      expiry_date: credentials.expiry_date ?? undefined,
    };
  }
}

export default new GmailService();
