import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import FAB from '../../components/Forms/FAB.js';
import AppStyles from '../../config/styles.js';

import GalleryIcon from 'app/assets/gallery.svg';
import AimIcon from 'app/assets/aim.svg';
import AimActiveIcon from 'app/assets/aim_active.svg';
import RotateIcon from 'app/assets/rotate.svg';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';

const BACK_TYPE = RNCamera.Constants.Type.back;
const FRONT_TYPE = RNCamera.Constants.Type.front;

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
const Timer = styled.Text`
  position: absolute;
  align-self: center;
  font-size: 15px;
  color: ${AppStyles.color.COLOR_WHITE};
  bottom: 10px;
`;
const cameraStyle = {
  flex: 1,
};
const options = {
  mediaType: 'video',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const getVideoFromGallery = navigation => {
  ImagePicker.launchImageLibrary(options, res => {
    if (res.didCancel) {
      console.log('User cancelled image picker');
    } else if (res.error) {
      console.log('ImagePicker Error: ', res.error);
    } else {
      navigation.navigate('EditPhoto', {
        source: res.uri,
        codec: res.codec || 'mp4',
      });
    }
  });
};

const RecordPhoto = ({ navigation }) => {
  const timer = useRef(null);
  const [time, setTime] = useState(0);
  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(() => {
      const t = time + 1;
      setTime(t);
    }, 1000);
  };

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  };
  const [isCameraBack, setIsCameraBack] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const camera = useRef(null);
  const onRecordingStart = () => {
    stopTimer();
    if (isRecording) {
    }
  };
  const onRecordingEnd = () => {
    stopTimer();
    setIsRecording(false);
  };
  const takeVideo = async () => {
    const recordOptions = {
      mute: true,
      maxDuration: 60,
      quality: RNCamera.Constants.VideoQuality['1080p'],
    };
    if (camera.current && !isRecording) {
      try {
        const promise = camera.current.recordAsync(recordOptions);
        if (promise) {
          setTimeout(() => {
            startTimer();
            setIsRecording(true);
          });
          const data = await promise;
          console.log(data);
          navigation.navigate('EditPhoto', {
            source: data.uri,
            codec: data.codec || 'mp4',
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  const stopVideo = () => {
    if (camera.current && isRecording) {
      camera.current.stopRecording();
    }
  };
  return (
    <Container>
      <RNCamera
        onLayout={e => console.log(e.nativeEvent.layout)}
        ref={camera}
        style={cameraStyle}
        type={isCameraBack ? BACK_TYPE : FRONT_TYPE}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        onRecordingStart={onRecordingStart}
        onRecordingEnd={onRecordingEnd}
        defaultVideoQuality={RNCamera.Constants.VideoQuality['720p']}
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
      <Bottom>
        <FAB small onPress={() => getVideoFromGallery(navigation)}>
          <GalleryIcon width={36} height={30} />
        </FAB>
        <FAB small onPress={isRecording ? stopVideo : takeVideo}>
          {isRecording ? (
            <AimActiveIcon width={48} height={48} />
          ) : (
              <AimIcon width={48} height={48} />
            )}
        </FAB>
        <FAB small onPress={() => setIsCameraBack(!isCameraBack)}>
          <RotateIcon width={40} height={48} />
        </FAB>
      </Bottom>
    </Container>
  );
};

export default RecordPhoto;
