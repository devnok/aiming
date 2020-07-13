import React from 'react';
import styled from 'styled-components/native';
import AppStyles from '../../config/styles';

const Container = styled.TouchableOpacity`
  padding: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.bgColor || AppStyles.color.COLOR_TEXT_BLACK};
  border-radius: 50px;
`;
const Text = styled.Text`
  color: ${props => props.color || AppStyles.color.COLOR_WHITE};
  font-size: 12px;
  font-family: ${AppStyles.fonts.FONT_BOLD};
`;
const LogoContainer = styled.View`
  position: absolute;
  left: 24px;
`;

const Button = ({ text, bgColor, color, logo, onPress }) => (
  <Container bgColor={bgColor} onPress={onPress}>
    {logo && <LogoContainer>{logo}</LogoContainer>}
    <Text color={color}>{text}</Text>
  </Container>
);

export default Button;
