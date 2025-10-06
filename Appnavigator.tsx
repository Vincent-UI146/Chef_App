import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import { HomeScreen } from './Homescreen';
import { AddEditItemScreen } from './AddItemForm';
import { FilterScreen } from './Filterscreen';
import { RootStackParamList } from './navigation';
import { colors } from './style';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
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
            headerRight: () => null,
          }}
        />
        <Stack.Screen 
          name="AddEditItem" 
          component={AddEditItemScreen}
          options={({ route }) => ({ 
            title: route.params?.item ? 'Edit Menu Item' : 'Add Menu Item'
          })}
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
