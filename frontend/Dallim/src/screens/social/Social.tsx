import React from 'react';
import * as S from './Social.styles'; // 스타일 컴포넌트 import
import SocialHeader from '../../components/socialComponent/SocialHeader';
import SocialBody from '../../components/socialComponent/SocialBody';
// import SocialFooter from '../../components/socialComponent/SocialFooter';

function Social() {
    return (
        <S.Container>
            <S.BackgroundImage
                source={require('../../assets/images/MainBackground3.png')}
                resizeMode="cover">
                <S.Header>
                    <SocialHeader />
                </S.Header>
                <S.Body>
                    <SocialBody /> 
                </S.Body>
                {/* <S.Footer>
                    <SocialFooter />
                </S.Footer> */}
                <S.TabBox />
            </S.BackgroundImage>
        </S.Container>
    );
};

export default Social;
