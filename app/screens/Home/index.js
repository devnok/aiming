import React from 'react';
import styled from 'styled-components/native';
import AppStyles from '../../config/styles';
import Button from '../../components/Forms/Button';
import Group from '../../components/Forms/Group';
import FAB from '../../components/Forms/FAB';
import SettingIcon from 'app/assets/setting.svg';
import SendIcon from 'app/assets/send_message.svg';
import StartIcon from 'app/assets/video_download.svg';
import Logo from '../../components/Logo';

const Container = styled.ImageBackground`
  display: flex;
  flex: 1;
`;
const Content = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
`;
const Title = styled.Text`
  font-family: ${AppStyles.fonts.FONT_BOLD};
  font-size: 15px;
  color: ${AppStyles.color.COLOR_WHITE};
  margin-top: 13.3px;
  text-transform: uppercase;
`;
const Home = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('PhotoNavigation');
  };
  return (
    <Container source={require('app/assets/main_black.png')}>
      <Content>
        <Logo />
        <Group center space>
          <FAB style={{ paddingLeft: 6 }} onPress={handlePress}>
            <StartIcon width={56} height={42} />
          </FAB>
          <Title>the aiming</Title>
        </Group>
        <Group>
          <Button
            text={'사용 가이드'}
            logo={<SettingIcon width={24} height={24} />}
          />
        </Group>
        <Group>
          <Button
            text={'의견 보내기'}
            logo={<SendIcon width={24} height={24} />}
          />
        </Group>
      </Content>
    </Container>
  );
};

export default Home;
