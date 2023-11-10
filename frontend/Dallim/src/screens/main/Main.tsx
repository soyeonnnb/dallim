import * as S from './Main.styles';
import {useEffect, useState} from 'react';
import {fetchUserProfile} from '@/apis/MainApi';
import {characterData} from '@/recoil/CharacterData';
import {planetData} from '@/recoil/PlanetData';
import GuideIcon from '@/assets/icons/WatchIcon.png';
import StampWhiteIcon from '@/assets/icons/StampWhiteIcon.png';
import StampModal from '@/components/mainComponent/StampModal';
import SpinAnimation from '@/components/common/SpinAnimation';
import Loading from '@/components/common/Loading';
import GuideModal from '@/components/mainComponent/guideComponent/GuideModal';
import NotificationModal from '@/components/profileComponent/profileModal/NotificationModal';
import privacyPolicyIcon from '@/assets/icons/privacyPolicyIcon.png';
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
import {useRecoilState, useSetRecoilState} from 'recoil';

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
  const setUserExp = useSetRecoilState(userExpState);
  const [equippedCharacterIndex, setEquippedCharacterIndex] = useRecoilState(
    equippedCharacterIndexState,
  );
  const [equippedEvolutionStage, setEquippedEvolutionStage] = useRecoilState(
    equippedEvolutionStageState,
  );
  const [equippedPlanetIndex, setEquippedPlanetIndex] = useRecoilState(
    equippedPlanetIndexState,
  );

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await fetchUserProfile(); // API 함수 호출
        console.log('Main : 정보 조회 Axios 성공 userInfo : ', userInfo);

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
        console.error('Main : 정보 조회 Axios 실패 ');
      }
    };
    loadUserInfo();
  }, []);

  function GuideAction() {
    console.log('사용설명서 버튼 눌림!');
    setGuideModalVisible(true);
  }

  function StampAction() {
    console.log('출석체크 버튼 눌림!');
    setStampModalVisible(true);
  }

  function PolicyAction() {
    console.log('공지모달 눌림');
    setPrivacyPolicyModalVisible(true);
  }

  return (
    <S.Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <S.BackgroundImage
            source={require('@/assets/images/MainBackground4.png')}
            resizeMode="cover">
            <S.Header>
              <S.HeaderLeft></S.HeaderLeft>
              <S.HeaderRight>
                <S.PointText>{userPoint} P</S.PointText>
              </S.HeaderRight>
            </S.Header>

            <S.ButtonBox>
              <S.GuideBox>
                <S.Box>
                  <S.ButtonStyle onPress={GuideAction}>
                    <S.ImageStyle source={GuideIcon} resizeMode="contain" />
                  </S.ButtonStyle>
                </S.Box>
                <S.Box>
                  <S.ButtonStyle onPress={PolicyAction}>
                    <S.PrivacyImg
                      source={privacyPolicyIcon}
                      resizeMode="contain"
                    />
                    {/* <PrivacyPolicyIcon
                      width={15}
                      height={15}
                      color="white"></PrivacyPolicyIcon> */}
                  </S.ButtonStyle>
                </S.Box>
              </S.GuideBox>

              <S.StampBox>
                <S.Box>
                  <S.ButtonStyle onPress={StampAction}>
                    <S.ImageStyle
                      source={StampWhiteIcon}
                      resizeMode="contain"
                    />
                  </S.ButtonStyle>
                </S.Box>
              </S.StampBox>
            </S.ButtonBox>

            <S.Body>
              <S.ThemeBox>
                <SpinAnimation>
                  <S.StyledImage
                    source={planetData[equippedPlanetIndex].Planet}
                    resizeMode="contain"
                  />
                </SpinAnimation>
                <S.StyledGif
                  source={
                    characterData[equippedCharacterIndex].evolutions[
                      equippedEvolutionStage
                    ].running
                  }
                  resizeMode="contain"
                />
              </S.ThemeBox>
            </S.Body>

            <S.Footer>
              <S.FooterBox>
                <S.LevelText>Lv. {userLevel}</S.LevelText>
                <S.NicknameText>{userNickname}</S.NicknameText>
              </S.FooterBox>

              <S.StartBox>
                {/* <S.StartButton onPress={() => navigation.navigate('GameStartStack', { userId: userId })}>
                  <S.StartText>달리기</S.StartText>
                </S.StartButton> */}
              </S.StartBox>
            </S.Footer>

            <S.TabBox />
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
