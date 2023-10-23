import React, { useEffect, useState } from 'react';
import * as S from './CharacterEdit.styles';
import CharacterBox from './CharacterBox';

type CharacterEditProps = {
    onCharacterChange: (index: number) => void;
    characterIndex: number;
}

function CharacterEdit({ onCharacterChange, characterIndex }: CharacterEditProps) {

    const SelectText = '친구를 선택하세요';

    const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(characterIndex);

    useEffect(() => {
        console.log("대표 캐릭터가 바꼈어요 : " + selectedCharacterIndex);
    }, [selectedCharacterIndex]);

    function handleCharacterChange(index: number) {
        console.log(index + "번째 캐릭터가 눌렸습니다!")
        setSelectedCharacterIndex(index);
        onCharacterChange(index); // 상위 컴포넌트로 전달
        // 여기에 캐릭터 Axios put 예정 
    }

    return (
        <S.Container>
            <S.Top>
                <S.TitleBox>
                    <S.SelectText>{SelectText}</S.SelectText>
                </S.TitleBox>
            </S.Top>
            <S.Body>
                <S.CharacterBox>
                    <CharacterBox index={characterIndex} />
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