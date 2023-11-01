import * as S from './Main.styles';
import {useEffect, useState} from 'react';
import {fetchUserProfile} from '@/apis/MainApi';
import {characterData} from '@/components/common/CharacterData';
import {planetData} from '@/components/common/PlanetData';
import StampWhiteIcon from '@/assets/icons/StampWhiteIcon.png';
import StampModal from '@/components/mainComponent/StampModal';
import SpinAnimation from '@/components/common/SpinAnimation';
import CustomToast from '@/components/common/CustomToast';
import Loading from '@/components/common/Loading';

function Main() {
  const [isLoading, setIsLoading] = useState(true); // 로딩 확인
  const [isStampModalVisible, setStampModalVisible] = useState(false); // 출석 모달

  const [userNickname, setUserNickname] = useState<string | null>(null); // 유저 닉네임
  const [userPoint, setUserPoint] = useState<number>(0); // 유저 포인트
  const [userLevel, setUserLevel] = useState<number>(0); // 유저 레벨
  const [userCharacterIndex, setUserCharacterIndex] = useState<number>(0); // 유저가 장착한 캐릭터 인덱스 ( 0 ~ 3 )
  const [userEvolutionStage, setUserEvolutionStage] = useState<number>(0); // 유저가 장착한 캐릭터 레벨 : 0 OR 1
  const [userPlanetIndex, setUserPlanetIndex] = useState<number>(0); // 유저가 장착한 행성 ( 0 ~ 4 )

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await fetchUserProfile(); // API 함수 호출
        console.log('Main : 정보 조회 Axios 성공 userInfo : ', userInfo);

        if (userInfo) {
          setUserNickname(userInfo.nickName);
          setUserPoint(userInfo.point);
          setUserLevel(userInfo.userLevel);
          setUserCharacterIndex(userInfo.characterIndex);
          setUserEvolutionStage(userInfo.evolutionStage);
          setUserPlanetIndex(userInfo.planetIndex);
        }
      } catch (error) {
        console.error('Main : 정보 조회 Axios 실패 ');
      } finally {
        setTimeout(() => {
          setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 변경
        }, 1000);
      }
    };
    loadUserInfo();
  }, []);

  function handleSend() {
    console.log('출석체크 버튼 눌림!');
    setStampModalVisible(true);
  }
  function Start() {
    console.log('시작 버튼 눌림!');
    CustomToast({type: 'error', text1: '아직 개발중입니다.'});
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

            <S.StampBox>
              <S.Stamp>
                <S.SendButton onPress={handleSend}>
                  <S.StampImage source={StampWhiteIcon} />
                </S.SendButton>
              </S.Stamp>
            </S.StampBox>

            <S.Body>
              <S.ThemeBox>
                <SpinAnimation>
                  <S.StyledImage
                    source={planetData[userPlanetIndex].Planet}
                    resizeMode="contain"
                  />
                </SpinAnimation>
                <S.StyledGif
                  source={
                    characterData[userCharacterIndex].levels[userEvolutionStage]
                      .running
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
                <S.StartButton onPress={Start}>
                  <S.StartText>시작하기</S.StartText>
                </S.StartButton>
              </S.StartBox>
            </S.Footer>

            <S.TabBox />
          </S.BackgroundImage>

          <StampModal
            isVisible={isStampModalVisible}
            onClose={() => setStampModalVisible(false)}
          />
        </>
      )}
    </S.Container>
  );
}

export default Main;
