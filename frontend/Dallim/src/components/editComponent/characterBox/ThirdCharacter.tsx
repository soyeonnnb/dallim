import React from 'react';
import * as S from './Character.styles';
import PandaImage from '../../../assets/character/팬더_선택.png';

function ThirdCharacter() {
    return (
        <S.Container>
            <S.CharacterBox>
                <S.Rabbit source={PandaImage} resizeMode="contain" />
            </S.CharacterBox>
        </S.Container>
    );
}

export default ThirdCharacter;
