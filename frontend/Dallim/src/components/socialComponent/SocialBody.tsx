import React, { useRef, useState } from 'react';
import { Animated, Easing, ScrollView } from 'react-native';
import * as S from './SocialBody.styles';
import RankInfoBox from './RankInfoBox';
import { useNavigation, NavigationProp  } from '@react-navigation/native';

function SocialBody({ navigation }: any) {
  const Rank = 1;
  const Distance = 123;
  const Nickname = "배고픈 하마";
  const Level = 66;

  const [isOn, setIsOn] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleWidth = 250;
  const movePercentage = 0.4; // 토글 40% 움직임
  const toggleHandle = () => {
    setIsOn(prevIsOn => {
      Animated.timing(animatedValue, {
        toValue: prevIsOn ? 0 : toggleWidth * movePercentage,
        duration: 100,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start();
      return !prevIsOn;
    });
  };

  return (
    <S.Container>
      <S.Top>
        <S.TopBox>
          <S.ToggleButtonWrapper onPress={toggleHandle}>
            <S.ToggleButton
              style={{
                transform: [
                  {
                    translateX: animatedValue,
                  },
                ],
              }}
            />
            <S.FixedTextLeft isOn={isOn}>전체</S.FixedTextLeft>
            <S.FixedTextRight isOn={isOn}>친구</S.FixedTextRight>

          </S.ToggleButtonWrapper>
        </S.TopBox>
      </S.Top>
      <S.Body>
        <ScrollView>
          {/* 나중에 데이터 불러와서 스크롤 적용 예정 */}
          <S.RankInfoBox >
            <RankInfoBox Rank={Rank} Distance={Distance} Nickname={Nickname} Level={Level} navigation={navigation} />
          </S.RankInfoBox>
        </ScrollView>
      </S.Body>

    </S.Container>

  );
};

export default SocialBody;
