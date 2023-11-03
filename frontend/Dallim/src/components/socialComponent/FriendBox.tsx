import * as S from './Box.styles';
import { deleteFriend } from '@/apis/SocialApi';
import { characterData } from '@/recoil/CharacterData';

import { useRecoilState } from 'recoil';
import { friendsState } from '@/recoil/FriendRecoil';

type FriendBoxProps =
    {
        userId: number;
        characterIndex: number;
        nickname: string;
        level: number;
    };


function FriendBox({ userId, characterIndex, nickname, level }: FriendBoxProps) {

    const [friends, setFriends] = useRecoilState(friendsState);

    const tempEvolutionIndex = 0;
    const selectedCharacter = characterData[characterIndex].evolutions[tempEvolutionIndex].front;


    const handleDeleteFriend = async () => {
        try {
            const result = await deleteFriend(userId);
            if (result) {
                console.log('친구 삭제가 성공적으로 완료되었습니다.');
                setFriends(friends.filter(friend => friend.userId !== userId));
            } else {
                console.log('친구 삭제를 실패하였습니다.');
            }
        } catch (error) {
            console.error('친구 삭제 중 오류가 발생하였습니다.', error);
        }
    };

    return (
        <S.Container>
            <S.Box>
                <S.Left>
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
                    <S.Button onPress={handleDeleteFriend}>
                        <S.FriendRemoveImage source={require('@/assets/icons/FriendRemoveIcon.png')} resizeMode='contain' />
                    </S.Button>
                </S.Right>
            </S.Box>

        </S.Container>
    );
};

export default FriendBox;
