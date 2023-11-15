import * as S from './GameStartStack2.styles';
import CloseIcon from '@/assets/icons/DirectionLeft_2.png';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

import AloneRunModal from '@/screens/main/GameStartStack';

interface GameStartStackProps {
  navigation: any;
}

function GameStartStack2({ navigation }: GameStartStackProps) {

  const [isAloneModalVisible, setAloneModalVisible] = useState(false);
  // const [isTogetherModalVisible, setTogetherModalVisible] = useState(false);

  // 혼자 달리기 모달 열기 & 닫기
  function RunningAlone() {
    console.log("혼자 달리기 버튼이 눌렸습니다.");
    setAloneModalVisible(true);
  }
  function closeAloneRunModal() {
    setAloneModalVisible(false);
  }

  // 같이 달리기 모달 열기 & 닫기
  function RunningTogether() {
    console.log("같이 달리기 버튼이 눌렸습니다.");
    // setTogetherModalVisible(true);
    Toast.show({
      type: 'error',
      position: 'top',
      text1: '개발 중 입니다.',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 10,
    });
  }

  return (
    <S.Container>
      <S.BackgroundImage source={require('@/assets/images/MainBackground2.png')}
        resizeMode="cover">
        <S.Header>
          <S.CloseButton onPress={() => navigation.navigate('MainMain')}>
            <S.CloseImage source={CloseIcon} />
          </S.CloseButton>
          <S.HeaderBox>
            <S.DetailText>달리기</S.DetailText>
          </S.HeaderBox>
          <S.Empty></S.Empty>
        </S.Header>

        <S.Body>
          <S.ButtonBox>
            <S.ButtonBackground source={require('@/assets/images/AloneBackground.png')}
              resizeMode="contain"
            >
              <S.RunButton onPress={RunningAlone}>
                <S.RunTop>
                  <S.MainText>혼자 달리기</S.MainText>
                </S.RunTop>
                <S.RunMiddle>
                  <S.SubText>혼자만의 기록을 세워요</S.SubText>
                </S.RunMiddle>
              </S.RunButton>
            </S.ButtonBackground>
          </S.ButtonBox>

          <S.ButtonBox>
            <S.ButtonBackground source={require('@/assets/images/TogetherBackground.png')}
              resizeMode="contain"
            >
              <S.RunButton onPress={RunningTogether}>
                <S.RunTop>
                  <S.MainText>같이 달리기</S.MainText>
                </S.RunTop>
                <S.RunMiddle>
                  <S.SubText>러닝메이트와 함께 달리며</S.SubText>
                  <S.SubText>실시간으로 기록을 비교해요</S.SubText>
                </S.RunMiddle>
              </S.RunButton>
            </S.ButtonBackground>
          </S.ButtonBox>
        </S.Body>
        <S.TabBox />
      </S.BackgroundImage>

      {/* 모달 */}
      {/* <AloneRunModal isVisible={isAloneModalVisible} onClose={closeAloneRunModal} /> */}

    </S.Container >
  );
};

export default GameStartStack2;
