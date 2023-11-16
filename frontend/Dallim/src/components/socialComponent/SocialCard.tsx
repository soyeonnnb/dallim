import * as S from './SocialCard.styles';
import { planetData } from '@/recoil/data/PlanetData';
// import AddIcon from '@/assets/icons/AddFriendIcon'
import AddIcon from '@/assets/icons/AddFriendIcon';
import { postAddFriend } from '@/apis/SocialApi';
import { useState } from 'react';
import GuideModal from '../common/GuideModal';
import { useRecoilValue } from 'recoil';
import { userIdState } from '@/recoil/UserRecoil';

interface Props {
  userId: number;
  planetIndex: number;
  nickname: string;
  userLevel: number;
  experiencePercentage: number;
}

function SocialCard({
  userId,
  planetIndex,
  nickname,
  userLevel,
  experiencePercentage
}: Props) {

  const myId = useRecoilValue(userIdState);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleAddFriend = async (userId: number) => {
    try {
      const result = await postAddFriend(userId);
      if (result) {
        setModalText('친구 요청이 성공적으로 완료되었습니다.');
      } else {
        setModalText('친구의 수락을 기다려주세요!');
      }
      setModalVisible(true);
    } catch (error) {
      setModalText('오류가 발생했습니다. 잠시 후 다시 시도해주세요!');
      setModalVisible(true);
    }
  };

  return (
    <S.Container>
      {/* <S.BoxShadow
        distance={3}
        startColor="rgba(0, 0, 0, 0.25)"
        endColor="rgba(0, 0, 0, 0.25)"
        offset={[0, 2]}> */}
      <S.CardImageWrapper>
        <S.CardBox source={planetData[planetIndex].Card} resizeMode="cover">
          <S.Header>
            <S.HeaderLeft>
              <S.LevelText>Level {userLevel}</S.LevelText>
            </S.HeaderLeft>
            <S.HeaderRight>
              {myId !== userId && (
                <S.AddIcon>
                  <S.AddButton
                    onPress={() => {
                      handleAddFriend(userId);
                    }}>
                    <AddIcon width={30} height={30} />
                  </S.AddButton>
                </S.AddIcon>
              )}
            </S.HeaderRight>
          </S.Header>
          <S.Body>
            <S.LeftBox>
              <S.NicknameText>{nickname}</S.NicknameText>
            </S.LeftBox>
            <S.RightBox>
              <S.percentageText>{experiencePercentage}%</S.percentageText>
            </S.RightBox>
          </S.Body>
          <S.Footer>
            <S.ExperienceBox>
              <S.Experience percentage={experiencePercentage}></S.Experience>
            </S.ExperienceBox>
          </S.Footer>
        </S.CardBox>
      </S.CardImageWrapper>
      {/* </S.BoxShadow> */}

      <GuideModal
        text={modalText}
        modalVisible={modalVisible}
        toggleModal={() => setModalVisible(false)}
      />
    </S.Container>
  );
}

export default SocialCard;
