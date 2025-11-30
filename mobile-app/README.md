# Command Center Mobile App

A mobile command center that serves as your hub for checking email, news sites, substacks, RSS feeds, podcasts, YouTube videos, and more. This mockup provides a beautiful, modern interface for aggregating all your content sources in one place.

## Features

### Content Sources Dashboard
- **Email** - Check your inbox with unread counts
- **News** - Latest headlines from your favorite news sites
- **Substack** - Newsletter articles and subscriptions
- **RSS Feeds** - Blog updates and feeds
- **Podcasts** - New episode notifications
- **YouTube** - Video subscriptions and recommendations
- **Reddit** - Saved posts and favorite subreddits
- **Twitter** - Timeline and bookmarked tweets
- **Pocket** - Reading list items
- **Medium** - Articles to read

### Core Features
- Clean, modern dark theme UI
- Unread count badges for each content source
- Easy navigation between sources
- Content detail views with actions (Open, Share, Save)
- Settings for managing accounts and preferences
- Responsive grid layout optimized for mobile

## Project Structure

```
mobile-app/
├── src/
│   ├── components/
│   │   └── SourceCard.tsx          # Reusable content source card
│   ├── screens/
│   │   ├── HomeScreen.tsx          # Main dashboard with all sources
│   │   ├── ContentListScreen.tsx   # List of items from a source
│   │   ├── ContentDetailScreen.tsx # Full content view
│   │   └── SettingsScreen.tsx      # App settings and preferences
│   └── types/
│       └── index.ts                # TypeScript type definitions
├── App.tsx                         # Main app component with navigation
├── index.js                        # App entry point
├── package.json                    # Dependencies
└── tsconfig.json                   # TypeScript configuration
```

## Technology Stack

- **React Native** - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
  - Stack Navigator for screen transitions
  - Bottom tabs for main navigation
- **React Native Vector Icons** - Icon sets
  - Material Icons
  - Font Awesome
  - Ionicons
  - Material Community Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- React Native CLI
- Xcode (for iOS) or Android Studio (for Android)

### Installation

1. **Install dependencies:**
   ```bash
   cd mobile-app
   npm install
   ```

2. **Install iOS dependencies (macOS only):**
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Run on iOS:**
   ```bash
   npm run ios
   ```

4. **Run on Android:**
   ```bash
   npm run android
   ```

## Screen Details

### Home Screen
The main dashboard displays all your content sources in a grid layout:
- Each source shows an icon, name, and unread count
- Tap any source to view its content
- Settings icon in the header for app configuration
- Shows total unread count across all sources

### Content List Screen
Shows items from the selected content source:
- List of articles, emails, videos, etc.
- Visual indicator for unread items
- Preview excerpt for each item
- Publication date
- Tap to view full details

### Content Detail Screen
Full view of a content item:
- Complete title and source information
- Publication date
- Full content or excerpt
- Action buttons:
  - **Save** - Bookmark for later
  - **Share** - Share with others
  - **Open** - Open in external app/browser

### Settings Screen
Manage your command center:
- **Content Sources** - Connect and configure accounts
  - Email accounts
  - News sources
  - RSS feeds
  - Social media accounts
- **Preferences**
  - Enable/disable notifications
  - Dark mode toggle
  - Auto-refresh settings
  - Refresh interval configuration
- **Data Management**
  - Offline reading setup
  - Clear cache
- **About**
  - App version
  - Help & support
  - Privacy policy

## Customization

### Adding New Content Sources

Edit `src/screens/HomeScreen.tsx` and add to the `contentSources` array:

```typescript
{
  id: 'new-source',
  name: 'New Source',
  icon: 'icon-name',
  iconFamily: 'MaterialIcons', // or FontAwesome, Ionicons, etc.
  color: '#HEX_COLOR',
  unreadCount: 0,
  description: 'Description text',
}
```

### Customizing Colors

The app uses a dark theme with these primary colors:
- Background: `#0f0f1e`
- Card Background: `#1a1a2e`
- Border: `#2a2a3e`
- Primary Blue: `#4285F4`
- Text Primary: `#fff`
- Text Secondary: `#a0a0b0`

Edit the StyleSheet objects in each component to customize.

### Connecting Real Data

This is currently a mockup with sample data. To connect real data:

1. Create API service files in `src/services/`
2. Implement data fetching for each content source
3. Update screens to use real data instead of mock data
4. Add state management (Redux, MobX, or Context API)

## Next Steps

To turn this mockup into a production app:

1. **Backend Integration**
   - Set up API endpoints for each content source
   - Implement authentication for various services
   - Create data aggregation service

2. **State Management**
   - Add Redux or Context API for global state
   - Implement data caching and persistence
   - Handle offline mode

3. **Push Notifications**
   - Configure Firebase Cloud Messaging
   - Implement notification handlers
   - Add notification preferences

4. **Authentication**
   - User login/registration
   - OAuth for third-party services
   - Secure credential storage

5. **Advanced Features**
   - Search across all content
   - Filtering and sorting options
   - Content categorization
   - Reading statistics and analytics
   - Sync across devices

## Design Principles

- **Mobile-First**: Optimized for mobile screens
- **Dark Theme**: Reduces eye strain for extended reading
- **Clean UI**: Minimal distractions, focus on content
- **Quick Access**: Fast navigation to any content source
- **Unified Experience**: Consistent interface across all sources

## Contributing

This is a mockup/prototype. Feel free to:
- Enhance the UI/UX
- Add new content sources
- Implement real API integrations
- Improve performance
- Add tests

## License

MIT License - Use and modify as needed for your projects!

---

**Built with React Native & TypeScript**
