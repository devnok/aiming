import React from 'react';
import styled from 'styled-components/native';
import DownloadIcon from 'app/assets/download.svg';
import CheckIcon from 'app/assets/check.svg';
import FAB from './Forms/FAB';
import AppStyles from '../config/styles';
import { useDispatch } from 'react-redux';
import * as CanvasActions from '../actions/CanvasActions';
import RNFetchBlob from 'rn-fetch-blob';
import { baseURL } from '../api';

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
  const handleDownlaod = () => {
    const dirs = RNFetchBlob.fs.dirs;
    const sources = source.split('/');
    const filename = sources[sources.length - 1];
    RNFetchBlob.config({
      path: dirs.DCIMDir + '/' + filename,
      addAndroidDownloads: {
        notification: true,
        title: '다운로드가 완료되었습니다.',
        description: filename,
        mime: `video/${codec}`,
        mediaScannable: true,
      },
    })
      .fetch('GET', baseURL + '/output/' + filename)
      .then(res => {
        RNFetchBlob.android.actionViewIntent(
          res.path(),
          'application/vnd.android.package-archive',
        );
      });
  }
  return (
    <Container>
      <FAB bgColor={AppStyles.color.COLOR_BLACK} onPress={handleDownlaod}>
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
