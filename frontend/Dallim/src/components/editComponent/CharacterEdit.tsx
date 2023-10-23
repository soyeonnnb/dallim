import React, { useEffect, useState } from 'react';
import * as S from './CharacterEdit.styles'; // 스타일 컴포넌트 import
import FirstCharacter from './characterBox/FirstCharacter';
import SecondCharacter from './characterBox/SecondCharacter';
import ThirdCharacter from './characterBox/ThirdCharacter';
import FourthCharacter from './characterBox/FourthCharacter';

function CharacterEdit() {

    const SelectText = '친구를 선택하세요';

    const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0); // 초기 선택 캐릭터 인덱스
    const characters = [
        <FirstCharacter />,
        <SecondCharacter />,
        <ThirdCharacter />,
        <FourthCharacter />
    ];

    useEffect(() => {
        // 캐릭터 선택 변경 시 수행되는 로직 (필요하다면)
        console.log(`Selected character index: ${selectedCharacterIndex}`);
    }, [selectedCharacterIndex]);

    function handleCharacterChange(index: number) {
        console.log(index +"번째 캐릭터가 눌렸습니다!")
        setSelectedCharacterIndex(index);
    }

    return (
        <S.Container>
            <S.Top>
                <S.SideBox />
                <S.TitleBox>
                    <S.SelectText>{SelectText}</S.SelectText>
                </S.TitleBox>
                <S.SideBox ></S.SideBox>
            </S.Top>
            <S.Body>
                <S.CharacterBox>
                    {characters[selectedCharacterIndex]}
                </S.CharacterBox>
            </S.Body>
            <S.Bottom>
                <S.ButtonBox onPress={() => handleCharacterChange((selectedCharacterIndex) % 4)}>
                    <S.ButtonText>선택</S.ButtonText>
                </S.ButtonBox>
            </S.Bottom>
        </S.Container>
    );
};

export default CharacterEdit;