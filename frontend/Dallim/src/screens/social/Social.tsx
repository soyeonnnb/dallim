import React from 'react';
import * as S from './Social.styles'; // 스타일 컴포넌트 import
import SocialHeader from '../../components/socialComponent/SocialHeader';
import SocialBody from '../../components/socialComponent/SocialBody';
import SocialBottom from '../../components/socialComponent/SocialBottom';

function Social() {
    return (
        <S.Container>
            <S.BackgroundImage
                source={require('../../assets/images/MainBackground3.png')}
                resizeMode="cover">
                <S.Top>
                    <SocialHeader />
                </S.Top>
                <S.Middle>
                    <SocialBody />
                </S.Middle>
                <S.Bottom>
                    <SocialBottom />
                </S.Bottom>
                <S.TabBox />
            </S.BackgroundImage>
        </S.Container>
    );
};

export default Social;
