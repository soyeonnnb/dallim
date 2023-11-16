import * as S from './Box.styles';
import { deleteFriend } from '@/apis/SocialApi';
import { characterData } from '@/recoil/data/CharacterData';

import { useRecoilState } from 'recoil';
import { friendsState } from '@/recoil/FriendRecoil';
import FriendRemoveIcon from '@/assets/icons/FriendRemoveIcon';
import { useState } from 'react';
import FriendDeleteModal from './socialModal/FriendDeleteModal';
import { LevelData } from '@/recoil/data/LevelData';

type FriendBoxProps = {
  userId: number;
  characterIndex: number;
  evolutionStage: number;
  nickname: string;
  level: number;
};

function FriendBox({
  userId,
  characterIndex,
  evolutionStage,
  nickname,
  level,
}: FriendBoxProps) {
  const [friends, setFriends] = useRecoilState(friendsState);
  const selectedCharacter =
    characterData[characterIndex].Evolutions[evolutionStage].Badge;

  const handleDeleteFriend = async () => {
    try {
      const result = await deleteFriend(userId);
      if (result) {
        setFriends(friends.filter(friend => friend.userId !== userId));
      } else {
        // console.log('친구 삭제를 실패하였습니다.');
      }
    } catch (error) {
      // console.error('친구 삭제 중 오류가 발생하였습니다.', error);
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);

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
          <S.ButtonShadow
            distance={2}
            startColor="rgba(0, 0, 0, 0.2)"
            endColor="rgba(0, 0, 0, 0.2)"
            offset={[1, 2]}>
            <S.DeleteButton onPress={() => setModalVisible(true)}>
              <FriendRemoveIcon
                width={20}
                height={20}
                color="white"></FriendRemoveIcon>
            </S.DeleteButton>
          </S.ButtonShadow>
        </S.Right>
      </S.Box>

      <FriendDeleteModal
        checkModalVisible={isModalVisible}
        handleDeleteFriend={() => handleDeleteFriend()}
        toggleCheckModal={() => setModalVisible(false)}
      />
    </S.Container>
  );
}

export default FriendBox;
