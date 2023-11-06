import { postAddFriend } from '@/apis/SocialApi';
import * as S from './Box.styles';
import { characterData } from '@/recoil/CharacterData';

import { useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

type UserBoxProps = {
    userId: number;
    characterIndex: number;
    evolutionStage: number;
    nickname: string;
    level: number;
    isFollower: boolean;
};

function UserBox({ userId, nickname, characterIndex, evolutionStage, level, isFollower }: UserBoxProps) {

    const selectedCharacter = characterData[characterIndex].evolutions[evolutionStage].front;
    const [showAlert, setShowAlert] = useState(false);

    const handleaddFriend = async (userId: number) => {
        try {
            const result = await postAddFriend(userId);
            if (result) {
                console.log('친구 요청이 성공적으로 완료');
                
            } else {
                console.log('친구 요청이 실패');
                setShowAlert(true);
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
                    {!isFollower && (
                        <S.Button onPress={() => { handleaddFriend(userId) }}>
                            <S.FriendAddImage source={require('@/assets/icons/FriendAddIcon.png')} resizeMode='contain' />
                        </S.Button>
                    )}
                </S.Right>
            </S.Box>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="안내사항"
                message="상대가 친구 수락을 대기중입니다."
                closeOnTouchOutside={true}
                onDismiss={() => {
                    setShowAlert(false);
                }}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="확인"
                confirmButtonColor="blue"
                onConfirmPressed={() => {
                    setShowAlert(false);
                }}
            />
        </S.Container >
    );
};

export default UserBox;
