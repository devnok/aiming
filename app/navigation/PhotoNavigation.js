import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditPhoto from '../screens/Photo/EditPhoto';
import AppStyles from '../config/styles';
import Logo from '../components/Logo';
import CloseButton from '../components/CloseButton';
import RecordPhoto from '../screens/Photo/RecordPhoto';

const Stack = createStackNavigator();

const logoStyle = {
  position: 'relative',
  top: 0,
};
const PhotoNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: AppStyles.color.COLOR_BLACK,
        },
        headerLeft: () => <CloseButton />,
        headerTitle: () => <Logo style={logoStyle} />,
        headerTitleAlign: 'center',
      }}>
      {/* <Stack.Screen name="TakePhoto" component={TakePhoto} /> */}
      <Stack.Screen name="RecordPhoto" component={RecordPhoto} />
      <Stack.Screen name="EditPhoto" component={EditPhoto} />
    </Stack.Navigator>
  );
};
export default PhotoNavigation;
