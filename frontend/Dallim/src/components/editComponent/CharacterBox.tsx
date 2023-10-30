import React from 'react';
import * as S from './CharacterBox.styles';
import { characterData } from '../common/CharacterData';


interface Props {
    selectedCharacterIndex: number;
    selectedEvolutionStage: number;
    selectedCharacterPurchased: boolean;
}

function CharacterBox({ selectedCharacterIndex, selectedEvolutionStage, selectedCharacterPurchased }: Props) {
    const characterImage = characterData[selectedCharacterIndex].levels[selectedEvolutionStage].front;

    return (
        <S.Container>
            <S.CharacterBox>
                {selectedCharacterPurchased ? (
                    <S.CharacterImage source={characterImage} resizeMode="contain" />
                ) : (
                    <S.BlurredCharacterImage source={characterImage} resizeMode="contain" />
                )}
            </S.CharacterBox>
        </S.Container>
    );
}
export default CharacterBox;
