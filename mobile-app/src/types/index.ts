export interface ContentSource {
  id: string;
  name: string;
  icon: string;
  iconFamily: 'MaterialIcons' | 'FontAwesome' | 'Ionicons' | 'MaterialCommunityIcons';
  color: string;
  unreadCount?: number;
  lastUpdated?: Date;
  description: string;
}

export interface ContentItem {
  id: string;
  title: string;
  source: string;
  url?: string;
  excerpt?: string;
  thumbnail?: string;
  publishedDate?: Date;
  isRead?: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  ContentList: { sourceId: string; sourceName: string };
  ContentDetail: { item: ContentItem };
  Settings: undefined;
};
