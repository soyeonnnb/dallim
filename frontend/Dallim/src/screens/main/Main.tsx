import React, { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import * as S from './Main.styles';
import RoomSample from '../../assets/Theme/RoomSample_1.png';
import StampDarkIcon from '../../assets/icons/StampDarkIcon.png';
import StampWhiteIcon from '../../assets/icons/StampWhiteIcon.png';
import CloseIcon from '../../assets/icons/CloseIcon.png';
import StampModal from '../../components/mainComponent/StampModal';
import Moon from '../../assets/images/Moon.png';
import Sun from '../../assets/images/Sun.png';
import SunToggleBackground from '../../assets/images/SunToggleBackground.png';
import MoonToggleBackground from '../../assets/images/MoonToggleBackground.png';

function Main({ navigation }: any) {
  const TempPoint = '3000';
  const TempLv = '67';
  const TempNickname = '하늘을 나는 병아리';

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
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  // Test
  const gifSources = {
    1: require('../../assets/character/펭런_1.gif'),
    2: require('../../assets/character/펭런_2.gif'),
    3: require('../../assets/character/펭런_3.gif')
  };
  const gifSourcesIndex = 3;

  return (
    <S.Container>
      <S.BackgroundImage
        source={
          isOn
            ? require('../../assets/images/MainBackground2.png')
            : require('../../assets/images/MainBackground3.png')
        }
        resizeMode="cover">
        <S.Header>
          <S.HeaderLeft>
            <S.ToggleButtonBackground onPress={toggleHandle}>
              <S.ToggleButtonWrapper source={isOn ? SunToggleBackground : MoonToggleBackground} isOn={isOn} >
                <S.ToggleButton
                  source={isOn ? Sun : Moon}
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
            </S.ToggleButtonBackground>
          </S.HeaderLeft>

          <S.HeaderRight>
            <S.PointText isOn={isOn}>{TempPoint} P</S.PointText>
          </S.HeaderRight>

        </S.Header>

        <S.StampBox>
          <S.Stamp>
            <S.SendButton onPress={linkLogin}>
              <S.StampImage source={CloseIcon} />
            </S.SendButton>
          </S.Stamp>

          <S.Stamp>
            <S.SendButton onPress={handleSend}>
              <S.StampImage source={isOn ? StampDarkIcon : StampWhiteIcon} />
            </S.SendButton>
          </S.Stamp>

        </S.StampBox>

        <S.Body>
          <S.ThemeBox>
            <S.StyledImage source={RoomSample} />
            <S.StyledGif source={gifSources[gifSourcesIndex]} />
          </S.ThemeBox>
        </S.Body>

        <S.Footer>
          <S.FooterBox>
            <S.LevelText isOn={isOn}>Lv. {TempLv}</S.LevelText>
            <S.NicknameText isOn={isOn}>{TempNickname}</S.NicknameText>
          </S.FooterBox>
        </S.Footer>

        <S.TabBox />
      </S.BackgroundImage>

      <StampModal
        isVisible={isStampModalVisible}
        onClose={() => setStampModalVisible(false)}
      />

    </S.Container>
  );
}

export default Main;
