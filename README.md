# Content Dashboard

A cross-platform application that aggregates all your content sources into one unified feed. Access your Gmail, YouTube subscriptions, RSS feeds (including Substack), podcasts, and Hacker News all in one place.

## Features

- **Zero Configuration Required**: No environment files or setup needed - configure everything through the UI!
- **Unified Feed**: View all your content from different sources in a single, chronological feed
- **Multiple Sources**:
  - Gmail emails
  - YouTube subscription videos
  - RSS feeds (Substack, blogs, etc.)
  - Podcast feeds
  - Hacker News top stories
- **Read/Unread Management**: Mark items as read or unread
- **Save for Later**: Bookmark important items to read later
- **Cross-Platform**: Works on iOS, Android, and Web
- **User-Level OAuth**: Each user has their own Google OAuth credentials - no shared keys!

## Quick Start

### 1. Run the Backend

```bash
cd backend
npm install
npm run dev
```

Backend will start on http://localhost:3000

### 2. Run the Frontend

```bash
cd frontend
npm install
npx expo start
# Press 'w' for web, 'i' for iOS, 'a' for Android
```

### 3. Start Using the App!

1. Open the app and enter your email to create an account
2. That's it! You can now:
   - Add RSS feeds and podcasts immediately (no setup needed)
   - View Hacker News (works out of the box)
   - Set up Google OAuth for Gmail/YouTube (optional, guided in-app)

## Setting Up Google Services (Optional)

If you want to connect Gmail and YouTube:

### Get Your Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project (or select existing)
3. Enable these APIs:
   - Gmail API
   - YouTube Data API v3
4. Create OAuth 2.0 credentials:
   - Application type: **Web application**
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback`
5. Copy your **Client ID** and **Client Secret**

### Configure in the App

1. Open the app and go to **Settings** tab
2. Scroll to **Google OAuth Setup**
3. Paste your Client ID and Client Secret
4. Tap **Save Google Credentials**
5. Tap **Connect Gmail & YouTube**
6. Authorize in your browser

Done! Your Gmail and YouTube feeds will now appear in your unified feed.

## How It Works

- **No Environment Files**: OAuth credentials are stored per-user in the backend
- **Guided Setup**: The app shows step-by-step instructions for Google OAuth
- **Works Without OAuth**: RSS, podcasts, and Hacker News work immediately
- **Privacy-Focused**: Each user has their own OAuth app - no shared credentials

## Project Structure

```
/Claude
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/          # Business logic (Gmail, YouTube, RSS)
│   │   ├── routes/            # API routes
│   │   └── types/             # TypeScript definitions
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/        # FeedItemCard (reusable UI)
│   │   ├── screens/           # Feed, Saved, Settings screens
│   │   ├── services/          # API client
│   │   └── navigation/        # Tab navigation
│   └── package.json
│
└── README.md
```

## API Endpoints

### Users
- `POST /api/users` - Create new user
- `GET /api/users/:userId` - Get user details
- `POST /api/users/google-credentials` - Save Google OAuth credentials
- `POST /api/users/rss-feed` - Add RSS feed
- `POST /api/users/podcast-feed` - Add podcast feed

### Authentication
- `GET /api/auth/auth-url?userId=XXX` - Get Google OAuth URL (uses user's credentials)
- `POST /api/auth/callback` - Handle OAuth callback
- `POST /api/auth/refresh` - Refresh access token

### Feed
- `GET /api/feed/:userId` - Get aggregated feed
- `GET /api/feed/:userId/saved` - Get saved items
- `GET /api/feed/:userId/unread` - Get unread items
- `POST /api/feed/read` - Mark item as read
- `POST /api/feed/unread` - Mark item as unread
- `POST /api/feed/save` - Save item
- `POST /api/feed/unsave` - Unsave item

## Features

### What Makes This Special

- **True Zero-Config**: Just run and use - no `.env` files needed!
- **In-App Setup**: All configuration happens through the UI with clear instructions
- **Per-User OAuth**: Each user can have their own Google OAuth app
- **Works Immediately**: RSS and Hacker News work without any setup
- **Privacy-Focused**: Your credentials are yours - not shared
- **Modern Stack**: TypeScript, React Native, Express

### App Workflow

1. **First Launch**: Enter email → Start using RSS/HN immediately
2. **Want Gmail/YouTube?**: Follow in-app guide to set up OAuth
3. **Add Content**: Add any RSS/podcast feeds through Settings
4. **Daily Use**: All content unified in one feed with read/save tracking

## Tech Stack

### Backend
- **Node.js** + **Express** + **TypeScript**
- **Google APIs** (Gmail & YouTube)
- **RSS Parser** for feed aggregation
- **In-memory storage** (easily replaceable with a database)

### Frontend
- **React Native** + **Expo** (iOS, Android, Web)
- **TypeScript**
- **React Navigation** for bottom tabs
- **Axios** for API calls
- **AsyncStorage** for local storage

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB) instead of in-memory
- [ ] User authentication with email/password
- [ ] Push notifications for new content
- [ ] Advanced filtering and search
- [ ] Dark mode
- [ ] Export saved items
- [ ] Share functionality
- [ ] Multiple user accounts

## Troubleshooting

### Common Issues

1. **"User Google OAuth credentials not set"**
   - Go to Settings and add your Google OAuth credentials first
   - Follow the in-app instructions to create them

2. **Cannot connect to backend from mobile device**
   - Use your machine's IP address instead of localhost in `frontend/src/services/api.ts`
   - Ensure both devices are on the same network

3. **RSS feeds not loading**
   - Verify the feed URL is valid and accessible
   - Check if the feed requires authentication

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For questions or issues, please open an issue on GitHub.
