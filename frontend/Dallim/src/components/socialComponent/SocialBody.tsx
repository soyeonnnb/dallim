import React, { useRef, useState } from 'react';
import { Animated, Easing, ScrollView } from 'react-native';
import * as S from './SocialBody.styles';
import RankInfoBox from './RankInfoBox';

function SocialBody() {

  const [isOn, setIsOn] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleWidth = 250;
  const movePercentage = 0.4; // 40% 움직임

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
          <S.RankInfoBox>
            <RankInfoBox />
          </S.RankInfoBox>
          <S.RankInfoBox>
            <RankInfoBox />
          </S.RankInfoBox>
          <S.RankInfoBox>
            <RankInfoBox />
          </S.RankInfoBox>
          <S.RankInfoBox>
            <RankInfoBox />
          </S.RankInfoBox>
          <S.RankInfoBox>
            <RankInfoBox />
          </S.RankInfoBox>
          <S.RankInfoBox>
            <RankInfoBox />
          </S.RankInfoBox>
          <S.RankInfoBox>
            <RankInfoBox />
          </S.RankInfoBox>
          <S.RankInfoBox>
            <RankInfoBox />
          </S.RankInfoBox>
          <S.RankInfoBox>
            <RankInfoBox />
          </S.RankInfoBox>
        </ScrollView>
      </S.Body>

    </S.Container>

  );
};

export default SocialBody;
