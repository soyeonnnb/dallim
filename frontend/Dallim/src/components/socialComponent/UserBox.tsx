import { postAddFriend } from '@/apis/SocialApi';
import * as S from './Box.styles';
import { characterData } from '@/recoil/data/CharacterData';

import { useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import FriendAddIcon from '@/assets/icons/FriendAddIcon';
import GuideModal from '../common/GuideModal';
import { LevelData } from '@/recoil/data/LevelData';

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
  isFollower
}: UserBoxProps) {
  const selectedCharacter =
    characterData[characterIndex].Evolutions[evolutionStage].Badge;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddFriend = async (userId: number) => {
    try {
      const result = await postAddFriend(userId);
      if (result) {
        console.log('친구 요청이 성공적으로 완료');
        setAlertMessage('친구 요청이 완료되었습니다.');
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

  function getLevelImageIndex(userLevel: number) {
    if (userLevel <= 10) return 0;
    if (userLevel <= 20) return 1;
    if (userLevel <= 30) return 2;
    if (userLevel <= 40) return 3;
    return 4; // 50 이하인 경우
  }
  const LevelImage = LevelData[getLevelImageIndex(level)].Base;

  return (
    <S.Container>
      <S.Box>
        <S.Left>

          <S.CharacterImage source={selectedCharacter} resizeMode="contain" />
        </S.Left>
        <S.Middle>
          <S.MiddleTop>
            <S.LevelBox>
              <S.LevelImage
                source={LevelImage} resizeMode='contain' />
            </S.LevelBox>
            <S.LevelText>Lv. {level}</S.LevelText>
          </S.MiddleTop>
          <S.MiddleBottom>
            <S.NicknameText>{nickname}</S.NicknameText>
          </S.MiddleBottom>
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
      <GuideModal
        modalVisible={showAlert}
        text={alertMessage}
        toggleModal={() => {
          setShowAlert(false);
        }}></GuideModal>
    </S.Container>
  );
}

export default UserBox;
