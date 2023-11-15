import * as S from './Box.styles';
import {deleteFriend} from '@/apis/SocialApi';
import {characterData} from '@/recoil/CharacterData';

import {useRecoilState} from 'recoil';
import {friendsState} from '@/recoil/FriendRecoil';
import FriendRemoveIcon from '@/assets/icons/FriendRemoveIcon';
import {useState} from 'react';
import FriendDeleteModal from './socialModal/FriendDeleteModal';

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
    characterData[characterIndex].evolutions[evolutionStage].profile;

  console.log('캐릭인덱스' + characterIndex);
  console.log('진화레벨' + evolutionStage);
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

  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <S.Container>
      <S.Box>
        <S.Left>
          <S.FriendDetailButton
            onPress={() => {
              console.log('친구 상세 버튼 눌림확인');
            }}>
            <S.CharacterImage source={selectedCharacter} resizeMode="contain" />
          </S.FriendDetailButton>
        </S.Left>
        <S.MiddleDelete>
          <S.LevelText>Lv. {level}</S.LevelText>
          <S.NicknameText>{nickname}</S.NicknameText>
        </S.MiddleDelete>
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
