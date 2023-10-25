import React from 'react';
import * as S from './SocialHeader.styles';

function SocialHeader() {
    const Nickname = "하늘을 나는 병아리";
    const Level = 53;
    // React Native에서 이미지 경로를 require 함수로 직접 로드해야 한대요.
    // const Character = '../../assets/character/병아리.png'; 
    const Rank = 2;

    return (
        <S.Container>
            <S.BackgroundImage
                source={require('../../assets/images/SocialHeaderBackground.png')}
                resizeMode="cover">
                <S.Left>
                    <S.CharacterImage source={require('../../assets/character/병아리_선택.png')} />
                </S.Left>
                <S.Middle>
                    <S.NicknameText>{Nickname}</S.NicknameText>
                    <S.LevelText>레벨 {Level}</S.LevelText>
                </S.Middle>
                <S.Right>
                    <S.RankText># {Rank}</S.RankText>
                </S.Right>
            </S.BackgroundImage>
        </S.Container>
    );
};

export default SocialHeader;
