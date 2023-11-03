import * as S from './Box.styles';
import Character from '@/assets/characters/PenguinEgg.png';

type UserBoxProps = {
    userId: number;
    nickname: string;
    level: number;
    isFollower: boolean;
    onAddFriend: () => void;
};

function UserBox({ userId, nickname, level, isFollower, onAddFriend }: UserBoxProps) {

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

                    <S.Button onPress={() => {
                        console.log("친구 추가 버튼 눌림확인");
                        onAddFriend();
                    }}>
                        <S.FriendAddImage source={require('@/assets/icons/FriendAddIcon.png')} resizeMode='contain' />
                    </S.Button>

                </S.Right>
            </S.Box>

        </S.Container >
    );
};

export default UserBox;
