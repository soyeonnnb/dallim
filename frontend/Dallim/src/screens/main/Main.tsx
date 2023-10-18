import React, { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import * as S from './Main.styles';
import RoomSample from '../../assets/Theme/RoomSample.png';

interface MainProps {
  navigation: any; // navigation prop 타입은 실제 사용하는 라이브러리에 따라 다를 수 있습니다.
}

function Main({ navigation }: MainProps) {

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


  return (
    <S.Container>
      <S.BackgroundImage
        source={isOn ? require('../../assets/images/MainBackground2.png') : require('../../assets/images/MainBackground1.png')}
        resizeMode="cover"
      >

        <S.Header>
          <S.HeaderLeft>
            <S.ToggleButtonWrapper onPress={toggleHandle}>
              <S.ToggleButton style={{
                transform: [{
                  translateX: animatedValue,
                }]
              }} isOn={isOn}/>
            </S.ToggleButtonWrapper>
          </S.HeaderLeft>
          <S.HeaderRight>
            <S.LevelText isOn={isOn}>
              Lv. {TempLv}
            </S.LevelText>
            <S.PointText isOn={isOn}>
              {TempPoint} P
            </S.PointText>
          </S.HeaderRight>
        </S.Header>
        <S.Body>
          {/* Body 내용 */}
          <S.ThemeBox>
            <S.StyledImage source={RoomSample} />
          </S.ThemeBox>
        </S.Body>
      </S.BackgroundImage>

    </S.Container>
  );
};

export default Main;
