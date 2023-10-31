import CustomToast from '@/components/common/CustomToast';
import React, { useEffect, useState } from 'react';
import * as S from './Main.styles';
import StampWhiteIcon from '../../assets/icons/StampWhiteIcon.png';
import StampModal from '../../components/mainComponent/StampModal';
import SpinAnimation from '../../components/common/SpinAnimation';
import { characterData } from '../../components/common/CharacterData';
import { planetData } from '@/components/common/PlanetData';
import { fetchUserProfile } from '@/apis/MainApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
// 저장된 토큰, Id 체크

function Main() {
  const [isLoading, setIsLoading] = useState(true);

  const [userNickname, setUserNickname] = useState<string | null>(null); // 유저 닉네임
  const [userPoint, setUserPoint] = useState<number | null>(null); // 유저 포인트
  const [userLevel, setUserLevel] = useState<number | null>(null); // 유저 레벨
  const [userCharacterIndex, setUserCharacterIndex] = useState<number | null>(null); // 유저가 장착한 캐릭터 인덱스 ( 0 ~ 3 )
  const [userEvolutionStage, setUserEvolutionStage] = useState<number | null>(null); // 유저가 장착한 캐릭터 레벨 : 0 OR 1 
  const [userPlanetIndex, setUserPlanetIndex] = useState<number | null>(null); // 유저가 장착한 행성 ( 0 ~ 4 )

  // const selectedCharacter = characterData[userCharacterIndex];
  const selectedCharacter = userCharacterIndex !== null ? characterData[userCharacterIndex] : characterData[0];
  // const selectedCharacterLevelData = selectedCharacter.levels[userEvolutionStage];
  const selectedCharacterLevelData = selectedCharacter.levels[userEvolutionStage !== null ? userEvolutionStage : 0];

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await fetchUserProfile();
        console.log("Main : 정보 조회 Axios 성공 2 : ", userInfo);

        if (userInfo) {
          setUserNickname(userInfo.nickName);
          setUserPoint(userInfo.point);
          setUserLevel(userInfo.userLevel);
          setUserCharacterIndex(userInfo.characterIndex);
          setUserEvolutionStage(userInfo.evolutionStage);
          setUserPlanetIndex(userInfo.planetIndex);
        }
      } catch (error) {
        console.error("Main : 정보 조회 Axios 실패 2");
      } finally {
        setIsLoading(false);  // 데이터를 불러온 후 로딩 상태를 false로 변경
      }
    };
    loadUserInfo();
  }, []);

  const [isStampModalVisible, setStampModalVisible] = useState(false);

  function handleSend() {
    console.log('출석체크 버튼 눌림!');
    retrieveStoredData(); // 토큰 체크 ( 나중에 삭제 )
    setStampModalVisible(true);
  }

  function Start() {
    console.log("시작 버튼 눌림!");
    CustomToast({ type: "error", text1: "아직 개발중입니다." });
  };


  const retrieveStoredData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const id = await AsyncStorage.getItem('userId');

      console.log('Stored Access Token:', accessToken);
      console.log('Stored ID:', id);
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  return (
    <S.Container>
      {isLoading ? (
        // 로딩 중일 때의 컴포넌트 또는 메시지
        <S.LoadingText>로딩 중...</S.LoadingText>
      ) : (
        <>
          <S.BackgroundImage
            source={require('@/assets/images/MainBackground4.png')}
            resizeMode="cover">
            <S.Header>
              <S.HeaderLeft>

              </S.HeaderLeft>
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
                  {/* <S.StyledImage source={planetData[userPlanetIndex].Planet} resizeMode='contain' /> */}
                  <S.StyledImage source={planetData[userPlanetIndex !== null ? userPlanetIndex : 0].Planet} resizeMode='contain' />
                </SpinAnimation>
                <S.StyledGif
                  source={selectedCharacterLevelData.running}
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