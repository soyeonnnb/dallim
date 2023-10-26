import React, { useRef, useState } from 'react';
import * as S from './Edit.styles';
import { Animated, Easing } from 'react-native';
import CharacterEdit from '../../components/editComponent/CharacterEdit';
import RoomEdit from '../../components/editComponent/RoomEdit';
import { characterData } from '../../components/editComponent/CharacterData';
import { backgroundImage } from '../../components/editComponent/RoomData';
import { roomData } from '../../components/editComponent/RoomData';
import Left from '../../assets/icons/DirectionLeft.png';
import Right from '../../assets/icons/DirectionRight.png';
import Sun from '../../assets/images/Sun.png';
import ToggleRoom from '../../assets/images/ToggleRoom.png'

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
    const [roomIndex, setRoomIndex] = useState(0); // 초기 방 인덱스
    const handleRoomChange = (roomIndex: number) => {
        setRoomIndex(roomIndex);
    };
    const handleNextRoom = () => {
        const nextIndex = (roomIndex + 1) % roomData.length;
        setRoomIndex(nextIndex);
    };
    const handlePreviousRoom = () => {
        let prevIndex = roomIndex - 1;
        if (prevIndex < 0) {
            prevIndex = roomData.length - 1;
        }
        setRoomIndex(prevIndex);
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
                                <S.ToggleImage source={isOn ? ToggleRoom : Sun} />
                            </S.ToggleButton>
                        </S.ToggleButtonWrapper>
                    </S.TopMiddle>
                    <S.HeaderSide>
                        <S.PointText>{TempPoint}P</S.PointText>
                    </S.HeaderSide>
                </S.Header>

                <S.Body>
                    <S.BodyLeft>
                        <S.DirectionBox onPress={isOn ? handlePreviousRoom : handlePreviousCharacter}>
                            <S.Direction source={Left} />
                        </S.DirectionBox>
                    </S.BodyLeft>
                    <S.BodyCenter>
                        {
                            isOn
                                ? <RoomEdit onRoomChange={handleRoomChange} roomIndex={roomIndex} isOn={isOn}/>
                                : <CharacterEdit onCharacterChange={handleCharacterChange} characterIndex={characterIndex} />
                        }
                    </S.BodyCenter>

                    <S.BodyRight>
                        <S.DirectionBox onPress={isOn ? handleNextRoom : handleNextCharacter}>
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
