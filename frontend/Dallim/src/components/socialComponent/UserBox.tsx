import React, { useState } from 'react';
import * as S from './UserBox.styles';
import Character from '@/assets/characters/Penguin.png';
import UserDetailModal from '../../screens/social/UserDetailStack';

function UserBox() {

    const Nickname = "아뇨플랑크톤인데요";
    const Level = 66;

    const [isDetailModalVisible, setDetailModalVisible] = useState(false);

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
                    <S.FriendAddButton onPress={() => {
                        console.log("친구 추가 버튼 눌림확인");
                    }}>
                        <S.FriendAddImage source={require('../../assets/icons/FriendAddIcon.png')} />
                    </S.FriendAddButton>
                    <S.FriendDetailButton onPress={() => {
                        console.log("친구 상세 버튼 눌림확인");
                        setDetailModalVisible(true);  
                    }}>
                        <S.FriendDetailImage source={require('../../assets/icons/FriendDetailIcon.png')} />
                    </S.FriendDetailButton>
                </S.Right>
            </S.Box>

            <UserDetailModal 
                isVisible={isDetailModalVisible}
                onClose={() => setDetailModalVisible(false)} 
            />
        </S.Container>
    );
};

export default UserBox;
