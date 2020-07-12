import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import Home from 'app/screens/Home';
import ThemeController from '../components/ThemeController';
import { StatusBar } from 'react-native';
import PhotoNavigation from './PhotoNavigation';

const Stack = createStackNavigator();

function App(props) {
  const { theme } = props;

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={theme.dark ? 'dark-content' : 'dark-content'} />

      <Stack.Navigator headerMode="none" mode="modal">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
