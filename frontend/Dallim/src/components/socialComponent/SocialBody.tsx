import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, ScrollView } from 'react-native';
import * as S from './SocialBody.styles';
import RankInfoBox from './RankInfoBox';
import { fetchAllRank, fetchFriendRank } from '@/apis/SocialApi';
import Loading from '@/components/common/Loading';

type RankingInfo = {
  rank: number;
  userId: number;
  nickname: string;
  cumulativeDistance: number;
  level: number;
  follower: boolean
};

function SocialBody({ navigation, isFriend, onToggle }: any) {

  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleWidth = 250;

  const handleToggle = () => {
    Animated.timing(animatedValue, {
      toValue: isFriend ? 0 : toggleWidth * 0.4,
      duration: 100,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();

    onToggle(); // 상위 컴포넌트의 상태 변경 함수를 호출
  };

  const [rankingData, setRankingData] = useState<RankingInfo[] | null>(null);

  const loadRankingData = async () => {
    try {
      const data = isFriend ? await fetchFriendRank() : await fetchAllRank();
      setRankingData(data.rankingInfos);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    loadRankingData();
  }, [isFriend]);

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
          {rankingData ? (
            rankingData.length > 0 ? (
              rankingData.map((info: RankingInfo, index) => (
                <S.RankInfoBox key={info.userId.toString()}>
                  <RankInfoBox
                    rank={index + 1}
                    nickname={info.nickname}
                    cumulativeDistance={info.cumulativeDistance}
                    distance={info.cumulativeDistance}
                    level={info.level}
                    follower={info.follower}

                    navigation={navigation}
                  />
                </S.RankInfoBox>
              ))
            ) : (
              <S.LordingText>랭킹 데이터가 없습니다.</S.LordingText>
            )
          ) : (
            <Loading />
            // <S.LordingText>랭킹을 불러오는 중입니다...</S.LordingText>
          )}
        </ScrollView>
      </S.Body>

    </S.Container>

  );
};

export default SocialBody;
