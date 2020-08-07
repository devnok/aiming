import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import FAB from '../../components/Forms/FAB.js';
import AppStyles from '../../config/styles.js';
import { useFocusEffect } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import Canvas from '../../components/Canvas.js';
import Overlay from '../../components/Overlay.js';
import YesOrNoBox from '../../components/YesOrNoBox.js';
import { useSelector, useDispatch } from 'react-redux';
import { BackHandler } from 'react-native';

import PaintButton from 'app/assets/edit/paint.svg';
import EraseButton from 'app/assets/edit/erase.svg';
import SelectButton from 'app/assets/edit/select.svg';
import MagicButton from 'app/assets/edit/magic.svg';
import PaintSelectedButton from 'app/assets/edit/paint_selected.svg';
import EraseSelectedButton from 'app/assets/edit/erase_selected.svg';
import SelectSelectedButton from 'app/assets/edit/select_selected.svg';
import MagicSelectedButton from 'app/assets/edit/magic_selected.svg';
import RotateCW from 'app/assets/rotate_cw.svg';
import RotateCCW from 'app/assets/rotate_ccw.svg';
import GalleryIcon from 'app/assets/gallery.svg';
import CameraIcon from 'app/assets/camera.svg';

import * as CanvasActions from '../../actions/CanvasActions';
import { getVideoFromGallery } from './RecordPhoto';

const Container = styled.View`
  flex: 1;
`;
const Bottom = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
  background-color: ${AppStyles.color.COLOR_PLACEHOLDER};
`;
const RotateList = styled.View`
  flex-direction: row;
  width: 68px;
  justify-content: space-between;
`;
const FABGroup = styled.View`
  position: absolute;
  bottom: 84px;
  right: 20px;
  height: 120px;
  justify-content: space-between;
`;
const Bar = styled(Snackbar)`
  bottom: 90px;
  margin: 0;
  width: 168px;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex: 1;
  border-radius: 20px;
  elevation: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const BarText = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
`;
const FABSize = {
  width: 56,
  height: 56,
};

const EditPhoto = ({ navigation }) => {
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const handleDismissSnackBar = () => setSnackBarVisible(false);
  const noService = () => {
    setSnackBarVisible(true);
    setTimeout(handleDismissSnackBar, Snackbar.DURATION_SHORT);
  };
  const [selectEnabled, setSelectEnabled] = useState(false);
  const [eraseEnabled, setEraseEnabled] = useState(false);
  const handleMaskToggle = noService;
  const handleEraseToggle = () => {
    handleDismissSnackBar();
    setSelectEnabled(false);
    setEraseEnabled(!eraseEnabled);
  };
  const handleSelectToggle = () => {
    handleDismissSnackBar();
    setEraseEnabled(false);
    setSelectEnabled(!selectEnabled);
  };
  const handleMagicToggle = noService;

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);
  const openModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const isChanged = useSelector(state => state.canvasReducer.isChanged);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (modalVisible) {
          closeModal();
          return true;
        }
        if (isChanged) {
          openModal();
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isChanged, openModal, modalVisible]),
  );
  const dispatch = useDispatch();
  const unDo = () => {
    dispatch(CanvasActions.undo());
  };
  const reDo = () => {
    dispatch(CanvasActions.redo());
  };

  return (
    <Container>
      {modalVisible && (
        <Overlay>
          <YesOrNoBox
            cancelable
            onPressCancel={closeModal}
            text={'변경 사항을 저장할까요?'}
            okText={'수정'}
          />
        </Overlay>
      )}
      <Canvas selectEnabled={selectEnabled} eraseEnabled={eraseEnabled} />
      <FABGroup>
        <FAB
          size={FABSize}
          bgColor={AppStyles.color.COLOR_PRIMARY}
          onPress={() => navigation.navigate('RecordPhoto')}>
          <CameraIcon width={32} height={28} />
        </FAB>
        <FAB
          size={FABSize}
          bgColor={AppStyles.color.COLOR_SECONDARY}
          onPress={() => getVideoFromGallery(navigation)}>
          <GalleryIcon width={32} />
        </FAB>
      </FABGroup>
      <Bottom>
        <FAB small onPress={handleMaskToggle}>
          <PaintButton width={44} height={44} />
        </FAB>
        <FAB small onPress={handleEraseToggle}>
          {eraseEnabled ? (
            <EraseSelectedButton width={53} heightt={53} />
          ) : (
              <EraseButton width={44} height={44} />
            )}
        </FAB>
        <RotateList>
          <FAB tiny onPress={unDo}>
            <RotateCCW width={24} height={20} />
          </FAB>
          <FAB tiny onPress={reDo}>
            <RotateCW width={24} height={20} />
          </FAB>
        </RotateList>
        <FAB small onPress={handleSelectToggle}>
          {selectEnabled ? (
            <SelectSelectedButton width={53} heightt={53} />
          ) : (
              <SelectButton width={44} height={44} />
            )}
        </FAB>
        <FAB small onPress={handleMagicToggle}>
          <MagicButton width={44} height={44} />
        </FAB>
      </Bottom>
      <Bar visible={snackBarVisible} onDismiss={handleDismissSnackBar}>
        <BarText>서비스 예정입니다</BarText>
      </Bar>
    </Container>
  );
};

export default EditPhoto;
