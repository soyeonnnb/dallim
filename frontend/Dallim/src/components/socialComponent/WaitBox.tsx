import * as S from './Box.styles';
import { deleteFriend, postRequestReject } from '@/apis/SocialApi';
import { characterData } from '@/recoil/CharacterData';

import { useRecoilState } from 'recoil';
import { friendRequestsState } from '@/recoil/FriendRecoil';

type WaitBoxProps =
    {
        userId: number;
        characterIndex: number;
        nickname: string;
        level: number;
    };


function WaitBox({ userId, characterIndex, nickname, level }: WaitBoxProps) {

    const [requestfriends, setRequestfriends] = useRecoilState(friendRequestsState);
  
    const tempEvolutionIndex = 0;
    const selectedCharacter = characterData[characterIndex].evolutions[tempEvolutionIndex].front;


    const handleRequestDenied = async () => {
        try {
            const result = await postRequestReject(userId);
            if (result) {
                console.log('친구 신청 거절 성공' + userId);
                setRequestfriends(requestfriends.filter(friend => friend.userId !== userId));
            } else {
                console.log('친구 신청 거절 실패.');
            }
        } catch (error) {
            console.error('친구 신청 거절 중 오류가 발생하였습니다.', error);
        } finally {
        }
    };

    return (
        <S.Container>
            <S.Box>
                <S.Left>
                    <S.FriendDetailButton onPress={() => {
                        console.log("유저 상세 버튼 눌림확인");
                    }}>
                        <S.CharacterImage source={selectedCharacter} resizeMode='contain' />
                    </S.FriendDetailButton>
                </S.Left>
                <S.Middle>
                    <S.NicknameText>{nickname}</S.NicknameText>
                    <S.LevelText>Lv. {level}</S.LevelText>
                </S.Middle>
                <S.Right>
                    <S.Button onPress={handleRequestDenied}>
                        <S.FriendRemoveImage source={require('@/assets/icons/FriendRemoveIcon.png')} resizeMode='contain' />
                    </S.Button>
                </S.Right>
            </S.Box>

        </S.Container>
    );
};

export default WaitBox;
