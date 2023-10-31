import CustomToast from '@/components/common/CustomToast';
import React, { useEffect, useState } from 'react';
import * as S from './Main.styles';
import StampWhiteIcon from '../../assets/icons/StampWhiteIcon.png';
import StampModal from '../../components/mainComponent/StampModal';
import SpinAnimation from '../../components/common/SpinAnimation';
import { characterData } from '../../components/common/CharacterData';
import { planetData } from '@/components/common/PlanetData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// import { fetchUserProfile } from '@/apis/MainApi';
// import { privateApi } from '@/apis/Index';

function Main() {
  const [isLoading, setIsLoading] = useState(true); // 로딩 확인
  const [isStampModalVisible, setStampModalVisible] = useState(false); // 출석 모달

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

  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      console.log("accessToken:", token);
      setAccessToken(token);  // accessToken 상태 설정
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      const loadUserInfo = async () => {
        try {
          const response = await axios.get(`https://k9b208.p.ssafy.io/api/v1/user/main`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const userInfo = response.data;
          console.log("Main : 정보 조회 Axios 성공 : ", userInfo);

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
    }
  }, [accessToken]);

  function handleSend() {
    console.log('출석체크 버튼 눌림!');
    setStampModalVisible(true);
  }
  function Start() {
    console.log("시작 버튼 눌림!");
    CustomToast({ type: "error", text1: "아직 개발중입니다." });
  };

  return (
    <S.Container>
      {isLoading ? (
        <S.LoadingBox>
          <S.LoadingText>로딩 중...</S.LoadingText>
        </S.LoadingBox>
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

          {/* <StampModal
            isVisible={isStampModalVisible}
            onClose={() => setStampModalVisible(false)}
          /> */}
        </>
      )}
    </S.Container>
  );
}

export default Main;



// const retrieveStoredData = async () => {
//   try {
//     const accessToken = await AsyncStorage.getItem('accessToken');
//     const id = await AsyncStorage.getItem('userId');

//     console.log('Stored Access Token:', accessToken);
//   } catch (error) {
//     console.error('Error retrieving data from AsyncStorage:', error);
//   }
// };