import React from 'react';
import styled from 'styled-components/native';
import DownloadIcon from 'app/assets/download.svg';
import CheckIcon from 'app/assets/check.svg';
import FAB from './Forms/FAB';
import AppStyles from '../config/styles';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import * as CanvasActions from '../actions/CanvasActions';

const Container = styled.View`
  flex-direction: row;
`;
const Divider = styled.View`
  width: 28px;
`;
const HeaderRight = () => {
  const { source, codec } = useRoute().params;
  console.log('codec', codec);
  const dispatch = useDispatch();
  const handleErase = () => {
    const now = new Date().getTime();
    dispatch(
      CanvasActions.uploadVideo({
        name: now + '.' + codec,
        type: `video/${codec}`,
        uri: source,
      }),
    );
  };
  return (
    <Container>
      <FAB bgColor={AppStyles.color.COLOR_BLACK}>
        <DownloadIcon width={15} height={15} />
      </FAB>
      <Divider />
      <FAB bgColor={AppStyles.color.COLOR_BLACK} onPress={handleErase}>
        <CheckIcon width={15} height={15} />
      </FAB>
    </Container>
  );
};

export default HeaderRight;
