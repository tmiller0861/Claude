# Mobile Command Center - UI Mockup Guide

This document describes the visual design and user interface of the Command Center mobile app mockup.

## Color Scheme

### Dark Theme Palette
- **Primary Background**: `#0f0f1e` - Deep navy, main app background
- **Card Background**: `#1a1a2e` - Slightly lighter navy for cards and containers
- **Border Color**: `#2a2a3e` - Subtle borders between elements
- **Primary Accent**: `#4285F4` - Google Blue for interactive elements
- **Text Primary**: `#ffffff` - White for main text
- **Text Secondary**: `#a0a0b0` - Light gray for secondary text
- **Success**: `#34C759` - Green for positive actions
- **Warning**: `#FF9500` - Orange for warnings

### Content Source Colors
Each content source has its own brand color:
- Email: `#4285F4` (Google Blue)
- News: `#FF6B6B` (Coral Red)
- Substack: `#FF6719` (Substack Orange)
- RSS: `#FFA500` (Orange)
- Podcasts: `#9B59B6` (Purple)
- YouTube: `#FF0000` (YouTube Red)
- Reddit: `#FF4500` (Reddit Orange)
- Twitter: `#1DA1F2` (Twitter Blue)
- Pocket: `#EF3F56` (Pocket Pink)
- Medium: `#00AB6C` (Medium Green)

## Screen Layouts

### 1. Home Screen (Dashboard)

```
┌─────────────────────────────────────┐
│ ≡  Command Center            ⚙      │  ← Header (Dark Navy)
├─────────────────────────────────────┤
│  Welcome back!                      │
│  You have 135 unread items          │  ← User greeting
├─────────────────────────────────────┤
│                                     │
│  ┌────────┐  ┌────────┐            │
│  │  📧    │  │  📰    │            │
│  │ Email  │  │ News   │            │
│  │   12   │  │   5    │            │  ← Content source grid
│  └────────┘  └────────┘            │     (2 columns)
│                                     │
│  ┌────────┐  ┌────────┐            │
│  │  📖    │  │  📡    │            │
│  │Substack│  │  RSS   │            │
│  │   3    │  │  23    │            │
│  └────────┘  └────────┘            │
│                                     │
│  ┌────────┐  ┌────────┐            │
│  │  🎙️    │  │  ▶️     │            │
│  │Podcasts│  │YouTube │            │
│  │   8    │  │  15    │            │
│  └────────┘  └────────┘            │
│                                     │
│  [More sources...]                 │
│                                     │
└─────────────────────────────────────┘
```

**Elements:**
- Navigation header with settings icon
- User greeting with total unread count
- Grid of content source cards (2 per row)
- Each card shows:
  - Icon with brand color
  - Source name
  - Unread count badge (if > 0)
  - Short description
- Scrollable content area

### 2. Content List Screen

```
┌─────────────────────────────────────┐
│ ← Email                             │  ← Navigation header
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Weekly Newsletter - AI      ●   │  ← Unread indicator
│  │ Tech Weekly                     │
│  │ Latest developments in AI...    │
│  │ Nov 29                      →   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Meeting Reminder: Team Sync ●   │
│  │ Calendar                        │  ← Content items
│  │ Don't forget about tomorrow's...│
│  │ Nov 30                      →   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Project Update                  │  ← Read item (dimmed)
│  │ Project Manager                 │
│  │ Here's the latest update...     │
│  │ Nov 28                      →   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Elements:**
- Back button with source name
- List of content items
- Each item shows:
  - Title (bold if unread)
  - Source/author in accent color
  - Excerpt preview (2 lines max)
  - Publication date
  - Chevron for navigation
  - Blue dot for unread items
- Pull to refresh
- Infinite scroll

### 3. Content Detail Screen

```
┌─────────────────────────────────────┐
│ ← Details                           │  ← Navigation
├─────────────────────────────────────┤
│                                     │
│  Tech Weekly                        │  ← Source (accent color)
│  November 29, 2025                  │  ← Date
│                                     │
│  Weekly Newsletter -                │
│  AI Advances                        │  ← Title (large, bold)
│                                     │
│  Latest developments in artificial  │  ← Excerpt (italic)
│  intelligence and machine learning..│
│                                     │
│  ─────────────────────────────      │
│                                     │
│  This is the full content of the    │
│  article. It would display the      │  ← Content body
│  complete text, formatted nicely    │
│  for reading.                       │
│                                     │
│  Multiple paragraphs with proper    │
│  spacing and formatting...          │
│                                     │
├─────────────────────────────────────┤
│  [💾 Save] [📤 Share] [🔗 Open]     │  ← Action bar
└─────────────────────────────────────┘
```

**Elements:**
- Scrollable content area
- Source name and date at top
- Large title
- Excerpt in italics
- Full content body
- Fixed action bar at bottom:
  - Save/bookmark button
  - Share button
  - Open in external app button (primary)

### 4. Settings Screen

```
┌─────────────────────────────────────┐
│ ← Settings                          │
├─────────────────────────────────────┤
│                                     │
│  CONTENT SOURCES                    │
│  ┌─────────────────────────────┐   │
│  │ 📧 Email Accounts           → │
│  │    Manage connected accounts    │
│  ├─────────────────────────────┤   │
│  │ 📰 News Sources             → │
│  │    Configure news feeds         │
│  ├─────────────────────────────┤   │
│  │ 📡 RSS Feeds                → │
│  │    Add and manage feeds         │
│  └─────────────────────────────┘   │
│                                     │
│  PREFERENCES                        │
│  ┌─────────────────────────────┐   │
│  │ 🔔 Notifications        [●] │   │  ← Toggle switch
│  │    Get notified of new...       │
│  ├─────────────────────────────┤   │
│  │ 🌙 Dark Mode            [●] │   │
│  │    Use dark theme               │
│  ├─────────────────────────────┤   │
│  │ 🔄 Auto Refresh         [●] │   │
│  │    Automatically check...       │
│  └─────────────────────────────┘   │
│                                     │
│  [More sections...]                │
│                                     │
└─────────────────────────────────────┘
```

**Elements:**
- Grouped settings sections
- Section headers in uppercase
- Settings items with:
  - Icon
  - Title and description
  - Either chevron or toggle switch
- Rounded containers for each section

## Typography

### Font Sizes
- **Extra Large**: 24px - Screen titles, article titles
- **Large**: 18px - Section headers
- **Medium**: 16px - Body text, card titles
- **Regular**: 14px - Secondary text, descriptions
- **Small**: 12px - Metadata, timestamps
- **Tiny**: 11px - Badge text

### Font Weights
- **Bold (700)**: Titles, important text
- **Semi-bold (600)**: Card titles, active items
- **Medium (500)**: Settings items
- **Regular (400)**: Body text, descriptions

## Spacing & Layout

### Grid System
- **Screen padding**: 16px on all sides
- **Card gap**: 16px between cards
- **Internal padding**: 16px inside cards
- **Section spacing**: 24px between sections

### Card Dimensions
- **Source card width**: (Screen width - 48px) / 2
- **Source card height**: Auto (based on content)
- **Border radius**: 12-16px for cards
- **Icon container**: 64x64px on home, 40x40px in settings

### Touch Targets
- Minimum 44x44px for all interactive elements
- Cards have 16px padding
- Adequate spacing between tappable items

## Icons

### Icon Families Used
- **Material Icons**: Primary icons (email, podcasts, notifications)
- **Font Awesome**: Social media icons (YouTube, Twitter, Reddit)
- **Ionicons**: Navigation icons (chevrons, settings, open)
- **Material Community Icons**: Specialized icons (RSS, newspaper)

### Icon Sizes
- **Large**: 40px - Content source cards
- **Medium**: 24px - Settings, action buttons
- **Small**: 20px - Navigation chevrons

## Animations & Interactions

### Touch Feedback
- `activeOpacity: 0.7` on all touchable elements
- No complex animations (mockup simplicity)
- Instant navigation transitions

### Visual Feedback
- Unread items have blue dot indicator
- Badge shows unread count
- Read items appear dimmed
- Active tabs/selections highlighted

## Accessibility Considerations

### Contrast
- All text meets WCAG AA standards against dark background
- Primary text: white on dark navy (high contrast)
- Secondary text: light gray (sufficient contrast)

### Touch Targets
- All interactive elements meet 44x44px minimum
- Adequate spacing prevents accidental taps

### Text Scaling
- Font sizes use relative units
- Layout adapts to larger text sizes

## Responsive Design

### Phone Sizes
- Optimized for standard phone screens (375-430px width)
- 2-column grid for content sources
- Scrollable content areas
- Fixed action bars where appropriate

### Tablet Considerations
- Can be enhanced to show 3-4 columns on tablets
- Side-by-side navigation possible
- Current mockup focuses on phone layout

## Component Hierarchy

```
App
├── Navigation Stack
    ├── HomeScreen
    │   └── SourceCard (x10)
    ├── ContentListScreen
    │   └── ContentItem (list)
    ├── ContentDetailScreen
    │   └── ActionBar
    └── SettingsScreen
        └── SettingItem (grouped)
```

## Next Steps for Implementation

1. **Replace mock data** with real API calls
2. **Add loading states** (skeleton screens, spinners)
3. **Implement error handling** (error boundaries, retry mechanisms)
4. **Add animations** (page transitions, pull to refresh)
5. **Optimize performance** (list virtualization, image lazy loading)
6. **Add search functionality** across all content
7. **Implement filters** (by date, source, read/unread)
8. **Create onboarding flow** for first-time users
9. **Add haptic feedback** for better interaction
10. **Implement deep linking** for sharing specific content

---

This mockup provides a solid foundation for building a production-ready command center app!
