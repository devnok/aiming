import React, { useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Portal, overlay } from 'react-native-paper';
import AppStyles from '../config/styles';
import { Animated, Easing } from 'react-native';

export default ({ children, visible = true }) => {
  const overlayStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };
  const opacity = useRef(new Animated.Value(0)).current;
  const bgColor = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)'],
  });
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      useNativeDriver: false,
      duration: 200,
      easing: Easing.in,
    }).start();
  }, [opacity, visible]);
  return (
    <Portal>
      <Animated.View
        style={[overlayStyle, { backgroundColor: bgColor }]}
        transition="background-color"
        visible={visible}>
        {visible && children}
      </Animated.View>
    </Portal>
  );
}
