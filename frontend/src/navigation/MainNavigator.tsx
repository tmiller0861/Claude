import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/FeedScreen';
import SavedScreen from '../screens/SavedScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: true,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'Content Feed',
          tabBarIcon: ({ color }) => <TabIcon name="📰" color={color} />,
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          title: 'Saved Items',
          tabBarIcon: ({ color }) => <TabIcon name="★" color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabIcon name="⚙" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

interface TabIconProps {
  name: string;
  color: string;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color }) => {
  return (
    <Text style={{ fontSize: 24, color }}>
      {name}
    </Text>
  );
};

export default MainNavigator;
