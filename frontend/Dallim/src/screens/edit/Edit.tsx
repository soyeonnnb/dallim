import React, { useRef, useState, useEffect } from 'react';
import * as S from './Edit.styles';
import { Animated, Easing } from 'react-native';
import CharacterEdit from '../../components/editComponent/CharacterEdit';
import PlanetEdit from '@/components/editComponent/PlanetEdit';
import { characterData } from '../../components/common/CharacterData';
import { backgroundImage } from '../../components/common/PlanetData';
import { planetData } from '../../components/common/PlanetData';

import Left from '@/assets/icons/DirectionLeft.png';
import Right from '@/assets/icons/DirectionRight.png';
import BasicCharacter from '@/assets/characters/Rabbit.png'
import BasicPlanet from '@/assets/planets/PlanetBlack.png';

import { UserData, userDataDummy } from './EditDummyData'; // 임시 데이터

function Edit() {

  const [userData, setUserData] = useState<UserData>(userDataDummy.data);
  useEffect(() => {
    if (userData) {
      setEquippedCharacterIndex(userData.mainCharacterIndex);
      setEquippedPlanetIndex(userData.mainPlanetIndex);
    }
  }, [userData]);

  // DB에서 불러온 데이터
  const userPoint = userData.point; // 포인트
  const [equippedCharacterIndex, setEquippedCharacterIndex] = useState<number>(userData.mainCharacterIndex); // 장착된 캐릭터
  const [equippedCharacterLevel, setEquippedCharacterLevel] = useState<number>(userData.characters[userData.mainCharacterIndex].level); // 장착된 캐릭터 레벨
  const [equippedEvolutionStage, setEquippedEvolutionStage] = useState<number>(userData.characters[userData.mainCharacterIndex].evolutionStage); // 장착된 캐릭터 등급
  const [equippedPlanetIndex, setEquippedPlanetIndex] = useState<number>(userData.mainPlanetIndex); // 장착된 행성

  // 선택하는 중인 인덱스
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0); // 선택된 캐릭터
  const [selectedCharacterLevel, setSelectedCharacterLevel] = useState<number>(userData.characters[selectedCharacterIndex].level); // 선택된 캐릭터 레벨
  const [selectedEvolutionStage, setSelectedEvolutionStage] = useState<number>(userData.characters[selectedCharacterIndex].evolutionStage); // 선택된 캐릭터 등급
  const [selectedCharacterExp, setSelectedCharacterExp] = useState<number>(userData.characters[selectedCharacterIndex].exp); // 선택된 캐릭터 경험치
  const [selectedCharacterPurchased, setSelectedCharacterPurchased] = useState<boolean>(userData.characters[selectedCharacterIndex].purchased); // 선택된 캐릭터 구매 여부
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0); // 선택된 행성

  const [isOn, setIsOn] = useState(false);
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
    const character = userData.characters[selectedCharacterIndex];
    setSelectedCharacterLevel(character.level);
    setSelectedEvolutionStage(character.evolutionStage);
    setSelectedCharacterExp(character.exp);
    setSelectedCharacterPurchased(character.purchased);
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

  // 사용자가 장착하고 있는 행성의 상태 업데이트
  const handleEquippedPlanetChange = (index: number) => {
    setEquippedPlanetIndex(index);
    // Axios 행성 업데이트 Put 요청 
  }

  return (
    <S.Container>
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
                ? <PlanetEdit equippedPlanetIndex={equippedPlanetIndex} selectedPlanetIndex={selectedPlanetIndex} handleEquippedPlanetChange={handleEquippedPlanetChange} onPlanetChange={handlePlanetChange} />
                : <CharacterEdit equippedCharacterIndex={equippedCharacterIndex} equippedCharacterLevel={equippedCharacterLevel} equippedEvolutionStage={equippedEvolutionStage} selectedCharacterIndex={selectedCharacterIndex} selectedCharacterLevel={selectedCharacterLevel} selectedEvolutionStage={selectedEvolutionStage} selectedCharacterExp={selectedCharacterExp} selectedCharacterPurchased={selectedCharacterPurchased} handleEquippedCharacterChange={handleEquippedCharacterChange} onCharacterChange={handleCharacterChange} />
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
    </S.Container>
  );
};

export default Edit;
