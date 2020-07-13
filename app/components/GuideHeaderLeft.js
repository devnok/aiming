import React from 'react';
import styled from 'styled-components/native';
import ArrowBackIcon from 'app/assets/arrow_back.svg';
import { useNavigation } from '@react-navigation/native';

const Container = styled.TouchableOpacity`
  left: 24px;
  width: 36px;
  height: 36px;
  justify-content: center;
`;

const GuideHeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate('Home')}>
      <ArrowBackIcon width={12} height={9.6} />
    </Container>
  );
};

export default GuideHeaderLeft;
