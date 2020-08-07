import React from 'react';
import styled from 'styled-components/native';
import DownloadIcon from 'app/assets/download.svg';
import CheckIcon from 'app/assets/check.svg';
import FAB from './Forms/FAB';
import AppStyles from '../config/styles';
import { useDispatch } from 'react-redux';
import * as CanvasActions from '../actions/CanvasActions';

const Container = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
  padding-top: 20px;
`;
const Divider = styled.View`
  width: 28px;
`;
const HeaderRight = ({ source, codec, layout }) => {
  const dispatch = useDispatch();
  const handleErase = () => {
    if (!codec) {
      console.warn('codec not defined!');
      return;
    }
    const now = new Date().getTime();
    dispatch(
      CanvasActions.uploadVideo({
        name: now + '.' + codec,
        type: `video/${codec}`,
        uri: source,
        size: layout,
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
