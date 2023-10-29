import React from 'react';
import * as S from './CharacterBox.styles';
import { characterData } from '../common/CharacterData';

interface Props {
    index: number;
}

function CharacterBox({ index }: Props) {

    return (
        <S.Container>
            <S.CharacterBox>
                <S.CharacterImage source={characterData[index].character} resizeMode="contain" />
            </S.CharacterBox>
        </S.Container>
    );
}

export default CharacterBox;
