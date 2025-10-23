# Content Dashboard

A cross-platform application that aggregates all your content sources into one unified feed. Access your Gmail, YouTube subscriptions, RSS feeds (including Substack), podcasts, and Hacker News all in one place.

## Features

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
- **Offline Cache**: Cached content for quick access

## Tech Stack

### Backend
- **Node.js** with **Express**
- **TypeScript** for type safety
- **Google APIs** (Gmail & YouTube)
- **RSS Parser** for feed aggregation
- **Node-Cache** for caching

### Frontend
- **React Native** with **Expo**
- **TypeScript**
- **React Navigation** for navigation
- **Axios** for API calls
- **AsyncStorage** for local storage

## Project Structure

```
/
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── types/        # TypeScript types
│   └── package.json
│
├── frontend/             # React Native Expo app
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── screens/      # Screen components
│   │   ├── services/     # API service
│   │   ├── navigation/   # Navigation setup
│   │   └── types/        # TypeScript types
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Cloud Console** account (for OAuth)
- **Expo CLI** (optional, for mobile development)

### 1. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Gmail API
   - YouTube Data API v3
4. Create OAuth 2.0 credentials:
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback`
5. Save your **Client ID** and **Client Secret**

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your Google OAuth credentials:
# GOOGLE_CLIENT_ID=your_client_id_here
# GOOGLE_CLIENT_SECRET=your_client_secret_here
# GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback

# Run in development mode
npm run dev

# Or build and run in production
npm run build
npm start
```

The backend API will be available at `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Update API URL in src/services/api.ts if needed
# For iOS/Android: Use your machine's local IP instead of localhost
# For Web: Use http://localhost:3000/api

# Start the Expo development server
npx expo start

# Choose your platform:
# - Press 'w' for web
# - Press 'i' for iOS simulator (macOS only)
# - Press 'a' for Android emulator
# - Scan QR code with Expo Go app for physical device
```

## Usage Guide

### First Time Setup

1. **Launch the app** and enter your email to create an account
2. **Connect Google Account** (optional):
   - Go to Settings tab
   - Tap "Connect Gmail & YouTube"
   - Authorize the app in your browser
3. **Add RSS Feeds**:
   - Go to Settings tab
   - Enter RSS feed URLs (e.g., Substack newsletters)
   - Tap "Add RSS Feed"
4. **Add Podcast Feeds**:
   - Get RSS feed URL from your podcast app
   - Enter in Settings → Podcasts
   - Tap "Add Podcast Feed"

### Daily Use

- **View Feed**: See all your content in the Feed tab
- **Mark as Read**: Tap any item to open it (automatically marks as read)
- **Save for Later**: Tap the star icon to save items
- **View Saved**: Go to Saved tab to see bookmarked items
- **Refresh**: Pull down on any screen to refresh content

## API Endpoints

### Authentication
- `GET /api/auth/auth-url` - Get Google OAuth URL
- `POST /api/auth/callback` - Handle OAuth callback
- `POST /api/auth/refresh` - Refresh access token

### Users
- `POST /api/users` - Create new user
- `GET /api/users/:userId` - Get user details
- `POST /api/users/rss-feed` - Add RSS feed
- `POST /api/users/podcast-feed` - Add podcast feed

### Feed
- `GET /api/feed/:userId` - Get aggregated feed
- `GET /api/feed/:userId/saved` - Get saved items
- `GET /api/feed/:userId/unread` - Get unread items
- `POST /api/feed/read` - Mark item as read
- `POST /api/feed/unread` - Mark item as unread
- `POST /api/feed/save` - Save item
- `POST /api/feed/unsave` - Unsave item

## Configuration

### Backend Environment Variables

```env
PORT=3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

### Frontend Configuration

Update `frontend/src/services/api.ts`:

```typescript
// For web development
const API_URL = 'http://localhost:3000/api';

// For iOS/Android (use your machine's IP)
const API_URL = 'http://192.168.1.X:3000/api';
```

## Development

### Run Backend in Development Mode
```bash
cd backend
npm run dev
```

### Run Frontend
```bash
cd frontend
npx expo start
```

### Build for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npx expo build:web  # For web
eas build --platform ios  # For iOS (requires EAS account)
eas build --platform android  # For Android
```

## Troubleshooting

### Common Issues

1. **"Access denied" when fetching feeds**
   - Check your Google OAuth credentials
   - Ensure APIs are enabled in Google Cloud Console
   - Verify redirect URI matches exactly

2. **Cannot connect to backend from mobile device**
   - Use your machine's IP address instead of localhost
   - Ensure both devices are on the same network
   - Check firewall settings

3. **RSS feeds not loading**
   - Verify the feed URL is valid
   - Check if the feed requires authentication
   - Some feeds may be blocked by CORS

4. **App crashes on startup**
   - Clear AsyncStorage: Delete app and reinstall
   - Check backend is running
   - Verify API_URL is correct

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication with email/password
- [ ] Push notifications for new content
- [ ] Advanced filtering and search
- [ ] Read time estimates
- [ ] Dark mode
- [ ] Export saved items
- [ ] Share functionality
- [ ] Multiple user accounts

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For questions or issues, please open an issue on GitHub.
