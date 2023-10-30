import React from 'react';
import * as S from './CharacterBox.styles';
import { characterData } from '../common/CharacterData';

interface Props {
    characterIndex: number;
    characterLevel: number;
}

function CharacterBox({ characterIndex, characterLevel }: Props) {
    return (
        <S.Container>
            <S.CharacterBox>
                <S.CharacterImage source={characterData[characterIndex].levels[characterLevel].front} resizeMode="contain" />
            </S.CharacterBox>
        </S.Container>
    );
}
export default CharacterBox;
