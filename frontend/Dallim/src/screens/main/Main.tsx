import CustomToast from '@/components/common/CustomToast';
import React, { useState } from 'react';
import * as S from './Main.styles';
import StampWhiteIcon from '../../assets/icons/StampWhiteIcon.png';
import StampModal from '../../components/mainComponent/StampModal';
import SpinAnimation from '../../components/common/SpinAnimation';
import { characterData } from '../../components/common/CharacterData';
import { planetData } from '@/components/common/PlanetData';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Main() {
  // const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  // useEffect(() => {
  //   const loadUserProfile = async () => {
  //     try {
  //       const data = await fetchUserProfile();
  //       console.error("유저정보 불러오기 성공 !");
  //       setUserInfo(data);
  //     } catch (error) {
  //       console.error("유저 불러오려는데 찍 :", error);
  //     }
  //   };
  //   loadUserProfile();
  // }, []);
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

  const TempNickname = '하늘을 나는 병아리'; // 유저 닉네임
  const TempPoint = '3000'; // 유저 포인트
  const TempLv = '67'; // 유저 레벨
  const TempSelectCharacter = 0; // 유저가 장착한 캐릭터 인덱스 ( 0 ~ 3 )
  const TempSelectCharacterLevel = 0; // 유저가 장착한 캐릭터 레벨 : 0 OR 1   
  const TempSelectPlanet = 4; // 유저가 장착한 행성 ( 0 ~ 4 )
  const selectedCharacter = characterData[TempSelectCharacter];
  const selectedCharacterLevelData =
    selectedCharacter.levels[TempSelectCharacterLevel];

  const [isStampModalVisible, setStampModalVisible] = useState(false);

  function handleSend() {
    console.log('출석체크 버튼 눌림!');
    retrieveStoredData();
    setStampModalVisible(true);
  }

  function Start() {
    console.log("시작 버튼 눌림!");
    CustomToast({ type: "error", text1: "아직 개발중입니다." });
  };

  return (
    <S.Container>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover">
        <S.Header>
          <S.HeaderLeft>

          </S.HeaderLeft>
          <S.HeaderRight>
            <S.PointText>{TempPoint} P</S.PointText>
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
              <S.StyledImage source={planetData[TempSelectPlanet].Planet} resizeMode='contain' />
            </SpinAnimation>
            <S.StyledGif
              source={selectedCharacterLevelData.running}
              resizeMode="contain"
            />
          </S.ThemeBox>
        </S.Body>

        <S.Footer>
          <S.FooterBox>
            <S.LevelText>Lv. {TempLv}</S.LevelText>
            <S.NicknameText>{TempNickname}</S.NicknameText>
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
    </S.Container>
  );
}

export default Main;
