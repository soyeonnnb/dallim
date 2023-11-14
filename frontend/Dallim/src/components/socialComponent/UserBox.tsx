import {postAddFriend} from '@/apis/SocialApi';
import * as S from './Box.styles';
import {characterData} from '@/recoil/CharacterData';

import {useState} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import FriendAddIcon from '@/assets/icons/FriendAddIcon';

type UserBoxProps = {
  userId: number;
  characterIndex: number;
  evolutionStage: number;
  nickname: string;
  level: number;
  isFollower: boolean;
};

function UserBox({
  userId,
  nickname,
  characterIndex,
  evolutionStage,
  level,
  isFollower,
}: UserBoxProps) {
  const selectedCharacter =
    characterData[characterIndex].evolutions[evolutionStage].profile;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddFriend = async (userId: number) => {
    try {
      const result = await postAddFriend(userId);
      if (result) {
        console.log('친구 요청이 성공적으로 완료');
        setAlertMessage('친구 요청이 성공적으로 완료되었습니다.');
        setShowAlert(true);
      } else {
        setAlertMessage('친구의 수락을 기다려주세요!');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('친구 추가 중 오류가 발생', error);
      setAlertMessage('오류가 발생했습니다. 잠시후 다시 시도해주세요!');
      setShowAlert(true);
    }
  };

  return (
    <S.Container>
      <S.Box>
        <S.Left>
          {/* <S.FriendDetailButton onPress={() => {
                        console.log("친구 상세 버튼 눌림확인");
                    }}> */}
          <S.CharacterImage source={selectedCharacter} resizeMode="contain" />
          {/* </S.FriendDetailButton> */}
        </S.Left>
        {/* <S.EmptyBox></S.EmptyBox> */}
        <S.Middle>
          <S.LevelText>Lv. {level}</S.LevelText>
          <S.NicknameText>{nickname}</S.NicknameText>
        </S.Middle>
        <S.Right>
          {!isFollower && (
            <S.ButtonShadow
              distance={2}
              startColor="rgba(0, 0, 0, 0.2)"
              endColor="rgba(0, 0, 0, 0.2)"
              offset={[1, 2]}>
              <S.Button
                onPress={() => {
                  handleAddFriend(userId);
                }}>
                {/* <S.FriendAddImage
                source={require('@/assets/icons/FriendAddIcon.png')}
                resizeMode="contain"
              /> */}
                <FriendAddIcon
                  width={25}
                  height={25}
                  color="white"></FriendAddIcon>
              </S.Button>
            </S.ButtonShadow>
          )}
        </S.Right>
      </S.Box>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="안내사항"
        message={alertMessage}
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
    </S.Container>
  );
}

export default UserBox;
