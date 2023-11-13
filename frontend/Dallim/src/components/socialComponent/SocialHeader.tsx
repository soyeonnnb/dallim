import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import * as S from './SocialHeader.styles';
import FriendManageModal from './socialModal/FriendManageModal';
// import QuestionIcon from '@/assets/icons/QuestionIcon.png';
// import AwesomeAlert from 'react-native-awesome-alerts';
import {Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//modal
import GuideModal from '../common/GuideModal';

//icon
import FriendListIcon from '@/assets/icons/FriendListIcon';
import QuestionIcon from '@/assets/icons/QuestionIcon';

type SocialHeaderProps = {
  month: number | null;
  week: number | null;
};

function SocialHeader({month, week}: SocialHeaderProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonFadeAnim] = useState(new Animated.Value(0));
  const [showGuideModal, setShowGuideModal] = useState(false);

  // '친구관리' 버튼 애니메이션
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonFadeAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonFadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.HeaderEmpty></S.HeaderEmpty>
        <S.HeaderContent>
          <S.HeaderLeft>
            <S.DateText>
              {month}월 {week}주차 랭킹
            </S.DateText>
          </S.HeaderLeft>
          <S.HeaderRight>
            <S.ManageButton onPress={() => setModalVisible(true)}>
              <LinearGradient
                colors={['rgba(106, 99, 190, 0.8)', 'rgba(36, 31, 90, 0.8)']}
                style={{
                  borderRadius: 18,
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}>
                <FriendListIcon
                  height={25}
                  width={25}
                  color="white"></FriendListIcon>
              </LinearGradient>
            </S.ManageButton>
          </S.HeaderRight>
        </S.HeaderContent>
      </S.Header>
      <S.Body>
        <S.BodySideBox></S.BodySideBox>
        <S.BodyBox>
          <S.RankText>RANKING</S.RankText>
        </S.BodyBox>
        <S.BodySideBox>
          <TouchableOpacity onPress={() => setShowGuideModal(true)}>
            <QuestionIcon width={15} height={15} color="white"></QuestionIcon>
          </TouchableOpacity>
        </S.BodySideBox>
      </S.Body>

      <FriendManageModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <GuideModal
        text="랭킹은 거리순입니다."
        modalVisible={showGuideModal}
        toggleModal={() => setShowGuideModal(false)}
      />
    </S.Container>
  );
}

export default SocialHeader;
