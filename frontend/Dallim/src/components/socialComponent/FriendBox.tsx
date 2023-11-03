import React, { useState } from 'react';
import * as S from './Box.styles';
// import Character from '@/assets/characters/Panda.png';
// import UserDetailModal from '../../screens/social/UserDetailStack';
import { characterData } from '@/recoil/CharacterData';

type FriendBoxProps =
    {
        userId: number;
        characterIndex: number;
        nickname: string;
        level: number;
    };


function FriendBox({ userId, characterIndex, nickname, level }: FriendBoxProps) {

    const [isDetailModalVisible, setDetailModalVisible] = useState(false);

    const tempEvolutionIndex = 0;

    const selectedCharacter = characterData[characterIndex].evolutions[tempEvolutionIndex].front;

    return (
        <S.Container>
            <S.Box>
                <S.Left>
                    <S.FriendDetailButton onPress={() => {
                        console.log("친구 상세 버튼 눌림확인");
                        setDetailModalVisible(true);
                    }}>
                        <S.CharacterImage source={selectedCharacter} resizeMode='contain'/>
                    </S.FriendDetailButton>
                </S.Left>
                <S.Middle>
                    <S.NicknameText>{nickname}</S.NicknameText>
                    <S.LevelText>Lv. {level}</S.LevelText>
                </S.Middle>
                <S.Right>
                    <S.Button onPress={() => {
                        console.log("친구 삭제 버튼 눌림확인");
                    }}>
                        <S.FriendRemoveImage source={require('@/assets/icons/FriendRemoveIcon.png')} resizeMode='contain' />
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
