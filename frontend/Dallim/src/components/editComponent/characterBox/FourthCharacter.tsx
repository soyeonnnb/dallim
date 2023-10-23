import React from 'react';
import * as S from './Character.styles';
import ChickImage from '../../../assets/character/병아리_선택.png';

function FourthCharacter() {

    return (
        <S.Container>
            <S.CharacterBox>
                <S.Rabbit source={ChickImage} resizeMode="contain" />
            </S.CharacterBox>
        </S.Container>
    );
}

export default FourthCharacter;
