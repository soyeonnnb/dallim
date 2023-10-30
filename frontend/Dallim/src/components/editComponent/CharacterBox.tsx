import React from 'react';
import * as S from './CharacterBox.styles';
import { characterData } from '../common/CharacterData';

interface Props {
    selectedCharacterIndex: number;
    selectedEvolutionStage: number;
}

function CharacterBox({ selectedCharacterIndex, selectedEvolutionStage }: Props) {
    const characterImage = characterData[selectedCharacterIndex].levels[selectedEvolutionStage].front;
    
    return (
        <S.Container>
            <S.CharacterBox>
                <S.CharacterImage source={characterImage} resizeMode="contain" />
            </S.CharacterBox>
        </S.Container>
    );
}
export default CharacterBox;
