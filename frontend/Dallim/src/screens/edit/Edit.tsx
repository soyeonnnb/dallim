import React from 'react';
import * as S from './Edit.styles'; // 스타일 컴포넌트 import
import CharacterEdit from '../../components/editComponent/CharacterEdit';

function Edit() {

    return (
        <S.Container>
            <S.BackgroundImage
                source={require('../../assets/images/MainBackground3.png')}
                resizeMode="cover">
                <S.Top>
                </S.Top>
                <S.Body>
                    <CharacterEdit />
                </S.Body>
                <S.TabBox />
            </S.BackgroundImage>
        </S.Container>
    );
};

export default Edit;
