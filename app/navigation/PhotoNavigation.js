import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TakePhoto from '../screens/Photo/TakePhoto';
import AppStyles from '../config/styles';
import Logo from '../components/Logo';
import CloseButton from '../components/CloseButton';

const Stack = createStackNavigator();

const logoStyle = {
  position: 'relative',
};
const PhotoNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: AppStyles.color.COLOR_BLACK,
        },
        headerLeft: () => <CloseButton />,
        headerTitle: () => <Logo style={logoStyle} />,
      }}>
      <Stack.Screen name="TakePhoto" component={TakePhoto} />
    </Stack.Navigator>
  );
}

export default PhotoNavigation;
