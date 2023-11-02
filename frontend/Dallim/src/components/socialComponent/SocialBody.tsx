import React, { useRef, useState } from 'react';
import { Animated, Easing, ScrollView } from 'react-native';
import * as S from './SocialBody.styles';
import RankInfoBox from './RankInfoBox';

function SocialBody({ navigation, isFriend, onToggle }: any) {
  const Rank = 1;
  const Distance = 123;
  const Nickname = "배고픈 하마";
  const Level = 66;

  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleWidth = 250;
  const movePercentage = 0.4; // 토글 40% 움직임

  const handleToggle = () => {
    Animated.timing(animatedValue, {
      toValue: isFriend ? 0 : toggleWidth * movePercentage,
      duration: 100,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();

    onToggle(); // 상위 컴포넌트의 상태 변경 함수를 호출
  };

  return (
    <S.Container>
      <S.Top>
        <S.TopBox>
          <S.ToggleButtonWrapper onPress={handleToggle}>
            <S.ToggleButton
              style={{
                transform: [
                  {
                    translateX: animatedValue,
                  },
                ],
              }}
            />
            <S.FixedTextLeft isFriend={isFriend}>전체</S.FixedTextLeft>
            <S.FixedTextRight isFriend={isFriend}>친구</S.FixedTextRight>
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
