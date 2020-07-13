import React from 'react';
import styled from 'styled-components/native';
import AppStyles from '../../config/styles';

const Container = styled.TouchableOpacity`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.bgColor || AppStyles.color.COLOR_TEXT_BLACK};
  border-radius: 200px;
`;

const Button = ({
  bgColor,
  style,
  children,
  large = false,
  medium = false,
  small = false,
  size: sizeProp,
  onPress = () => { },
}) => {
  const len = large ? 144 : medium ? 96 : small ? 48 : 24;
  const size = sizeProp || {
    width: len,
    height: len,
  };
  return (
    <Container onPress={onPress} style={style} {...size} bgColor={bgColor}>
      {children}
    </Container>
  );
}

export default Button;
