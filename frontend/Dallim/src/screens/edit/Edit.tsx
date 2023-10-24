import React, { useRef, useState } from 'react';
import * as S from './Edit.styles';
import { Animated, Easing } from 'react-native';
import CharacterEdit from '../../components/editComponent/CharacterEdit';
import { characterData } from '../../components/editComponent/CharacterData';
import Left from '../../assets/icons/DirectionLeft.png';
import Right from '../../assets/icons/DirectionRight.png';
import Sun from '../../assets/images/Sun.png';
import ToggleRoom from '../../assets/images/ToggleRoom.png'

function Edit() {

    const TempPoint = '3000';
    const [isOn, setIsOn] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;


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

    return (
        <S.Container>
            <S.BackgroundImage
                source={characterData[characterIndex].background}
                resizeMode="cover">
                <S.Top>
                    <S.TopSide></S.TopSide>
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
                                isOn={isOn}
                            >
                                <S.ToggleImage source={isOn ? ToggleRoom : Sun} />
                            </S.ToggleButton>
                        </S.ToggleButtonWrapper>
                    </S.TopMiddle>
                    <S.TopSide>
                        <S.PointText>{TempPoint}P</S.PointText>
                    </S.TopSide>
                </S.Top>
                <S.Body>
                    <S.BodyLeft>
                        <S.RotationBox onPress={handlePreviousCharacter}>
                            <S.DirectionIcon source={Left} />
                        </S.RotationBox>
                    </S.BodyLeft>
                    <S.BodyCenter>
                        <CharacterEdit onCharacterChange={handleCharacterChange} characterIndex={characterIndex} />
                    </S.BodyCenter>
                    <S.BodyRight>
                        <S.RotationBox onPress={handleNextCharacter}>
                            <S.DirectionIcon source={Right} />
                        </S.RotationBox>
                    </S.BodyRight>
                </S.Body>
                <S.TabBox />
            </S.BackgroundImage>
        </S.Container>
    );
};

export default Edit;
