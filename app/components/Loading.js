import React from 'react';
import styled from 'styled-components/native';
import AppStyles from '../config/styles';

const Loader = styled.ActivityIndicator`
`;
const Text = styled.Text`
  width: 50%;
  text-align: center;
  font-size: 14px;
  line-height: 21px;
  color: ${AppStyles.color.COLOR_WHITE};
  font-family: ${AppStyles.fonts.FONT_REGULAR};
  margin-bottom: 20px;
`;

const Loading = ({ text }) => {
  return (
    <>
      <Text>{text}</Text>
      <Loader color={AppStyles.color.COLOR_PRIMARY} size="large" />
    </>
  );
};

export default Loading;
