import React, { useState, useRef, useCallback, useEffect } from 'react';
import Svg, { Rect } from 'react-native-svg';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import AppStyles from '../config/styles';
import styled from 'styled-components/native';
import metrics from '../config/metrics';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import * as CanvasActions from '../actions/CanvasActions';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import Overlay from './Overlay.js';
import Loading from './Loading';
import { Portal } from 'react-native-paper';
import HeaderRight from './HeaderRight';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;
const ContentContainer = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${AppStyles.color.COLOR_BLACK};
  flex-direction: row;
`;
const Content = styled(Video)`
  position: absolute;
  align-self: center;
`;
const Canvas = ({ selectEnabled, eraseEnabled }) => {
  const { source: sourceParam, codec } = useRoute().params;
  const dispatch = useDispatch();
  const [layout, setLayout] = useState({
    width: metrics.screenWidth,
    height: metrics.screenHeight,
  });
  const [screenLayout, setScreenLayout] = useState({
    width: metrics.screenWidth,
    height: metrics.screenHeight,
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleGestureEvent = ({ nativeEvent: ne }) => {
    if (selectEnabled) {
      setWidth(ne.translationX);
      setHeight(ne.translationY);
    }
    if (eraseEnabled) {
      const x1 = Math.min(x, x + width);
      const x2 = Math.max(x, x + width);
      const y1 = Math.min(y, y + height);
      const y2 = Math.max(y, y + height);

      if (x1 < ne.x && y1 < ne.y && ne.x < x2 && ne.y < y2) {
        eraseSelected();
      }
    }
  };
  const eraseSelected = () => {
    dispatch(CanvasActions.eraseBox());
    setWidth(0);
    setHeight(0);
  };
  const handleHandlerStateChange = ({ nativeEvent: ne }) => {
    if (ne.state === State.BEGAN && selectEnabled) {
      setX(ne.x);
      setY(ne.y);
      setWidth(0);
      setHeight(0);
      setIsDrawing(true);
    }
    if (ne.state === State.END && selectEnabled) {
      const x1 = Math.min(x, x + width);
      const x2 = Math.max(x, x + width);
      const y1 = Math.min(y, y + height);
      const y2 = Math.max(y, y + height);
      setIsDrawing(false);

      dispatch(
        CanvasActions.selectBox({ x1, y1, x2, y2, screen: screenLayout }),
      );
    }
    return null;
  };
  const video = useRef(null);
  const [paused, setPaused] = useState(false);

  const isLoading = useSelector(state => state.canvasReducer.isLoading);
  const source = useSelector(state => state.canvasReducer.source);

  const box = useSelector(state => state.canvasReducer.current.box);
  const checkBox = () => box && box.x1 && box.x2 && box.y1 && box.y2;
  useFocusEffect(
    useCallback(() => {
      dispatch(CanvasActions.clear());
    }, [dispatch]),
  );
  useEffect(() => {
    if (!video.current) return;
  }, [isDrawing]);
  return (
    <>
      <Portal>
        <HeaderRight source={source} codec={codec} layout={layout} />
      </Portal>
      {isLoading === true && (
        <Overlay>
          <Loading text={'AI가 마스킹된 오브젝트를 처리하고 있습니다.'} />
        </Overlay>
      )}
      <PanGestureHandler
        maxPointers={1}
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleHandlerStateChange}>
        <Container>
          <ContentContainer>
            {source && (
              <Content
                onLoad={e => {
                  setLayout(e.naturalSize);
                  setPaused(true);
                  video.current.seek(0);
                }}
                repeat={true}
                ref={video}
                source={{ uri: source }}
                paused={paused}
                resizeMode="contain"
                style={{
                  width: metrics.screenWidth,
                  height: (metrics.screenWidth / layout.width) * layout.height,
                }}
              />
            )}
          </ContentContainer>
          <Svg
            height="100%"
            width="100%"
            onLayout={e => setScreenLayout(e.nativeEvent.layout)}>
            {isDrawing && (
              <Rect
                onPress={() => eraseEnabled && eraseSelected()}
                x={x}
                y={y}
                width={width}
                height={height}
                strokeDasharray={[5, 5]}
                strokeWidth={2}
                stroke={AppStyles.color.COLOR_PRIMARY}
              />
            )}
            {checkBox() && !isDrawing && (
              <Rect
                onPress={() => eraseEnabled && eraseSelected()}
                x={box.x1}
                y={box.y1}
                width={box.x2 - box.x1}
                height={box.y2 - box.y1}
                strokeDasharray={[5, 5]}
                strokeWidth={2}
                stroke={AppStyles.color.COLOR_PRIMARY}
              />
            )}
          </Svg>
        </Container>
      </PanGestureHandler>
    </>
  );
};

export default Canvas;
