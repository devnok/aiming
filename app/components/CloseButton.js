import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import AppStyles from '../config/styles';
import { useNavigation } from '@react-navigation/native';

const Container = styled.TouchableOpacity`
  padding-left: 24px;
`;

const CloseButton = () => {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate('Home')}>
      <Icon name="ios-close" size={32} color={AppStyles.color.COLOR_WHITE} />
    </Container>
  );
};

export default CloseButton;
