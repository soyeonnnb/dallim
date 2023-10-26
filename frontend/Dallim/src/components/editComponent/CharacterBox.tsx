import React from 'react';
import * as S from './CharacterBox.styles';
import { characterData } from '../../components/editComponent/CharacterData';

interface Props {
    index: number;
}

function CharacterBox({ index }: Props) {

    // // Test
    // const gifSources = {
    //     1: require('../../assets/character/펭런_1.gif'),
    //     2: require('../../assets/character/펭런_2.gif'),
    //     3: require('../../assets/character/펭런_3.gif')
    // };
    // const gifSourcesIndex = 3;

    return (
        <S.Container>
            <S.CharacterBox>
                <S.CharacterImage source={characterData[index].character} resizeMode="contain" />
                {/* <S.StyledGif source={gifSources[gifSourcesIndex]} /> */}
            </S.CharacterBox>
        </S.Container>
    );
}

export default CharacterBox;
