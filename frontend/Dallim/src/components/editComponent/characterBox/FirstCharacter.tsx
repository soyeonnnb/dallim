import React from 'react';
import * as S from './Character.styles';
import RabbitImage from '../../../assets/character/토끼_선택.png';

function FirstCharacter() {

    return (
        <S.Container>
            <S.CharacterBox>
                <S.Rabbit source={RabbitImage}  resizeMode="contain"/>
            </S.CharacterBox>
        </S.Container>
    );
}

export default FirstCharacter;
