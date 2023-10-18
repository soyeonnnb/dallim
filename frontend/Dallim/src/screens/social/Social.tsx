import React from 'react';
import * as S from './Social.styles'; // 스타일 컴포넌트 import
import SocialHeader from '../../components/socialComponent/SocialHeader';

function Social() {
    return (
        <S.Container>
            <S.BackgroundImage
                source={require('../../assets/images/MainBackground1.png')}
                resizeMode="cover">
                <S.Top>
                    <SocialHeader />
                </S.Top>
                <S.Middle></S.Middle>
                <S.Bottom></S.Bottom>
            </S.BackgroundImage>
        </S.Container>
    );
};

export default Social;
