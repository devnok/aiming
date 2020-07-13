import React, { useState } from 'react';
import Background from 'app/assets/feed_bg.svg';
import styled from 'styled-components/native';
import metrics from '../../config/metrics';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppStyles from '../../config/styles';
import Group from '../../components/Forms/Group';
import RNPickerSelect from 'react-native-picker-select';
import { Keyboard } from 'react-native';

import MessageIcon from 'app/assets/send_message_outline.svg';
import ArrowDownIcon from 'app/assets/arrow_down.svg';

const DismissZone = styled.TouchableWithoutFeedback`
  flex: 1;
`;
const Container = styled.View`
  flex: 1;
  padding: 0 10%;
  padding-top: 10%;
  justify-content: center;
`;
const TextArea = styled.TextInput`
  border-radius: 18px;
  background-color: ${AppStyles.color.COLOR_WHITE};
  width: 100%;
  text-align-vertical: top;
  min-height: 300px;

  padding: 20px 15px;
`;
const Button = styled.TouchableOpacity`
  padding: 9px 52px;
  display: flex;
  width: 70%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${AppStyles.color.COLOR_PRIMARY};
  border-radius: 50px;
`;
const Text = styled.Text`
  color: ${AppStyles.color.COLOR_WHITE};
  font-size: 13.3px;
  font-family: ${AppStyles.fonts.FONT_BOLD};
  margin-left: 12px;
`;
const selectStyle = {
  width: '100%',
  borderRadius: 12,
  borderWidth: 4,
  borderColor: AppStyles.color.COLOR_PRIMARY,
  paddingVertical: 13,
  paddingHorizontal: 15,
};
const selectFontStyle = {
  fontFamily: AppStyles.fonts.FONT_REGULAR,
  color: AppStyles.color.COLOR_WHITE,
};
const selectStyles = {
  inputIOS: {
    ...selectStyle,
    ...selectFontStyle,
  },
  inputAndroid: {
    ...selectStyle,
    ...selectFontStyle,
  },
  iconContainer: {
    top: '50%',
    right: 15,
    transform: [{ translateY: -5 }],
  },
};
const bgStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: metrics.screenWidth,
  height: metrics.screenHeight,
};
const options = [
  {
    label: '와우0',
    value: 'wow',
  },
  {
    label: '와우1',
    value: 'wow1',
  },
  {
    label: '와우2',
    value: 'wow2',
  },
];
const FeedBack = () => {
  const handleChangeText = () => { };
  const _dismiss = () => {
    Keyboard.dismiss();
  };
  const [selected, setSelected] = useState('wow');
  const handleSelect = setSelected;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DismissZone onPress={_dismiss}>
        <Container>
          <Background style={bgStyle} />
          <Group>
            <RNPickerSelect
              style={selectStyles}
              placeholder={{
                label: '카테고리를 선택하세요.',
                value: null,
                color: AppStyles.color.COLOR_TEXT_PLACEHOLDER,
              }}
              onValueChange={handleSelect}
              items={options}
              useNativeAndroidPickerStyle={false}
              Icon={() => <ArrowDownIcon width={12} height={10} />}
            />
          </Group>
          <Group>
            <TextArea
              placeholderTextColor={AppStyles.color.COLOR_TEXT_PLACEHOLDER}
              placeholder="여기에 의견을 입력해주세요."
              multiline={true}
              onChangeText={handleChangeText}
              numberOfLines={10}
            />
          </Group>
          <Group center>
            <Button>
              <MessageIcon width={21.3} height={20} />
              <Text>의견 보내기</Text>
            </Button>
          </Group>
        </Container>
      </DismissZone>
    </SafeAreaView>
  );
};

export default FeedBack;
