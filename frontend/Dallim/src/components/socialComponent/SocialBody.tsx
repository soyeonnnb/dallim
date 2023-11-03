import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, ScrollView } from 'react-native';
import * as S from './SocialBody.styles';
import RankInfoBox from './RankInfoBox';
import { fetchAllRank, fetchFriendRank } from '@/apis/SocialApi';
import Loading from '@/components/common/Loading';
import NoFriendImage from '@/assets/images/NoFriend.png';

type RankingInfo = {
  rank: number;
  userId: number;
  nickname: string;
  cumulativeDistance: number;
  level: number;
  follower: boolean
};

type SocialBodyProps = {
  navigation: any;
  isFriend: boolean;
  onToggle: () => void;
  onUpdateDateInfo: (month: number, week: number) => void;
};

function SocialBody({ navigation, isFriend, onToggle, onUpdateDateInfo }: SocialBodyProps) {

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
      onUpdateDateInfo(data.month, data.week); // 상위로 쏴주기
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    loadRankingData();
  }, [isFriend]);

  const [fadeAnim] = useState(new Animated.Value(0));  // 초기 투명도는 0

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

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
                    userId={info.userId}
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
              <>
                <S.EmptyImage source={NoFriendImage} resizeMode="contain" />
                <S.EmptyText style={{ marginRight: 10 }}>친구를 추가해주세요.</S.EmptyText>
              </>
            )
          ) : (
            <S.LoadingView>
              <S.AnimatedFooterText style={{ opacity: fadeAnim }}>로딩 중...</S.AnimatedFooterText>

            </S.LoadingView>
          )}
        </ScrollView>
      </S.Body>

    </S.Container>

  );
};

export default SocialBody;
