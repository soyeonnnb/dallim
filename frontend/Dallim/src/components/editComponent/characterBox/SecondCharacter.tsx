import React from 'react';
import * as S from './Character.styles';
import PenguinImage from '../../../assets/character/펭귄_선택.png';

function SecondCharacter() {
    return (
        <S.Container>
            <S.CharacterBox>
                <S.Rabbit source={PenguinImage} resizeMode="contain" />
            </S.CharacterBox>
        </S.Container>
    );
}

export default SecondCharacter;
