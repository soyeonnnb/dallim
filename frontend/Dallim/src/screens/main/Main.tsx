import React, { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import * as S from './Main.styles';
import planetSample from '../../assets/Theme/PlanetBlack.png';
import StampDarkIcon from '../../assets/icons/StampDarkIcon.png';
import StampWhiteIcon from '../../assets/icons/StampWhiteIcon.png';
import StampModal from '../../components/mainComponent/StampModal';
import Moon from '../../assets/images/Moon.png';
import Sun from '../../assets/images/Sun.png';
import SunToggleBackground from '../../assets/images/SunToggleBackground.png';
import MoonToggleBackground from '../../assets/images/MoonToggleBackground.png';
import SpinAnimation from '../../components/common/SpinAnimation';

function Main() {
  const TempPoint = '3000';
  const TempLv = '67';
  const TempNickname = '하늘을 나는 병아리';

  const [isOn, setIsOn] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isStampModalVisible, setStampModalVisible] = useState(false);

  function toggleHandle() {
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

  function Start() {
    console.log("시작 버튼 눌림!");
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
            <S.SendButton onPress={handleSend}>
              <S.StampImage source={isOn ? StampDarkIcon : StampWhiteIcon} />
            </S.SendButton>
          </S.Stamp>

        </S.StampBox>

        <S.Body>
          <S.ThemeBox>
            <SpinAnimation>
              <S.StyledImage source={planetSample} />
            </SpinAnimation>
            <S.StyledGif source={gifSources[gifSourcesIndex]} />
          </S.ThemeBox>
        </S.Body>

        <S.Footer>
          <S.FooterBox>
            <S.LevelText isOn={isOn}>Lv. {TempLv}</S.LevelText>
            <S.NicknameText isOn={isOn}>{TempNickname}</S.NicknameText>
          </S.FooterBox>

          <S.StartBox>
            <S.StartButton onPress={Start}>
              <S.StartText >시작하기</S.StartText>
            </S.StartButton>
          </S.StartBox>

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
