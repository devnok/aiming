import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import FAB from '../../components/Forms/FAB.js';
import AppStyles from '../../config/styles.js';

import GalleryIcon from 'app/assets/gallery.svg';
import AimIcon from 'app/assets/aim.svg';
import RotateIcon from 'app/assets/rotate.svg';
import { RNCamera } from 'react-native-camera';
import ZoomView from '../../components/ZoomView.js';
import ImagePicker from 'react-native-image-picker';

const Container = styled.View`
  flex: 1;
  padding-bottom: 68px;
`;
const Bottom = styled.View`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
  background-color: ${AppStyles.color.COLOR_PLACEHOLDER};
`;
const cameraStyle = {
  flex: 1,
};
const options = {
  mediaType: 'image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const TakePhoto = ({ navigation }) => {
  const [zoom, setZoom] = useState(0);
  const [isCameraBack, setIsCameraBack] = useState(true);
  const camera = useRef(null);
  const takePicture = async () => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.current.takePictureAsync(options);
    navigation.navigate('EditPhoto', { source: data.uri });
  };
  const onZoomProgress = p => {
    setZoom(p);
  };
  const getPictureFromGallery = () => {
    ImagePicker.launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        navigation.navigate('EditPhoto', { source: res.uri });
      }
    });
  }
  return (
    <Container>
      <ZoomView
        onZoomProgress={onZoomProgress}
        onZoomStart={() => {
          console.log('zoom start');
        }}
        onZoomEnd={() => {
          console.log('zoom end');
        }}>
        <RNCamera
          zoom={zoom}
          ref={camera}
          style={cameraStyle}
          type={
            isCameraBack
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
      </ZoomView>
      <Bottom>
        <FAB small onPress={getPictureFromGallery}>
          <GalleryIcon width={36} height={30} />
        </FAB>
        <FAB small onPress={takePicture}>
          <AimIcon width={48} height={48} />
        </FAB>
        <FAB small onPress={() => setIsCameraBack(!isCameraBack)}>
          <RotateIcon width={40} height={48} />
        </FAB>
      </Bottom>
    </Container>
  );
};

export default TakePhoto;
