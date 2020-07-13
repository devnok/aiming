import React from 'react';
import styled from 'styled-components/native';
import DownloadIcon from 'app/assets/download.svg';
import CheckIcon from 'app/assets/check.svg';
import FAB from './Forms/FAB';
import AppStyles from '../config/styles';

const Container = styled.View`
  flex-direction: row;
`;
const Divider = styled.View`
  width: 28px;
`;
const HeaderRight = () => {
  return (
    <Container>
      <FAB bgColor={AppStyles.color.COLOR_BLACK}>
        <DownloadIcon width={15} height={15} />
      </FAB>
      <Divider />
      <FAB bgColor={AppStyles.color.COLOR_BLACK}>
        <CheckIcon width={15} height={15} />
      </FAB>
    </Container>
  );
};

export default HeaderRight;
