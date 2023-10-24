import React, { useState } from 'react';
import * as S from './Edit.styles';
import CharacterEdit from '../../components/editComponent/CharacterEdit';
import { characterData } from '../../components/editComponent/CharacterData';
import Left from '../../assets/icons/DirectionLeft.png';
import Right from '../../assets/icons/DirectionRight.png';

function Edit() {
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

    const TempPoint = '3000';

    return (
        <S.Container>
            <S.BackgroundImage
                source={characterData[characterIndex].background}
                resizeMode="cover">
                <S.Top>
                    <S.TopSide></S.TopSide>
                    <S.TopMiddle></S.TopMiddle>
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
