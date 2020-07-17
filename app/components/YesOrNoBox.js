import React from 'react';
import styled from 'styled-components/native';
import AppStyles from '../config/styles';
import metrics from '../config/metrics';

const Container = styled.View`
  background-color: ${AppStyles.color.COLOR_WHITE};
  border-radius: 12px;
  border: 2px solid ${AppStyles.color.COLOR_PRIMARY};
`;
const Content = styled.Text`
  font-family: ${AppStyles.fonts.FONT_REGULAR};
  padding: 30px;
  font-size: 13px;
  color: ${AppStyles.color.COLOR_TEXT_BLACK};
  text-align: center;
`;
const ButtonList = styled.View`
  flex-direction: row;
  width: ${metrics.screenWidth * 0.75}px;
  align-items: center;
`;
const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 10px 2px;
`;
const Divider = styled.View`
  width: 1px;
  height: 18px;
  background-color: ${AppStyles.color.COLOR_DARK_SEPERATOR};
`;
const ButtonText = styled.Text`
  font-size: 12px;
  font-family: ${AppStyles.fonts.FONT_REGULAR};
  color: ${AppStyles.color.COLOR_PRIMARY};
`;

const YesOrNoBox = ({ text, okText, cancelable, onPressOK, onPressCancel }) => {
  return (
    <Container>
      <Content>{text}</Content>
      <ButtonList>
        <Button onPress={onPressOK}>
          <ButtonText>{okText}</ButtonText>
        </Button>
        <Divider />
        <Button onPress={onPressCancel}>
          <ButtonText>{okText} 안 함</ButtonText>
        </Button>
        <Divider />
        {cancelable && (
          <Button onPress={onPressCancel}>
            <ButtonText>취소</ButtonText>
          </Button>
        )}
      </ButtonList>
    </Container>
  )
}

export default YesOrNoBox;
