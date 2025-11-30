import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import ContentListScreen from './src/screens/ContentListScreen';
import ContentDetailScreen from './src/screens/ContentDetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1a1a2e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Command Center' }}
          />
          <Stack.Screen
            name="ContentList"
            component={ContentListScreen}
            options={({ route }) => ({ title: route.params.sourceName })}
          />
          <Stack.Screen
            name="ContentDetail"
            component={ContentDetailScreen}
            options={{ title: 'Details' }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
