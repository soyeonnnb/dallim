import React, { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import * as S from './Main.styles';
import RoomSample from '../../assets/Theme/RoomSample.png';
import StampIcon from '../../assets/icons/StampIcon.png';
import CloseIcon from '../../assets/icons/CloseIcon.png';
import StampModal from '../../components/mainComponent/StampModal';

function Main({ navigation }: any) {
  const TempLv = '67';
  const TempPoint = '3000';

  const [isOn, setIsOn] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleHandle = () => {
    setIsOn(prevIsOn => {
      Animated.timing(animatedValue, {
        toValue: prevIsOn ? 0 : 40,
        duration: 100,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start();
      return !prevIsOn;
    });
  };

  function handleSend() {
    console.log("출석체크 버튼 눌림!");
    setStampModalVisible(true);
  };

  // Stamp 모달
  const [isStampModalVisible, setStampModalVisible] = useState(false);

  // 로그인으로 보내기 (삭제예정)
  function linkLogin() {
    console.log("로그인으로 보내는 버튼 눌림!");
    navigation.navigate('Login');
  };

  return (
    <S.Container>
      <S.BackgroundImage
        source={
          isOn
            ? require('../../assets/images/MainBackground2.png')
            : require('../../assets/images/MainBackground1.png')
        }
        resizeMode="cover">
        <S.Header>
          <S.HeaderLeft>
            <S.ToggleButtonWrapper onPress={toggleHandle}>
              <S.ToggleButton
                style={{
                  transform: [
                    {
                      translateX: animatedValue,
                    },
                  ],
                }}
                isOn={isOn}
              />
            </S.ToggleButtonWrapper>
          </S.HeaderLeft>
          <S.HeaderRight>
            <S.LevelText isOn={isOn}>Lv. {TempLv}</S.LevelText>
            <S.PointText isOn={isOn}>{TempPoint} P</S.PointText>
          </S.HeaderRight>
        </S.Header>
        <S.StampBox>
          <S.Stamp>
            <S.SendButton onPress={handleSend}>
              <S.StampImage source={StampIcon} />
            </S.SendButton>
          </S.Stamp>
          {/* 임시 버튼 : 로그인 스크린으로 보내기 도전 */}
          <S.Stamp>
            <S.SendButton onPress={linkLogin}>
              <S.StampImage source={CloseIcon} />
            </S.SendButton>
          </S.Stamp>
        </S.StampBox>
        <S.Body>
          <S.ThemeBox>
            <S.StyledImage source={RoomSample} />
          </S.ThemeBox>
        </S.Body>
      </S.BackgroundImage>

      <StampModal
        isVisible={isStampModalVisible}
        onClose={() => setStampModalVisible(false)}
      />

    </S.Container>
  );
}

export default Main;
