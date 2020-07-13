import React from 'react';
import styled from 'styled-components/native';
import FAB from '../../components/Forms/FAB.js';
import AppStyles from '../../config/styles.js';

import PaintButton from 'app/assets/paint_button.svg';
import EraseButton from 'app/assets/erase_button.svg';
import SelectButton from 'app/assets/select_button.svg';
import MagicButton from 'app/assets/magic_button.svg';
import RotateCW from 'app/assets/rotate_cw.svg';
import RotateCCW from 'app/assets/rotate_ccw.svg';
import GalleryIcon from 'app/assets/gallery.svg';
import CameraIcon from 'app/assets/camera.svg';
import { useRoute } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
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
const Image = styled.Image`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;
const FABSize = {
  width: 56,
  height: 56,
};

const TakePhoto = () => {
  const {
    source = 'http://via.placeholder.com/360x640.png?text=NO%82IMAGE',
  } = useRoute().params;
  return (
    <Container>
      <FABGroup>
        <FAB size={FABSize} bgColor={AppStyles.color.COLOR_PRIMARY}>
          <CameraIcon width={32} height={28} />
        </FAB>
        <FAB size={FABSize} bgColor={AppStyles.color.COLOR_SECONDARY}>
          <GalleryIcon width={32} />
        </FAB>
      </FABGroup>
      <Image
        source={{
          uri: source,
        }}
      />
      <Bottom>
        <FAB small>
          <PaintButton width={53} height={53} />
        </FAB>
        <FAB small>
          <EraseButton width={44} height={44} />
        </FAB>
        <RotateList>
          <FAB tiny>
            <RotateCCW width={24} height={20} />
          </FAB>
          <FAB tiny>
            <RotateCW width={24} height={20} />
          </FAB>
        </RotateList>
        <FAB small>
          <SelectButton width={44} height={44} />
        </FAB>
        <FAB small>
          <MagicButton width={44} height={44} />
        </FAB>
      </Bottom>
    </Container>
  );
};

export default TakePhoto;
