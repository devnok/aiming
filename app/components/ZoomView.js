import React from 'react';
import styled from 'styled-components/native';
import { PanResponder, View } from 'react-native';
import metrics from '../config/metrics';

const containerStyle = {
  width: '100%',
  height: metrics.screenHeight - 68,
  backgroundColor: 'yellow',
};
const ZoomView = ({ children, onZoomProgress, onZoomEnd, onZoomStart }) => {
  const _panResponder = PanResponder.create({
    onPanResponderMove: (_, { dy }) =>
      onZoomProgress(
        Math.min(Math.max((dy * -1) / metrics.screenHeight, 0), 0.5),
      ),
    onMoveShouldSetPanResponder: (_, { dx }) => dx !== 0,
    onPanResponderGrant: onZoomStart,
    onPanResponderRelease: onZoomEnd,
  });
  return (
    <View style={containerStyle} {..._panResponder.panHandlers}>
      {children}
    </View>
  );
};

export default ZoomView;
