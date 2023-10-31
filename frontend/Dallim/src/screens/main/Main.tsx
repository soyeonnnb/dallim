import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import * as S from './Main.styles';
import StampDarkIcon from '../../assets/icons/StampDarkIcon.png';
import StampWhiteIcon from '../../assets/icons/StampWhiteIcon.png';
import StampModal from '../../components/mainComponent/StampModal';
import Moon from '../../assets/images/Moon.png';
import Sun from '../../assets/images/Sun.png';
import SunToggleBackground from '../../assets/images/SunToggleBackground.png';
import MoonToggleBackground from '../../assets/images/MoonToggleBackground.png';
import SpinAnimation from '../../components/common/SpinAnimation';
import {characterData} from '../../components/common/CharacterData';
import planetSample from '@/assets/planets/PlanetBlack.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { fetchUserProfile } from '../../apis';
// type UserProfile = {
//   profileIndex: number;
//   nickname: string;
//   level: number;
//   exp: number;
//   curExp: number;
//   cumulativeDistance: number;
//   cumulativeWeekDistance: number;
//   endExp: number;
// };

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
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  const TempPoint = '3000'; // 유저 포인트
  const TempLv = '67'; // 유저 레벨
  const TempNickname = '하늘을 나는 병아리'; // 유저 닉네임
  const TempSelectCharacter = 0; // 유저가 장착한 캐릭터
  const TempSelectCharacterLevel = 0; // 유저가 장착한 캐릭터 레벨 : 0 OR 1
  const selectedCharacter = characterData[TempSelectCharacter];
  const selectedCharacterLevelData =
    selectedCharacter.levels[TempSelectCharacterLevel];

  const [isOn, setIsOn] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isStampModalVisible, setStampModalVisible] = useState(false);

  function toggleHandle() {
    setIsOn(prevIsOn => {
      Animated.timing(animatedValue, {
        toValue: prevIsOn ? 0 : 40,
        duration: 100,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start();
      return !prevIsOn;
    });
  }

  function handleSend() {
    console.log('출석체크 버튼 눌림!');
    retrieveStoredData();
    setStampModalVisible(true);
  }

  function Start() {
    console.log('시작 버튼 눌림!');
  }

  return (
    <S.Container>
      <S.BackgroundImage
        source={
          isOn
            ? require('../../assets/images/MainBackground2.png')
            : require('../../assets/images/MainBackground4.png')
        }
        resizeMode="cover">
        <S.Header>
          <S.HeaderLeft>
            <S.ToggleButtonBackground onPress={toggleHandle}>
              <S.ToggleButtonWrapper
                source={isOn ? SunToggleBackground : MoonToggleBackground}
                isOn={isOn}>
                <S.ToggleButton
                  source={isOn ? Sun : Moon}
                  style={{
                    transform: [
                      {
                        translateX: animatedValue,
                      },
                    ],
                  }}
                  isOn={isOn}
                />
              </S.ToggleButtonWrapper>
            </S.ToggleButtonBackground>
          </S.HeaderLeft>
          <S.HeaderRight>
            <S.PointText isOn={isOn}>{TempPoint} P</S.PointText>
          </S.HeaderRight>
        </S.Header>

        <S.StampBox>
          <S.Stamp>
            <S.SendButton onPress={handleSend}>
              <S.StampImage source={isOn ? StampDarkIcon : StampWhiteIcon} />
            </S.SendButton>
          </S.Stamp>
        </S.StampBox>

        <S.Body>
          <S.ThemeBox>
            <SpinAnimation>
              <S.StyledImage source={planetSample} />
            </SpinAnimation>
            <S.StyledGif
              source={selectedCharacterLevelData.running}
              resizeMode="contain"
            />
          </S.ThemeBox>
        </S.Body>

        <S.Footer>
          <S.FooterBox>
            <S.LevelText isOn={isOn}>Lv. {TempLv}</S.LevelText>
            <S.NicknameText isOn={isOn}>{TempNickname}</S.NicknameText>
            {/* <S.NicknameText isOn={isOn}>{userInfo ? userInfo.nickname : "Loading..."}</S.NicknameText> */}
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
