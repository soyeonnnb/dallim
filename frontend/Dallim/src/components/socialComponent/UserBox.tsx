import { postAddFriend } from '@/apis/SocialApi';
import * as S from './Box.styles';
import Character from '@/assets/characters/PenguinEgg.png';
import { characterData } from '@/recoil/CharacterData';

import { useSetRecoilState } from 'recoil';
import { friendsState } from '@/recoil/FriendRecoil';
import { useState } from 'react';

type UserBoxProps = {
    userId: number;
    characterIndex: number;
    nickname: string;
    level: number;
    isFollower: boolean;
};

function UserBox({ userId, nickname, characterIndex, level, isFollower }: UserBoxProps) {

    const setFriends = useSetRecoilState(friendsState);

    const tempEvolutionIndex = 0;
    const selectedCharacter = characterData[characterIndex].evolutions[tempEvolutionIndex].front;
    const [isFollowerCheck, setIsFollowerCheck] = useState(isFollower);


    const handleaddFriend = async (userId: number) => {
        try {
            const result = await postAddFriend(userId);
            if (result) {
                console.log('친구 요청이 성공적으로 완료');
                setIsFollowerCheck(true); // 로컬 상태 업데이트
                setFriends((oldFriendsList) => [
                    ...oldFriendsList,
                    {
                        userId: userId,
                        nickname: nickname,
                        characterIndex: characterIndex,
                        level: level,
                        isFollower: true,
                    },
                ]);

            } else {
                console.log('친구 요청이 실패');
            }
        } catch (error) {
            console.error('친구 추가 중 오류가 발생', error);
        }
    };

    return (
        <S.Container>
            <S.Box>
                <S.Left >
                    <S.FriendDetailButton onPress={() => {
                        console.log("친구 상세 버튼 눌림확인");
                    }}>
                        <S.CharacterImage source={selectedCharacter} resizeMode='contain' />
                    </S.FriendDetailButton>
                </S.Left>
                <S.Middle>
                    <S.NicknameText>{nickname}</S.NicknameText>
                    <S.LevelText>Lv. {level}</S.LevelText>
                </S.Middle>
                <S.Right>
                    {!isFollowerCheck && (
                        <S.Button onPress={() => { handleaddFriend(userId) }}>
                            <S.FriendAddImage source={require('@/assets/icons/FriendAddIcon.png')} resizeMode='contain' />
                        </S.Button>
                    )}
                </S.Right>
            </S.Box>

        </S.Container >
    );
};

export default UserBox;
