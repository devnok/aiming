/* eslint-disable react-native/no-inline-styles */
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
import { SafeAreaView } from 'react-native-safe-area-context';

const Container = styled.ImageBackground`
  display: flex;
  flex: 1;
`;
const Content = styled.View`
  margin: 0 21%;
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container source={require('app/assets/main_black.png')}>
        <Content>
          <Logo />
          <Group center space>
            <FAB
              style={{ paddingLeft: 6 }}
              onPress={() => navigation.navigate('PhotoNavigation')}
              medium>
              <StartIcon width={56} height={42} />
            </FAB>
            <Title>the aiming</Title>
          </Group>
          <Group>
            <Button
              onPress={() => navigation.navigate('Guide')}
              text={'사용 가이드'}
              logo={<SettingIcon width={24} height={24} />}
            />
          </Group>
          <Group>
            <Button
              onPress={() => navigation.navigate('FeedBack')}
              text={'의견 보내기'}
              logo={<SendIcon width={24} height={24} />}
            />
          </Group>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default Home;
