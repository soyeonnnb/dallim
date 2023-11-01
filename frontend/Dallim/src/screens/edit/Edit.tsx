import * as S from './Edit.styles';
import { characterData } from '@/recoil/CharacterData';
import { backgroundImage } from '@/recoil/PlanetData';
import { planetData } from '@/recoil/PlanetData';
import { useRef, useState, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { fetchEditInfo } from '@/apis/EditApi';
import CharacterEdit from '@/components/editComponent/CharacterEdit';
import PlanetEdit from '@/components/editComponent/PlanetEdit';
import BasicCharacter from '@/assets/characters/Rabbit.png'
import BasicPlanet from '@/assets/planets/PlanetBlack.png';
import Right from '@/assets/icons/DirectionRight.png';
import Left from '@/assets/icons/DirectionLeft.png';
import Loading from '@/components/common/Loading';

import { useRecoilState } from 'recoil';
import {
  userDataState,
  userPointState,
  equippedCharacterIndexState,
  equippedCharacterLevelState,
  equippedEvolutionStageState,
  equippedPlanetIndexState,
  selectedCharacterIndexState,
  selectedCharacterLevelState,
  selectedEvolutionStageState,
  selectedCharacterExpState,
  selectedCharacterIsPurchasedState,
  selectedPlanetIndexState,
  selectedPlanetIsPurchasedState,
  isOnState
} from '@/recoil/EditRecoil';


function Edit() {

  const [userData, setUserData] = useRecoilState(userDataState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEditInfo();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {

    if (userData) {
      setUserPoint(userData.point);
      setEquippedCharacterIndex(userData.mainCharacterIndex);
      setEquippedCharacterLevel(userData.characters[userData.mainCharacterIndex].level);
      setEquippedEvolutionStage(userData.characters[userData.mainCharacterIndex].evolutionStage);
      setEquippedPlanetIndex(userData.mainPlanetIndex);

      setSelectedCharacterIndex(userData.mainCharacterIndex);
      setSelectedCharacterLevel(userData.characters[userData.mainCharacterIndex].level);
      setSelectedEvolutionStage(userData.characters[userData.mainCharacterIndex].evolutionStage);
      setSelectedCharacterExp(userData.characters[userData.mainCharacterIndex].exp);
      setSelectedCharacterIsPurchased(userData.characters[userData.mainCharacterIndex].isPurchased);

      setSelectedPlanetIndex(userData.mainPlanetIndex);
      setSelectedPlanetIsPurchased(userData.planets[userData.mainPlanetIndex].isPurchased);
    }
  }, [userData]);

  const [userPoint, setUserPoint] = useRecoilState(userPointState);
  const [equippedCharacterIndex, setEquippedCharacterIndex] = useRecoilState(equippedCharacterIndexState);
  const [equippedCharacterLevel, setEquippedCharacterLevel] = useRecoilState(equippedCharacterLevelState);
  const [equippedEvolutionStage, setEquippedEvolutionStage] = useRecoilState(equippedEvolutionStageState);
  const [equippedPlanetIndex, setEquippedPlanetIndex] = useRecoilState(equippedPlanetIndexState);

  const [selectedCharacterIndex, setSelectedCharacterIndex] = useRecoilState(selectedCharacterIndexState);
  const [selectedCharacterLevel, setSelectedCharacterLevel] = useRecoilState(selectedCharacterLevelState);
  const [selectedEvolutionStage, setSelectedEvolutionStage] = useRecoilState(selectedEvolutionStageState);
  const [selectedCharacterExp, setSelectedCharacterExp] = useRecoilState(selectedCharacterExpState);
  const [selectedCharacterIsPurchased, setSelectedCharacterIsPurchased] = useRecoilState(selectedCharacterIsPurchasedState);
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useRecoilState(selectedPlanetIndexState);
  const [selectedPlanetIsPurchased, setSelectedPlanetIsPurchased] = useRecoilState(selectedPlanetIsPurchasedState);
  const [isOn, setIsOn] = useRecoilState(isOnState);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleHandle = () => {
    setIsOn(prevIsOn => {
      Animated.timing(animatedValue, {
        toValue: prevIsOn ? 0 : 50,
        duration: 100,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start();
      return !prevIsOn;
    });
  };

  // 캐릭터 선택
  const handleCharacterChange = (selectedCharacterIndex: number) => {
    setSelectedCharacterIndex(selectedCharacterIndex);
  };
  const handleNextCharacter = () => {
    const nextIndex = (selectedCharacterIndex + 1) % characterData.length;
    setSelectedCharacterIndex(nextIndex);
  };
  const handlePreviousCharacter = () => {
    let prevIndex = selectedCharacterIndex - 1;
    if (prevIndex < 0) {
      prevIndex = characterData.length - 1;
    }
    setSelectedCharacterIndex(prevIndex);
  };

  // 선택된 캐릭터 인덱스가 바뀔 때마다 관련 상태 업데이트
  useEffect(() => {
    if (userData) {
      const character = userData.characters[selectedCharacterIndex];
      setSelectedCharacterLevel(character.level);
      setSelectedEvolutionStage(character.evolutionStage);
      setSelectedCharacterExp(character.exp);
      setSelectedCharacterIsPurchased(character.isPurchased);
    }
  }, [selectedCharacterIndex]);

  // 사용자가 장착하고 있는 캐릭터의 상태 업데이트
  const handleEquippedCharacterChange = (index: number) => {
    setEquippedCharacterIndex(index);
    // Axios 캐릭터 업데이트 Put 요청 
  }

  // 행성 선택
  const handlePlanetChange = (selectedPlanetIndex: number) => {
    setSelectedPlanetIndex(selectedPlanetIndex);
  };
  const handleNextPlanet = () => {
    const nextIndex = (selectedPlanetIndex + 1) % planetData.length;
    setSelectedPlanetIndex(nextIndex);
  };
  const handlePreviousPlanet = () => {
    let prevIndex = selectedPlanetIndex - 1;
    if (prevIndex < 0) {
      prevIndex = planetData.length - 1;
    }
    setSelectedPlanetIndex(prevIndex);
  };

  // 선택된 행성 인덱스가 바뀔 때마다 관련 상태 업데이트
  useEffect(() => {
    if (userData) {
      const planet = userData.planets[selectedPlanetIndex];
      setSelectedPlanetIsPurchased(planet.isPurchased);
    }
  }, [selectedPlanetIndex]);

  // 사용자가 장착하고 있는 행성의 상태 업데이트
  const handleEquippedPlanetChange = (index: number) => {
    setEquippedPlanetIndex(index);
    // Axios 행성 업데이트 Put 요청 
  }

  return (
    <S.Container>
      {userData === null ? (<Loading />) : (
        <>
          <S.BackgroundImage
            source={isOn ? backgroundImage.image : characterData[selectedCharacterIndex].background}
            resizeMode="cover">
            <S.Header>
              <S.HeaderSide />
              <S.TopMiddle>
                <S.ToggleButtonWrapper onPress={toggleHandle}>
                  <S.ToggleButton
                    style={{
                      transform: [
                        {
                          translateX: animatedValue,
                        },
                      ],
                    }}
                  >
                    <S.ToggleImage source={isOn ? BasicPlanet : BasicCharacter} />
                  </S.ToggleButton>
                </S.ToggleButtonWrapper>
              </S.TopMiddle>
              <S.HeaderSide>
                <S.PointText>{userPoint}P</S.PointText>
              </S.HeaderSide>
            </S.Header>

            <S.Body>
              <S.BodyLeft>
                <S.DirectionBox onPress={isOn ? handlePreviousPlanet : handlePreviousCharacter}>
                  <S.Direction source={Left} />
                </S.DirectionBox>
              </S.BodyLeft>
              <S.BodyCenter>
                {
                  isOn
                    ? <PlanetEdit handleEquippedPlanetChange={handleEquippedPlanetChange} onPlanetChange={handlePlanetChange} />
                    : <CharacterEdit handleEquippedCharacterChange={handleEquippedCharacterChange} onCharacterChange={handleCharacterChange} />
                }
              </S.BodyCenter>

              <S.BodyRight>
                <S.DirectionBox onPress={isOn ? handleNextPlanet : handleNextCharacter}>
                  <S.Direction source={Right} />
                </S.DirectionBox>
              </S.BodyRight>
            </S.Body>

            <S.TabBox />
          </S.BackgroundImage>
        </>
      )}
    </S.Container>
  );
};

export default Edit;
