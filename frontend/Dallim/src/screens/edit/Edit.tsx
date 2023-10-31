import * as S from './Edit.styles';
import { characterData } from '@/components/common/CharacterData';
import { backgroundImage } from '@/components/common/PlanetData';
import { planetData } from '@/components/common/PlanetData';
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

interface Character {
  characterIndex: number;
  level: number;
  exp: number;
  evolutionStage: number;
  isPurchased: boolean;
}

interface Planet {
  planetIndex: number;
  isPurchased: boolean;
}

interface UserData {
  point: number;
  mainCharacterIndex: number;
  mainPlanetIndex: number;
  characters: Character[];
  planets: Planet[];
}

function Edit() {

  const [userData, setUserData] = useState<UserData | null>(null); // 초기값을 null로 설정

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


  const userPoint = userData?.point;  // 포인트

  const [equippedCharacterIndex, setEquippedCharacterIndex] = useState<number>(0); // 장착된 캐릭터
  const [equippedCharacterLevel, setEquippedCharacterLevel] = useState<number>(0); // 장착된 캐릭터 레벨
  const [equippedEvolutionStage, setEquippedEvolutionStage] = useState<number>(0); // 장착된 캐릭터 등급
  const [equippedPlanetIndex, setEquippedPlanetIndex] = useState<number>(0); // 장착된 행성

  // 선택하는 중인 인덱스
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0); // 선택된 캐릭터
  const [selectedCharacterLevel, setSelectedCharacterLevel] = useState<number>(0); // 선택된 캐릭터 레벨
  const [selectedEvolutionStage, setSelectedEvolutionStage] = useState<number>(0); // 선택된 캐릭터 등급
  const [selectedCharacterExp, setSelectedCharacterExp] = useState<number>(0); // 선택된 캐릭터 경험치
  const [selectedCharacterIsPurchased, setSelectedCharacterIsPurchased] = useState<boolean>(false); // 선택된 캐릭터 구매 여부
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0); // 선택된 행성
  const [selectedPlanetIsPurchased, setSelectedPlanetIsPurchased] = useState<boolean>(false); // 선택된 행성 구매 여부

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
                    ? <PlanetEdit equippedPlanetIndex={equippedPlanetIndex} selectedPlanetIndex={selectedPlanetIndex} selectedPlanetIsPurchased={selectedPlanetIsPurchased} handleEquippedPlanetChange={handleEquippedPlanetChange} onPlanetChange={handlePlanetChange} />
                    : <CharacterEdit equippedCharacterIndex={equippedCharacterIndex} equippedCharacterLevel={equippedCharacterLevel} equippedEvolutionStage={equippedEvolutionStage} selectedCharacterIndex={selectedCharacterIndex} selectedCharacterLevel={selectedCharacterLevel} selectedEvolutionStage={selectedEvolutionStage} selectedCharacterExp={selectedCharacterExp} selectedCharacterIsPurchased={selectedCharacterIsPurchased} handleEquippedCharacterChange={handleEquippedCharacterChange} onCharacterChange={handleCharacterChange} />
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
