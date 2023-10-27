import React, { useRef, useState } from 'react';
import * as S from './Edit.styles';
import { Animated, Easing } from 'react-native';
import CharacterEdit from '../../components/editComponent/CharacterEdit';
import PlanetEdit from '../../components/editComponent/PlanetEdit';
import { characterData } from '../../components/common/CharacterData';
import { backgroundImage } from '../../components/common/PlanetData';
import { planetData } from '../../components/common/PlanetData';
import Left from '../../assets/icons/DirectionLeft.png';
import Right from '../../assets/icons/DirectionRight.png';
import Sun from '../../assets/images/Sun.png';
import TogglePlanet from '../../assets/images/Moon.png'

function Edit() {

    const TempPoint = '3000';
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

    // 캐릭터
    const [characterIndex, setCharacterIndex] = useState(0); // 초기 캐릭터 인덱스
    const handleCharacterChange = (characterIndex: number) => {
        setCharacterIndex(characterIndex);
    };
    const handleNextCharacter = () => {
        const nextIndex = (characterIndex + 1) % characterData.length;
        setCharacterIndex(nextIndex);
    };
    const handlePreviousCharacter = () => {
        let prevIndex = characterIndex - 1;
        if (prevIndex < 0) {
            prevIndex = characterData.length - 1;
        }
        setCharacterIndex(prevIndex);
    };

    // 방
    const [planetIndex, setPlanetIndex] = useState(0); // 초기 방 인덱스
    const handlePlanetChange = (planetIndex: number) => {
        setPlanetIndex(planetIndex);
    };
    const handleNextPlanet = () => {
        const nextIndex = (planetIndex + 1) % planetData.length;
        setPlanetIndex(nextIndex);
    };
    const handlePreviousPlanet = () => {
        let prevIndex = planetIndex - 1;
        if (prevIndex < 0) {
            prevIndex = planetData.length - 1;
        }
        setPlanetIndex(prevIndex);
    };

    return (
        <S.Container>
            <S.BackgroundImage
                source={isOn ? backgroundImage.image : characterData[characterIndex].background}
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
                                <S.ToggleImage source={isOn ? TogglePlanet : Sun} />
                            </S.ToggleButton>
                        </S.ToggleButtonWrapper>
                    </S.TopMiddle>
                    <S.HeaderSide>
                        <S.PointText>{TempPoint}P</S.PointText>
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
                                ? <PlanetEdit onPlanetChange={handlePlanetChange} planetIndex={planetIndex} isOn={isOn}/>
                                : <CharacterEdit onCharacterChange={handleCharacterChange} characterIndex={characterIndex} />
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
