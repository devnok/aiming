import React from 'react';
import styled from 'styled-components/native';

const Logo = styled.Image`
  position: absolute;
  width: 28px;
  resize-mode: contain;
  top: 0px;
  align-self: center;
`;

export default ({ style }) => (
  <Logo style={style} source={require('app/assets/logo.png')} />
);
