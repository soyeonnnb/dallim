import * as S from './Main.styles';
import {useEffect, useState} from 'react';
import {fetchUserProfile} from '@/apis/MainApi';
import {characterData} from '@/recoil/data/CharacterData';
import {planetData} from '@/recoil/data/PlanetData';
import {LevelData, PointData} from '@/recoil/data/LevelData';
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
import {useRecoilState} from 'recoil';
import {CustomToast} from '@/components/common/toast/CustomToast';
import StampWhiteIcon from '@/assets/icons/StampWhiteIcon';

interface MainProps {
  navigation: any;
}
function Main({navigation}: MainProps) {
  const [isLoading, setIsLoading] = useState(true); // 로딩 확인
  const [isStampModalVisible, setStampModalVisible] = useState(false); // 출석 모달
  const [isGuideModalVisible, setGuideModalVisible] = useState(false); // 가이드 모달
  const [isPrivacyPolicyModalVisible, setPrivacyPolicyModalVisible] =
    useState(false); //공지모달

  const [userId, setUserId] = useRecoilState(userIdState); // 유저 아이디
  const [userNickname, setUserNickname] = useRecoilState(userNicknameState); // 유저 닉네임
  const [userPoint, setUserPoint] = useRecoilState(userPointState);
  const [userLevel, setUserLevel] = useRecoilState(userLevelState);
  const [userExp, setUserExp] = useRecoilState(userExpState);
  const [equippedCharacterIndex, setEquippedCharacterIndex] = useRecoilState(
    equippedCharacterIndexState,
  );
  const [equippedEvolutionStage, setEquippedEvolutionStage] = useRecoilState(
    equippedEvolutionStageState,
  );
  const [equippedPlanetIndex, setEquippedPlanetIndex] = useRecoilState(
    equippedPlanetIndexState,
  );

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

  // // Test Toast
  // function DummyToast() {
  //   CustomToast({ type: 'error', text1: '개발중입니다.' });
  // }

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
  const PointImage = PointData.Point;

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
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}>
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
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}>
                    <S.ButtonStyle onPress={PolicyAction}>
                      <PrivacyPolicyIcon width={20} height={20} color="white" />
                    </S.ButtonStyle>
                  </LinearGradient>
                </S.Box>
              </S.GuideBox>
              <S.StampBox>
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
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}>
                    <S.ButtonStyle onPress={StampAction}>
                      <StampWhiteIcon width={20} height={20} color="white" />
                    </S.ButtonStyle>
                  </LinearGradient>
                </S.Box>
              </S.StampBox>
            </S.ButtonBox>

            <S.Body>
              <S.PlanetGif
                source={planetData[equippedPlanetIndex].Rotate}
                resizeMode="contain"
              />
              <S.CharacterGif
                source={
                  characterData[equippedCharacterIndex].Evolutions[
                    equippedEvolutionStage
                  ].RunFront
                }
                resizeMode="contain"
              />

              <S.StartBox>
                {/* <S.StartButton
                  onPress={
                    () => navigation.navigate('GameStartStack')
                    // DummyToast() // 개발중
                  }>
                  <LinearGradient
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
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
                </S.StartButton> */}
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
      )}
    </S.Container>
  );
}

export default Main;
