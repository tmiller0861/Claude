# Quick Start Guide - Command Center Mobile App

Get the Command Center mockup running in under 5 minutes!

## Prerequisites Check

Before you begin, make sure you have:

- [ ] Node.js (v16+) - `node --version`
- [ ] npm or yarn - `npm --version`
- [ ] React Native CLI - `npx react-native --version`
- [ ] For iOS: Xcode (macOS only)
- [ ] For Android: Android Studio

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd mobile-app
npm install
```

This will install all required packages including:
- React Native
- React Navigation
- Vector Icons
- TypeScript support

### 2. Link Native Dependencies (iOS only)

```bash
cd ios
pod install
cd ..
```

### 3. Run the App

#### On iOS (macOS only)
```bash
npm run ios
```

Or specify a device:
```bash
npm run ios -- --simulator="iPhone 15"
```

#### On Android
```bash
npm run android
```

Make sure you have:
- Android emulator running, OR
- Physical device connected via USB with USB debugging enabled

### 4. Start Metro Bundler (if not auto-started)

```bash
npm start
```

## What You'll See

### Home Screen
A dark-themed dashboard with 10 content source cards:
- Email, News, Substack, RSS, Podcasts
- YouTube, Reddit, Twitter, Pocket, Medium

Each card shows:
- Icon with brand colors
- Source name
- Unread count badge
- Short description

### Try These Actions

1. **Tap any content card** → Navigate to content list
2. **Tap a content item** → View full details
3. **Tap settings icon** (top right) → Open settings
4. **Use back button** → Return to previous screen

## File Structure Overview

```
mobile-app/
├── src/
│   ├── components/
│   │   └── SourceCard.tsx          # Content source card component
│   ├── screens/
│   │   ├── HomeScreen.tsx          # Main dashboard
│   │   ├── ContentListScreen.tsx   # List of content items
│   │   ├── ContentDetailScreen.tsx # Detail view
│   │   └── SettingsScreen.tsx      # Settings screen
│   └── types/
│       └── index.ts                # TypeScript definitions
├── App.tsx                         # Root component with navigation
├── index.js                        # Entry point
└── package.json                    # Dependencies
```

## Customization Quick Tips

### Change Colors

Edit any screen's `styles` object. Main colors:
```typescript
backgroundColor: '#0f0f1e',  // Main background
cardBackground: '#1a1a2e',   // Cards
accentColor: '#4285F4',      // Primary blue
textPrimary: '#fff',         // White text
textSecondary: '#a0a0b0',    // Gray text
```

### Add a New Content Source

In `src/screens/HomeScreen.tsx`, add to `contentSources` array:

```typescript
{
  id: 'linkedin',
  name: 'LinkedIn',
  icon: 'linkedin',
  iconFamily: 'FontAwesome',
  color: '#0A66C2',
  unreadCount: 5,
  description: 'Professional network',
}
```

### Modify Mock Content

In `src/screens/ContentListScreen.tsx`, update `generateMockContent()`:

```typescript
const contentTypes: Record<string, Partial<ContentItem>[]> = {
  linkedin: [
    {
      title: 'Your post got 100 likes',
      source: 'LinkedIn',
      excerpt: 'See who engaged with your recent post...',
      publishedDate: new Date(),
    },
  ],
};
```

## Troubleshooting

### Metro Bundler Issues
```bash
# Clear Metro cache
npm start -- --reset-cache
```

### iOS Build Errors
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

### Android Build Errors
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Icon Issues
If icons don't show:

**iOS:**
```bash
cd ios
pod install
cd ..
```

**Android:**
```bash
npm run android
```

### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit
```

## Development Tips

### Hot Reload
- Press `r` in Metro terminal to reload
- Press `d` to open developer menu
- Shake device for developer menu

### Debug Menu (Simulator/Emulator)
- **iOS**: Cmd + D
- **Android**: Cmd + M (Mac) or Ctrl + M (Windows/Linux)

### Enable Live Reload
1. Open debug menu
2. Enable "Fast Refresh"

### View React DevTools
1. Open debug menu
2. Select "Debug"
3. Opens Chrome DevTools

## Next Steps

1. **Explore the code** - Start with `App.tsx` and follow the navigation
2. **Modify styles** - Experiment with colors and layouts
3. **Add mock data** - Create more realistic content samples
4. **Implement real APIs** - Connect to actual data sources
5. **Add features** - Search, filters, offline mode, etc.

## Common Tasks

### Add a New Screen
1. Create file in `src/screens/NewScreen.tsx`
2. Add to navigation in `App.tsx`
3. Add to `RootStackParamList` in `src/types/index.ts`

### Add a New Component
1. Create file in `src/components/NewComponent.tsx`
2. Import and use in any screen

### Update Dependencies
```bash
npm update
cd ios && pod update && cd ..  # iOS only
```

## Performance Optimization

For production:
1. Enable Hermes engine (Android)
2. Optimize images
3. Use FlatList for long lists (already implemented)
4. Implement code splitting
5. Add performance monitoring

## Getting Help

- **React Native Docs**: https://reactnative.dev
- **React Navigation**: https://reactnavigation.org
- **TypeScript**: https://www.typescriptlang.org/docs

## Building for Production

### iOS
```bash
# In Xcode
1. Open ios/CommandCenter.xcworkspace
2. Select "Generic iOS Device"
3. Product → Archive
```

### Android
```bash
cd android
./gradlew assembleRelease
# APK at: android/app/build/outputs/apk/release/
```

---

**You're all set! Start building your command center!** 🚀
