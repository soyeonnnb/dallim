import * as S from './Edit.styles';
import {characterData} from '@/recoil/data/CharacterData';
import {backgroundImage} from '@/recoil/data/PlanetData';
import {planetData} from '@/recoil/data/PlanetData';
import {useRef, useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import {fetchEditInfo} from '@/apis/EditApi';
import CharacterEdit from '@/components/editComponent/CharacterEdit';
import PlanetEdit from '@/components/editComponent/PlanetEdit';
import BasicCharacter from '@/assets/images/characters/badge/BadgePenguinEgg.png';
import BasicPlanet from '@/assets/images/planets/main/PlanetBlack.png';
import Right from '@/assets/icons/DirectionRight.png';
import Left from '@/assets/icons/DirectionLeft.png';
import Loading from '@/components/common/Loading_Run';
import {PointData} from '@/recoil/data/LevelData';

import {useRecoilState, useSetRecoilState} from 'recoil';
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
  isOnState,
} from '@/recoil/UserRecoil';

function Edit() {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [userPoint, setUserPoint] = useRecoilState(userPointState);
  const setEquippedCharacterIndex = useSetRecoilState(
    equippedCharacterIndexState,
  );
  const setEquippedCharacterLevel = useSetRecoilState(
    equippedCharacterLevelState,
  );
  const setEquippedEvolutionStage = useSetRecoilState(
    equippedEvolutionStageState,
  );
  const setEquippedPlanetIndex = useSetRecoilState(equippedPlanetIndexState);

  const [selectedCharacterIndex, setSelectedCharacterIndex] = useRecoilState(
    selectedCharacterIndexState,
  );
  const setSelectedCharacterLevel = useSetRecoilState(
    selectedCharacterLevelState,
  );
  const setSelectedEvolutionStage = useSetRecoilState(
    selectedEvolutionStageState,
  );
  const setSelectedCharacterExp = useSetRecoilState(selectedCharacterExpState);
  const setSelectedCharacterIsPurchased = useSetRecoilState(
    selectedCharacterIsPurchasedState,
  );
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useRecoilState(
    selectedPlanetIndexState,
  );
  const setSelectedPlanetIsPurchased = useSetRecoilState(
    selectedPlanetIsPurchasedState,
  );

  const [isOn, setIsOn] = useRecoilState(isOnState);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(true); // 로딩 확인

  const fetchData = async () => {
    try {
      const data = await fetchEditInfo();
      setUserData(data);

      setIsLoading(false); // 데이터를 불러온 후 로딩 상태를 false로 변경
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      setUserPoint(userData.point);
      setEquippedCharacterIndex(userData.mainCharacterIndex);
      setEquippedCharacterLevel(
        userData.characters[userData.mainCharacterIndex].level,
      );
      setEquippedEvolutionStage(
        userData.characters[userData.mainCharacterIndex].evolutionStage,
      );
      setEquippedPlanetIndex(userData.mainPlanetIndex);

      setSelectedCharacterIndex(userData.mainCharacterIndex);
      setSelectedCharacterLevel(
        userData.characters[userData.mainCharacterIndex].level,
      );
      setSelectedEvolutionStage(
        userData.characters[userData.mainCharacterIndex].evolutionStage,
      );
      setSelectedCharacterExp(
        userData.characters[userData.mainCharacterIndex].exp,
      );
      setSelectedCharacterIsPurchased(
        userData.characters[userData.mainCharacterIndex].isPurchased,
      );

      setSelectedPlanetIndex(userData.mainPlanetIndex);
      setSelectedPlanetIsPurchased(
        userData.planets[userData.mainPlanetIndex].isPurchased,
      );
    }
  }, [userData, setSelectedCharacterIndex]);

  const toggleWidth = 115;

  const toggleHandle = () => {
    setIsOn(prevIsOn => {
      Animated.timing(animatedValue, {
        toValue: prevIsOn ? 0 : toggleWidth * 0.5,
        duration: 100,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start();
      return !prevIsOn;
    });
  };

  // 캐릭터 구매 관련
  const handleCharacterPurchased = (characterIndex: number, cost: number) => {
    setUserPoint(prevPoints => prevPoints - cost);
    handleEquippedCharacterChange(characterIndex);
  };
  // 행성 구매 관련
  const handlePlanetPurchased = (planetIndex: number, cost: number) => {
    setUserPoint(prevPoints => prevPoints - cost);
    handleEquippedPlanetChange(planetIndex);
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
  };

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
  };

  // 새로고침 버튼을 눌렀을 때 실행할 함수
  const handleReload = () => {
    setIsLoading(true);
    fetchData();
  };

  const formatPoints = (points: number) => {
    if (points >= 100000) {
      return '99,999+';
    } else {
      // 1000 -> 1,000
      return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  };
  const PointImage = PointData.Coin;

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
            source={
              isOn
                ? backgroundImage.Image
                : characterData[selectedCharacterIndex].Background
            }
            resizeMode="cover">
            <S.Header>
              <S.HeaderSide />
              <S.TopMiddle>
                <S.ToggleButtonWrapper onPress={toggleHandle}>
                  <S.TextBox>
                    <S.Text>
                      <S.FixedTextLeft
                        source={BasicCharacter}></S.FixedTextLeft>
                      <S.ToggleButton
                        style={{
                          transform: [
                            {
                              translateX: animatedValue,
                            },
                          ],
                        }}></S.ToggleButton>
                    </S.Text>
                    <S.Text>
                      <S.FixedTextRight source={BasicPlanet}></S.FixedTextRight>
                    </S.Text>
                  </S.TextBox>
                </S.ToggleButtonWrapper>
              </S.TopMiddle>
              <S.HeaderSide>
                <S.PointBox>
                  <S.PointImage source={PointImage} resizeMode="contain" />
                  <S.PointText>{formatPoints(userPoint)}</S.PointText>
                </S.PointBox>
              </S.HeaderSide>
            </S.Header>

            <S.Body>
              <S.BodyLeft>
                <S.DirectionBox
                  onPress={
                    isOn ? handlePreviousPlanet : handlePreviousCharacter
                  }>
                  <S.Direction source={Left} />
                </S.DirectionBox>
              </S.BodyLeft>
              <S.BodyCenter>
                {isOn ? (
                  <PlanetEdit
                    handleEquippedPlanetChange={handleEquippedPlanetChange}
                    onPlanetChange={handlePlanetChange}
                    onPlanetPurchased={handlePlanetPurchased}
                  />
                ) : (
                  <CharacterEdit 
                    handleEquippedCharacterChange={
                      handleEquippedCharacterChange
                    }
                    onCharacterChange={handleCharacterChange}
                    onCharacterPurchased={handleCharacterPurchased}
                  />
                )}
              </S.BodyCenter>

              <S.BodyRight>
                <S.DirectionBox
                  onPress={isOn ? handleNextPlanet : handleNextCharacter}>
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
}

export default Edit;
