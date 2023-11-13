import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, ScrollView} from 'react-native';
import * as S from './SocialBody.styles';
import RankInfoBox from './RankInfoBox';
import {fetchAllRank, fetchFriendRank} from '@/apis/SocialApi';
import NoFriendImage from '@/assets/images/NoFriend.png';
import Loading_Run from '../common/Loading_Run';

type RankingInfo = {
  rank: number;
  userId: number;
  characterIndex: number;
  evolutionStage: number;
  nickname: string;
  cumulativeDistance: number;
  level: number;
  follower: boolean;
};

type SocialBodyProps = {
  navigation: any;
  isFriend: boolean;
  onToggle: () => void;
  onUpdateDateInfo: (month: number, week: number) => void;
};

function SocialBody({
  navigation,
  isFriend,
  onToggle,
  onUpdateDateInfo,
}: SocialBodyProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleWidth = 250;

  const handleToggle = () => {
    Animated.timing(animatedValue, {
      toValue: isFriend ? 0 : toggleWidth * 0.5,
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

  const [fadeAnim] = useState(new Animated.Value(0)); // 초기 투명도는 0

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
          <S.ToggleWrapperShadow
            distance={1}
            startColor="rgba(255, 255, 255, 0.75)"
            endColor="rgba(150, 148, 166,0.9)"
            offset={[0, 0]}>
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
          </S.ToggleWrapperShadow>
        </S.TopBox>
      </S.Top>
      <S.Body>
        <ScrollView>
          {/* 수정중 */}
          {rankingData ? (
            rankingData.length > 0 ? (
              rankingData.map((info: RankingInfo, index) => (
                <S.RankInfoBox key={info.userId.toString()}>
                  <RankInfoBox
                    rank={index + 1}
                    userId={info.userId}
                    characterIndex={info.characterIndex}
                    evolutionStage={info.evolutionStage}
                    nickname={info.nickname}
                    cumulativeDistance={info.cumulativeDistance}
                    level={info.level}
                    follower={info.follower}
                    navigation={navigation}
                  />
                </S.RankInfoBox>
              ))
            ) : (
              <S.LoadingBox>
                <S.EmptyImage source={NoFriendImage} resizeMode="contain" />
                <S.EmptyText style={{marginRight: 10}}>
                  친구를 추가해주세요.
                </S.EmptyText>
              </S.LoadingBox>
            )
          ) : (
            <S.LoadingBox>
              <Loading_Run />
              {/* <S.AnimatedFooterText style={{ opacity: fadeAnim }}>로딩 중...</S.AnimatedFooterText> */}
            </S.LoadingBox>
          )}
        </ScrollView>
      </S.Body>
    </S.Container>
  );
}

export default SocialBody;
