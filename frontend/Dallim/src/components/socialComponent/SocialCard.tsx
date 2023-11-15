import * as S from './SocialCard.styles';
import {planetData} from '@/recoil/data/PlanetData';
// import AddIcon from '@/assets/icons/AddFriendIcon'
import AddIcon from '@/assets/icons/AddFriendIcon';
import {postAddFriend} from '@/apis/SocialApi';
import {useState} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

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
  experiencePercentage,
}: Props) {
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
              <S.AddIcon>
                <S.AddButton
                  onPress={() => {
                    handleAddFriend(userId);
                  }}>
                  <AddIcon width={30} height={30} />
                </S.AddButton>
              </S.AddIcon>
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

export default SocialCard;
