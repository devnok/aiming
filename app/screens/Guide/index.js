import React from 'react';
import Slick from 'react-native-slick';
import styled from 'styled-components/native';
import AppStyles from '../../config/styles';
import AutoHeightImage from 'react-native-auto-height-image';
import metrics from '../../config/metrics';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${AppStyles.color.COLOR_WHITE};
`;
const Title = styled.Text`
  font-size: 20px;
  font-family: ${AppStyles.fonts.FONT_BOLD};
  margin-bottom: 20px;
`;
const Descriptiton = styled.Text`
  font-size: 13.3px;
  font-family: ${AppStyles.fonts.FONT_REGULAR};
  text-align: center;
  margin-bottom: 24px;
  line-height: 20px;
`;
const Pagination = styled.View`
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  margin-bottom: 32px;
`;
const PaginationText = styled.Text`
  font-size: 20px;
  color: ${AppStyles.color.COLOR_WHITE};
  font-family: ${AppStyles.fonts.FONT_BOLD};
`;
const PaginationBehind = styled.Text`
  position: absolute;
  border-radius: 4.4px;
  width: 29px;
  height: 29px;
  background-color: #008ee5;
  left: 13px;
  top: -4px;
`;
const PaginationFront = styled.Text`
  position: absolute;
  border-radius: 4.4px;
  width: 38px;
  height: 38px;
  background-color: ${AppStyles.color.COLOR_BLACK};
`;

const Guide = () => (
  <Slick activeDotColor={AppStyles.color.COLOR_PRIMARY} loop={false}>
    <Container>
      <Title>마스킹 작업화면</Title>
      <Descriptiton>
        {
          '다양한 도구를 활용해 마스킹 할 영역을 선택하고\n저장하면 AI 작업이 완료된 화면을 확인 할 수 있습니다.'
        }
      </Descriptiton>
      <AutoHeightImage
        width={metrics.screenWidth * 0.55}
        source={require('app/assets/guide/guide00.png')}
      />
    </Container>
    <Container>
      <Pagination>
        <PaginationBehind />
        <PaginationFront />
        <PaginationText>01</PaginationText>
      </Pagination>
      <AutoHeightImage
        width={metrics.screenWidth * 0.85}
        source={require('app/assets/guide/guide01.png')}
      />
    </Container>
    <Container>
      <Pagination>
        <PaginationBehind />
        <PaginationFront />
        <PaginationText>02</PaginationText>
      </Pagination>
      <AutoHeightImage
        width={metrics.screenWidth * 0.85}
        source={require('app/assets/guide/guide02.png')}
      />
    </Container>
    <Container>
      <Pagination style={{ marginBottom: 7 }}>
        <PaginationBehind />
        <PaginationFront />
        <PaginationText>03</PaginationText>
      </Pagination>
      <AutoHeightImage
        width={metrics.screenWidth * 0.77}
        source={require('app/assets/guide/guide03.jpeg')}
      />
    </Container>
  </Slick>
);

export default Guide;
