import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import Home from 'app/screens/Home';
import { StatusBar } from 'react-native';
import PhotoNavigation from './PhotoNavigation';
import AppStyles from '../config/styles';
import CloseButton from '../components/CloseButton';
import GuideHeaderLeft from '../components/GuideHeaderLeft';
import Logo from '../components/Logo';
import FeedBack from '../screens/FeedBack';
import Guide from '../screens/Guide';

const Stack = createStackNavigator();

function App(props) {
  const { theme } = props;

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={theme.dark ? 'dark-content' : 'dark-content'} />

      <Stack.Navigator
        headerMode="screen"
        mode="modal"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
        <Stack.Screen
          name="FeedBack"
          component={FeedBack}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerLeft: () => <CloseButton />,
            headerTitle: () => (
              // eslint-disable-next-line react-native/no-inline-styles
              <Logo style={{ position: 'relative', top: 0 }} />
            ),
          }}
        />
        <Stack.Screen
          name="Guide"
          component={Guide}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerLeft: () => <GuideHeaderLeft />,
            headerTitleStyle: {
              fontFamily: AppStyles.fonts.FONT_BOLD,
              color: AppStyles.color.COLOR_PRIMARY,
              fontSize: 8.4,
            },
            headerTitle: 'How to use The Aiming?',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
