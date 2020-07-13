import React from 'react';
import styled from 'styled-components/native';
import metrics from '../../config/metrics';

const Container = styled.View`
  margin-bottom: ${props =>
    props.space ? 112.6 : (metrics.screenRatio - 0.5) * 28}px;
`;

const Group = ({ style, children, center = false, space = false }) => (
  <Container
    space={space}
    style={
      (style,
        center
          ? {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }
          : {})
    }>
    {children}
  </Container>
);

export default Group;
