import React from 'react';
import styled from 'styled-components/native';
import FAB from '../../components/Forms/FAB.js';
import AppStyles from '../../config/styles.js';

import GalleryIcon from 'app/assets/gallery.svg';
import AimIcon from 'app/assets/aim.svg';
import RotateIcon from 'app/assets/rotate.svg';

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
const TakePhoto = () => {
  return (
    <Container>
      <Bottom>
        <FAB small>
          <GalleryIcon width={36} height={30} />
        </FAB>
        <FAB small>
          <AimIcon width={48} height={48} />
        </FAB>
        <FAB small>
          <RotateIcon width={40} height={48} />
        </FAB>
      </Bottom>
    </Container>
  );
};

export default TakePhoto;
