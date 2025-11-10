import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './Homescreen';
import { ManageMenuScreen } from './ManageMenuScreen';
import { FilterScreen } from './Filterscreen';
import { RootStackParamList } from './types';
import { colors } from './style';

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'Back',
          cardStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: "Chef's Menu",
          }}
        />
        <Stack.Screen 
          name="ManageMenu" 
          component={ManageMenuScreen}
          options={{
            title: 'Manage Menu',
          }}
        />
        <Stack.Screen 
          name="Filter" 
          component={FilterScreen}
          options={{
            title: 'Filter Menu',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};