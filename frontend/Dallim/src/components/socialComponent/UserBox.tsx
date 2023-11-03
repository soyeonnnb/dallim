import { postAddFriend } from '@/apis/SocialApi';
import * as S from './Box.styles';
import Character from '@/assets/characters/PenguinEgg.png';

type UserBoxProps = {
    userId: number;
    nickname: string;
    level: number;
    isFollower: boolean;
};

function UserBox({ userId, nickname, level, isFollower }: UserBoxProps) {

    const handleaddFriend = async (userId: number) => {
        try {
            const result = await postAddFriend(userId);
            if (result) {
                console.log('친구 요청이 성공적으로 완료');
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
                        <S.CharacterImage source={Character} resizeMode='contain' />
                    </S.FriendDetailButton>
                </S.Left>
                <S.Middle>
                    <S.NicknameText>{nickname}</S.NicknameText>
                    <S.LevelText>Lv. {level}</S.LevelText>
                </S.Middle>
                <S.Right>
                    {!isFollower && (
                        <S.Button onPress={() => {handleaddFriend(userId)}}>
                            <S.FriendAddImage source={require('@/assets/icons/FriendAddIcon.png')} resizeMode='contain' />
                        </S.Button>
                    )}
                </S.Right>
            </S.Box>

        </S.Container >
    );
};

export default UserBox;
