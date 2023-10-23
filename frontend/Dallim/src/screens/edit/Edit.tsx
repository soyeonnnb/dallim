import React from 'react';
import * as S from './Edit.styles'; // 스타일 컴포넌트 import

function Edit() {
    return (
        <S.Container>
            <S.BackgroundImage
                source={require('../../assets/images/MainBackground3.png')}
                resizeMode="cover">
                <S.Top>
                </S.Top>
                <S.Middle>
                </S.Middle>
                <S.Bottom>
                </S.Bottom>
                <S.TabBox />
            </S.BackgroundImage>
        </S.Container>
    );
};

export default Edit;
