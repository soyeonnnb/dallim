import React from 'react';
import * as S from './FriendBox.styles';
import Character from '../../assets/character/팬더.png';

function FriendBox() {

    const Nickname = "아뇨스폰지밥인데요";
    const Level = 53;
    // React Native에서 이미지 경로를 require 함수로 직접 로드해야 한대요.
    // const Character = '../../assets/character/팬더.png'; 

    return (
        <S.Container>
            <S.Box>
                <S.Left>
                    <S.CharacterImage source={Character} />
                </S.Left>
                <S.Middle>
                    <S.NicknameText>{Nickname}</S.NicknameText>
                    <S.LevelText>Lv. {Level}</S.LevelText>
                </S.Middle>
                <S.Right>
                    <S.FriendRemoveButton onPress={() => {
                        console.log("친구 삭제 버튼 눌림확인");
                    }}>
                        <S.FriendRemoveImage source={require('../../assets/icons/FriendRemoveIcon.png')} />
                    </S.FriendRemoveButton>
                    <S.FriendDetailButton onPress={() => {
                        console.log("친구 상세 버튼 눌림확인");
                    }}>
                        <S.FriendDetailImage source={require('../../assets/icons/FriendDetailIcon.png')} />
                    </S.FriendDetailButton>
                </S.Right>
            </S.Box>
        </S.Container>
    );
};

export default FriendBox;
