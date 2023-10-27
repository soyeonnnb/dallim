import React, { useState } from 'react';
import * as S from './Edit.styles';
import CharacterEdit from '../../components/editComponent/CharacterEdit';
import { characterData } from '../../components/editComponent/CharacterData';

function Edit() {
    const [characterIndex, setCharacterIndex] = useState(2); // 초기 캐릭터 인덱스

    const handleCharacterChange = (characterIndex: number) => {
        setCharacterIndex(characterIndex);
    };

    const handleNextCharacter = () => {
        const nextIndex = (characterIndex + 1) % characterData.length;
        setCharacterIndex(nextIndex);
    };
    const handlePreviousCharacter = () => {
        const prevIndex = (characterIndex - 1 + characterData.length) % characterData.length;
        setCharacterIndex(prevIndex);
    };

    return (
        <S.Container>
            <S.BackgroundImage
                source={characterData[characterIndex].background}
                resizeMode="cover">
                <S.Top>
                </S.Top>
                <S.Body>
                    <S.BodyLeft>
                        <S.RotationBox onPress={handlePreviousCharacter}>
                        </S.RotationBox>
                    </S.BodyLeft>
                    <S.BodyCenter>
                        <CharacterEdit onCharacterChange={handleCharacterChange} characterIndex={characterIndex} />
                    </S.BodyCenter>
                    <S.BodyRight>
                        <S.RotationBox onPress={handleNextCharacter}>
                        </S.RotationBox>
                    </S.BodyRight>
                </S.Body>
                <S.TabBox />
            </S.BackgroundImage>
        </S.Container>
    );
};

export default Edit;
