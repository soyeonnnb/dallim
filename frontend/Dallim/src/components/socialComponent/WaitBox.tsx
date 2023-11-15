import * as S from './Box.styles';
import {postRequestAccept, postRequestReject} from '@/apis/SocialApi';
import {characterData} from '@/recoil/data/CharacterData';

import {useRecoilState} from 'recoil';
import {friendRequestsState, friendsState} from '@/recoil/FriendRecoil';
import AccpetIcon from '@/assets/icons/AcceptIcon';
import DenyIcon from '@/assets/icons/DenyIcon';
import { CustomToast } from '@/components/common/toast/CustomToast';

type WaitBoxProps = {
  userId: number;
  characterIndex: number;
  evolutionStage: number;
  nickname: string;
  level: number;
};

function WaitBox({
  userId,
  characterIndex,
  evolutionStage,
  nickname,
  level,
}: WaitBoxProps) {
  const [requestFriends, setRequestFriends] =
    useRecoilState(friendRequestsState);
  const [friends, setFriends] = useRecoilState(friendsState); // 친구 목록 상태

  const selectedCharacter =
    characterData[characterIndex].Evolutions[evolutionStage].Badge;

  const handleRequestAccept = async () => {
    try {
      const result = await postRequestAccept(userId);
      // console.log("userId " + userId)
      if (result) {
        CustomToast({ type: 'success', text1: '친구를 수락하셨습니다.' });
        console.log('친구 신청 수락 성공' + userId);
        // 요청 목록에서 제거합니다.
        setRequestFriends(
          requestFriends.filter(friend => friend.userId !== userId),
        );
        // 친구 목록에 추가합니다.
        const acceptedFriend = requestFriends.find(
          friend => friend.userId === userId,
        );
        if (acceptedFriend) {
          setFriends([...friends, acceptedFriend]);
        }
      } else {
        console.log('친구 신청 수락 실패.');
      }
    } catch (error) {
      console.error('친구 신청 수락 중 오류가 발생하였습니다.', error);
    }
  };

  const handleRequestDenied = async () => {
    try {
      const result = await postRequestReject(userId);
      if (result) {
        CustomToast({ type: 'error', text1: '친구를 거절하셨습니다.' });
        console.log('친구 신청 거절 성공' + userId);
        setRequestFriends(
          requestFriends.filter(friend => friend.userId !== userId),
        );
      } else {
        console.log('친구 신청 거절 실패.');
      }
    } catch (error) {
      console.error('친구 신청 거절 중 오류가 발생하였습니다.', error);
    }
  };

  return (
    <S.Container>
      <S.Box>
        <S.Left>
          <S.FriendDetailButton
            onPress={() => {
              console.log('유저 상세 버튼 눌림확인');
            }}>
            <S.CharacterImage source={selectedCharacter} resizeMode="contain" />
          </S.FriendDetailButton>
        </S.Left>
        <S.Middle_Wait>
          <S.LevelText>Lv. {level}</S.LevelText>
          <S.NicknameText>{nickname}</S.NicknameText>
        </S.Middle_Wait>
        <S.Right_Wait>
          {/* 수락버튼 */}
          <S.Button_AcceptWait>
            <S.ButtonShadow
              distance={2}
              startColor="rgba(0, 0, 0, 0.2)"
              endColor="rgba(0, 0, 0, 0.2)"
              offset={[1, 2]}>
              <S.Button_Wait onPress={handleRequestAccept}>
                <AccpetIcon height={20} width={20} color="white"></AccpetIcon>
              </S.Button_Wait>
            </S.ButtonShadow>
          </S.Button_AcceptWait>
          <S.Button_DenyWait>
            <S.ButtonShadow
              distance={2}
              startColor="rgba(0, 0, 0, 0.2)"
              endColor="rgba(0, 0, 0, 0.2)"
              offset={[1, 2]}>
              {/* 거절버튼 */}
              <S.Button_Delete onPress={handleRequestDenied}>
                <DenyIcon height={20} width={20} color="white"></DenyIcon>
              </S.Button_Delete>
            </S.ButtonShadow>
          </S.Button_DenyWait>
        </S.Right_Wait>
      </S.Box>
    </S.Container>
  );
}

export default WaitBox;
