import * as S from './Main.styles';
import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchUserProfile } from '@/apis/MainApi';
import { characterData } from '@/recoil/data/CharacterData';
import { planetData } from '@/recoil/data/PlanetData';
import { LevelData, PointData } from '@/recoil/data/LevelData';
import NotificationModal from '@/components/profileComponent/profileModal/NotificationModal';
import GuideModal from '@/components/mainComponent/guideComponent/GuideModal';
import StampModal from '@/components/mainComponent/StampModal';
// import RadialGradient from 'react-native-radial-gradient';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '@/components/common/Loading_Run';

// svg Icon
import GuideIcon from '@/assets/icons/GuideIcon';
import PrivacyPolicyIcon from '@/assets/icons/PrivacyPolicyIcon';
import {
  userIdState,
  userNicknameState,
  userPointState,
  userLevelState,
  userExpState,
  equippedCharacterIndexState,
  equippedEvolutionStageState,
  equippedPlanetIndexState,
} from '@/recoil/UserRecoil';
import { useRecoilState } from 'recoil';
// import { CustomToast } from '@/components/common/toast/CustomToast';
import StampWhiteIcon from '@/assets/icons/StampWhiteIcon';

// 행성
import PlanetBlack from '@/assets/images/planets/main/PlanetBlack.png';
import PlanetPurple from '@/assets/images/planets/main/PlanetPurple.png';
import PlanetRed from '@/assets/images/planets/main/PlanetRed.png';
import PlanetBlue from '@/assets/images/planets/main/PlanetBlue.png';
import PlanetYellow from '@/assets/images/planets/main/PlanetYellow.png';

// 날씨
import WeatherComponent from '@/components/mainComponent/Weather';

// MP3
import Sound from 'react-native-sound';

interface MainProps {
  navigation: any;
}
function Main({ navigation }: MainProps) {
  const moveAnim = useRef(new Animated.Value(0)).current; // 초기 위치 값

  const [isLoading, setIsLoading] = useState(true); // 로딩 확인
  const [isStampModalVisible, setStampModalVisible] = useState(false); // 출석 모달
  const [isGuideModalVisible, setGuideModalVisible] = useState(false); // 가이드 모달
  const [isPrivacyPolicyModalVisible, setPrivacyPolicyModalVisible] = useState(false); //공지모달
  const [userId, setUserId] = useRecoilState(userIdState); // 유저 아이디
  const [userNickname, setUserNickname] = useRecoilState(userNicknameState); // 유저 닉네임
  const [userPoint, setUserPoint] = useRecoilState(userPointState);
  const [userLevel, setUserLevel] = useRecoilState(userLevelState);
  const [userExp, setUserExp] = useRecoilState(userExpState);
  const [equippedCharacterIndex, setEquippedCharacterIndex] = useRecoilState(equippedCharacterIndexState);
  const [equippedEvolutionStage, setEquippedEvolutionStage] = useRecoilState(equippedEvolutionStageState);
  const [equippedPlanetIndex, setEquippedPlanetIndex] = useRecoilState(equippedPlanetIndexState);
  const PointImage = PointData.Point;

  const loadUserInfo = async () => {
    try {
      const userInfo = await fetchUserProfile(); // API 함수 호출
      // console.log('Main : 정보 조회 Axios 성공 userInfo : ', userInfo);

      if (userInfo) {
        setUserId(userInfo.userId);
        setUserNickname(userInfo.nickName);
        setUserPoint(userInfo.point);
        setUserLevel(userInfo.userLevel);
        setUserExp(userInfo.userExp);
        setEquippedCharacterIndex(userInfo.characterIndex);
        setEquippedEvolutionStage(userInfo.evolutionStage);
        setEquippedPlanetIndex(userInfo.planetIndex);

        setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 변경
      }
    } catch (error) {
      // console.error('Main : 정보 조회 Axios 실패 ');
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  function GuideAction() {
    // console.log('사용설명서 버튼 눌림!');
    setGuideModalVisible(true);
  }

  function StampAction() {
    // console.log('출석체크 버튼 눌림!');
    setStampModalVisible(true);
  }

  function PolicyAction() {
    // console.log('공지모달 눌림');
    setPrivacyPolicyModalVisible(true);
  }

  // 캐릭터 효과음
  let sound: Sound | null = null;
  useEffect(() => {
    sound = new Sound(require('@/assets/audio/Sample_1.mp3'), Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('오디오 로드 실패', error);
      }
    });
    return () => {
      if (sound) {
        sound.setVolume(1.0); // 효과음 크기
        sound.release();
        sound = null;
      }
    };
  }, [loadUserInfo]);

  function getLevelImageIndex(userLevel: number) {
    if (userLevel <= 10) return 0;
    if (userLevel <= 20) return 1;
    if (userLevel <= 30) return 2;
    if (userLevel <= 40) return 3;
    return 4; // 50 이하인 경우
  }
  const LevelImage = LevelData[getLevelImageIndex(userLevel)].Name;

  const formatPoints = (points: number) => {
    if (points >= 100000) {
      return '99,999+';
    } else {
      // 1000 -> 1,000
      return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  };

  // 캐릭터 날아랏~
  const handlePress = () => {
    if (sound) {
      sound.play((success) => {
        if (!success) {
          console.log('재생 실패');
        }
      });
    }

    Animated.sequence([
      // 위로 이동
      Animated.timing(moveAnim, {
        toValue: -100, // 움직일 거리
        duration: 500, // 지속 시간
        useNativeDriver: true, // 네이티브 드라이버 사용
      }),
      // 원래 위치로 복귀
      Animated.timing(moveAnim, {
        toValue: 0, // 원래 위치
        duration: 500, // 지속 시간
        useNativeDriver: true, // 네이티브 드라이버 사용
      }),
    ]).start(); // 애니메이션 시작
  };

  const AnimatedCharacterGif = Animated.createAnimatedComponent(S.CharacterGif);

  // 각 행성에 대한 회전 상태와 애니메이션 설정
  const rotateValue1 = new Animated.Value(0);
  const rotateValue2 = new Animated.Value(0);
  const rotateValue3 = new Animated.Value(0);
  const rotateValue4 = new Animated.Value(0);
  const rotateValue5 = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue1, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.timing(rotateValue2, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.timing(rotateValue3, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.timing(rotateValue4, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.timing(rotateValue5, {
        toValue: 1,
        duration: 12000,
        useNativeDriver: true,
      })
    ).start();
  }, [loadUserInfo]);

  // 회전 값 계산
  const rotate1 = rotateValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const rotate2 = rotateValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['150deg', '510deg'],
  });
  const rotate3 = rotateValue3.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '540deg'],
  });
  const rotate4 = rotateValue4.interpolate({
    inputRange: [0, 1],
    outputRange: ['300deg', '660deg'],
  });
  const rotate5 = rotateValue5.interpolate({
    inputRange: [0, 1],
    outputRange: ['300deg', '660deg'],
  });

  // 새로고침 버튼을 눌렀을 때 실행할 함수
  const handleReload = () => {
    setIsLoading(true);
    loadUserInfo();
  };

  return (
    <S.Container>
      {isLoading ? (
        <>
          <S.BackgroundImage
            source={require('@/assets/images/MainBackground.png')}
            resizeMode="cover">
            <Loading onReload={handleReload} />
          </S.BackgroundImage>
        </>
      ) : (
        <>

          <S.BackgroundImage
            source={require('@/assets/images/MainBackground.png')}
            resizeMode="cover">

            {/* 행성 돌리기 */}
            <>
              <Animated.Image
                source={PlanetBlack}
                style={{
                  width: 40, // 가운데 행성의 크기를 80으로 설정
                  height: 40, // 가운데 행성의 크기를 80으로 설정
                  position: 'absolute',
                  bottom: '0%', // 부모 컨테이너 중앙에 위치
                  left: '50%', // 부모 컨테이너 중앙에 위치
                  transform: [
                    { translateX: -45 }, // 이미지 크기의 절반으로 이동
                    { translateY: -45 }, // 이미지 크기의 절반으로 이동
                    { rotate: rotate1 }, // 회전 애니메이션 적용
                    { translateX: 200 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                    { translateY: 200 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                  ],
                }}
              />
              <Animated.Image
                source={PlanetPurple}
                style={{
                  width: 40, // 가운데 행성의 크기를 80으로 설정
                  height: 40, // 가운데 행성의 크기를 80으로 설정
                  position: 'absolute',
                  bottom: '0%', // 부모 컨테이너 중앙에 위치
                  left: '50%', // 부모 컨테이너 중앙에 위치
                  transform: [
                    { translateX: -45 }, // 이미지 크기의 절반으로 이동
                    { translateY: -45 }, // 이미지 크기의 절반으로 이동
                    { rotate: rotate2 }, // 회전 애니메이션 적용
                    { translateX: 270 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                    { translateY: 270 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                  ],
                }}
              />
              <Animated.Image
                source={PlanetRed}
                style={{
                  width: 40, // 가운데 행성의 크기를 80으로 설정
                  height: 40, // 가운데 행성의 크기를 80으로 설정
                  position: 'absolute',
                  bottom: '0%', // 부모 컨테이너 중앙에 위치
                  left: '50%', // 부모 컨테이너 중앙에 위치
                  transform: [
                    { translateX: -45 }, // 이미지 크기의 절반으로 이동
                    { translateY: -45 }, // 이미지 크기의 절반으로 이동
                    { rotate: rotate3 }, // 회전 애니메이션 적용
                    { translateX: 320 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                    { translateY: 320 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                  ]
                }}
              />
              <Animated.Image
                source={PlanetBlue}
                style={{
                  width: 40, // 가운데 행성의 크기를 80으로 설정
                  height: 40, // 가운데 행성의 크기를 80으로 설정
                  position: 'absolute',
                  bottom: '0%', // 부모 컨테이너 중앙에 위치
                  left: '50%', // 부모 컨테이너 중앙에 위치
                  transform: [
                    { translateX: -45 }, // 이미지 크기의 절반으로 이동
                    { translateY: -45 }, // 이미지 크기의 절반으로 이동
                    { rotate: rotate4 }, // 회전 애니메이션 적용
                    { translateX: 360 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                    { translateY: 360 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                  ]
                }}
              />
              <Animated.Image
                source={PlanetYellow}
                style={{
                  width: 40, // 가운데 행성의 크기를 80으로 설정
                  height: 40, // 가운데 행성의 크기를 80으로 설정
                  position: 'absolute',
                  bottom: '0%', // 부모 컨테이너 중앙에 위치
                  left: '50%', // 부모 컨테이너 중앙에 위치
                  transform: [
                    { translateX: -45 }, // 이미지 크기의 절반으로 이동
                    { translateY: -45 }, // 이미지 크기의 절반으로 이동
                    { rotate: rotate5 }, // 회전 애니메이션 적용
                    { translateX: 400 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                    { translateY: 400 }, // 도는 행성 크기의 절반으로 되돌리기 (중심점 조정)
                  ]
                }}
              />
            </>

            <S.Header>
              <S.HeaderLeft>
                <S.LevelBox>
                  <S.LevelImage source={LevelImage} resizeMode="contain" />
                </S.LevelBox>
                <S.LevelText>Lv. {userLevel}</S.LevelText>
                <S.NicknameText>{userNickname}</S.NicknameText>
                <S.ExpBarContainer>
                  <S.ExpBar
                    expPercent={userExp}
                    levelIndex={getLevelImageIndex(userLevel)}></S.ExpBar>
                </S.ExpBarContainer>
              </S.HeaderLeft>

              <S.HeaderRight>
                <S.PointBox>
                  <S.PointImage source={PointImage} resizeMode="contain" />

                  <S.PointText>{formatPoints(userPoint)}</S.PointText>
                </S.PointBox>
              </S.HeaderRight>
            </S.Header>

            <S.ButtonBox>
              <S.GuideBox>
                <S.Box>
                  <LinearGradient
                    colors={[
                      'rgba(106, 99, 190, 0.8)',
                      'rgba(36, 31, 90, 0.8)',
                    ]}
                    style={{
                      borderRadius: 18,
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}>
                    <S.ButtonStyle onPress={GuideAction}>
                      <GuideIcon width={20} height={20} color="white" />
                    </S.ButtonStyle>
                  </LinearGradient>
                </S.Box>
                <S.Box>
                  <LinearGradient
                    colors={[
                      'rgba(106, 99, 190, 0.8)',
                      'rgba(36, 31, 90, 0.8)',
                    ]}
                    style={{
                      borderRadius: 18,
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}>
                    <S.ButtonStyle onPress={PolicyAction}>
                      <PrivacyPolicyIcon width={20} height={20} color="white" />
                    </S.ButtonStyle>
                  </LinearGradient>
                </S.Box>
                <S.Box>
                  <LinearGradient
                    colors={[
                      'rgba(106, 99, 190, 0.8)',
                      'rgba(36, 31, 90, 0.8)',
                    ]}
                    style={{
                      borderRadius: 18,
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}>
                    <S.ButtonStyle onPress={StampAction}>
                      <StampWhiteIcon width={20} height={20} color="white" />
                    </S.ButtonStyle>
                  </LinearGradient>
                </S.Box>
              </S.GuideBox>

              <S.WeatherBox>
                <WeatherComponent />
              </S.WeatherBox>

            </S.ButtonBox>

            <S.Body>
              <S.PlanetGif
                source={planetData[equippedPlanetIndex].Rotate}
                resizeMode="contain"
              />
              <TouchableWithoutFeedback onPress={handlePress}>
                <AnimatedCharacterGif
                  style={{ transform: [{ translateY: moveAnim }] }}
                  source={
                    characterData[equippedCharacterIndex].Evolutions[equippedEvolutionStage].RunFront
                  }
                  resizeMode="contain"
                />
              </TouchableWithoutFeedback>

              <S.StartBox>
                {/* 모바일 러닝 임시 자리 */}
              </S.StartBox>
            </S.Body>
          </S.BackgroundImage>

          <GuideModal
            isVisible={isGuideModalVisible}
            onClose={() => setGuideModalVisible(false)}
          />
          <StampModal
            isVisible={isStampModalVisible}
            onClose={() => setStampModalVisible(false)}
          />
          <NotificationModal
            isVisible={isPrivacyPolicyModalVisible}
            onClose={() => setPrivacyPolicyModalVisible(false)}
          />
        </>
      )
      }
    </S.Container >
  );
}

export default Main;



// // Test Toast
// function DummyToast() {
//   CustomToast({ type: 'error', text1: '개발중입니다.' });
// }
{/* <S.StartButton
  onPress={
    () => navigation.navigate('GameStartStack')
    // DummyToast() // 개발중
  }>
  <LinearGradient
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    colors={['#6EE2F5', '#6454F0']}
    style={{
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <S.StartText>달리기</S.StartText>
    <RadialGradient
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 50,
        opacity: 0.3,
        justifyContent: 'center',
        alignContent: 'center',
        overflow: 'hidden',
      }}
      colors={['#ffffff', '#A890FF']}
      stops={[0, 0.3]}
      radius={500}
      center={[50, 100]}></RadialGradient>
  </LinearGradient>
</S.StartButton>  */}