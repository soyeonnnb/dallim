import React, { useState } from 'react';
import * as S from './Box.styles';
import Character from '@/assets/characters/Panda.png';
// import UserDetailModal from '../../screens/social/UserDetailStack';

function FriendBox() {

    const Nickname = "아뇨스폰지밥인데요";
    const Level = 53;

    const [isDetailModalVisible, setDetailModalVisible] = useState(false);

    return (
        <S.Container>
            <S.Box>
                <S.Left>
                    <S.FriendDetailButton onPress={() => {
                        console.log("친구 상세 버튼 눌림확인");
                        setDetailModalVisible(true);
                    }}>
                        <S.CharacterImage source={Character} />
                    </S.FriendDetailButton>
                </S.Left>
                <S.Middle>
                    <S.NicknameText>{Nickname}</S.NicknameText>
                    <S.LevelText>Lv. {Level}</S.LevelText>
                </S.Middle>
                <S.Right>
                    <S.Button onPress={() => {
                        console.log("친구 삭제 버튼 눌림확인");
                    }}>
                        <S.FriendRemoveImage source={require('@/assets/icons/FriendRemoveIcon.png')} resizeMode='contain'/>
                    </S.Button>
                </S.Right>
            </S.Box>

            {/* <UserDetailModal
                isVisible={isDetailModalVisible}
                onClose={() => setDetailModalVisible(false)}
            /> */}
        </S.Container>
    );
};

export default FriendBox;
