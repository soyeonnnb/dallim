
import React, { useState } from 'react';
import { Modal } from 'react-native';
import * as S from './VersusModal.styles';
import { characterData } from '@/recoil/CharacterData';
import CloseIcon from '@/assets/icons/DirectionLeft_2.png';
import QuestionIcon from '@/assets/icons/QuestionIcon.png';
import AwesomeAlert from 'react-native-awesome-alerts';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const VersusModal: React.FC<Props> = ({ isVisible, onClose }) => {

  const myNickName = "나는야 펭소";
  const myCharacterIndex = 0;
  const myEvolutionStage = 1;
  const myLevel = 12;
  const myDay = 12;
  const myTime = 60;
  const myDistance = 25;
  const mySpeed = 15;
  const myCharacterImage = characterData[myCharacterIndex].evolutions[myEvolutionStage].front;

  const pairNickname = "배고픈 하마";
  const pairCharacterIndex = 3;
  const pairEvolutionStage = 0;
  const pairLevel = 21;
  const pairDay = 10;
  const pairTime = 30;
  const pairDistance = 50;
  const pairSpeed = 20;
  const pairCharacterImage = characterData[pairCharacterIndex].evolutions[pairEvolutionStage].front;

  const computeRate = (myValue: number, otherValue: number) => {
    const totalValue = myValue + otherValue;
    return {
      myRate: (myValue / totalValue) * 100,
      otherRate: (otherValue / totalValue) * 100
    };
  };

  const dayRates = computeRate(myDay, pairDay);
  const timeRates = computeRate(myTime, pairTime);
  const distRates = computeRate(myDistance, pairDistance);
  const speedRates = computeRate(mySpeed, pairSpeed);

  const [showAlert, setShowAlert] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >

      <S.BackgroundImage source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover">
        <S.ModalContainer>

          <S.ModalContent>
            <S.Header>
              <S.HeaderLeft>
                <S.CloseButton onPress={onClose}>
                  <S.CloseImage source={CloseIcon} resizeMode='contain' />
                </S.CloseButton>
              </S.HeaderLeft>
              <S.HeaderCenter>
                <S.Title>비교하기</S.Title>
              </S.HeaderCenter>
              <S.HeaderRight>
                <S.HeaderRightBox onPress={() => setShowAlert(true)}>
                  <S.QuestionImage source={QuestionIcon} resizeMode='contain' />
                </S.HeaderRightBox>
              </S.HeaderRight>
            </S.Header>


            <S.Body>
              <S.BodyBackground source={require('@/assets/images/VersusBackground.png')} resizeMode='cover'>
                <S.BodyLeft>
                  <S.InfoTop>
                    <S.CharacterImage source={myCharacterImage} resizeMode='contain' />
                  </S.InfoTop>
                  <S.InfoMiddle>
                    <S.NicknameText>{myNickName}</S.NicknameText>
                  </S.InfoMiddle>
                  <S.InfoBottom>
                    <S.LevelText>Lv. {myLevel}</S.LevelText>
                  </S.InfoBottom>
                </S.BodyLeft>

                <S.BodyRigth>
                  <S.InfoTop>
                    <S.CharacterImage source={pairCharacterImage} resizeMode='contain' />
                  </S.InfoTop>
                  <S.InfoMiddle>
                    <S.NicknameText>{pairNickname}</S.NicknameText>
                  </S.InfoMiddle>
                  <S.InfoBottom>
                    <S.LevelText>Lv. {pairLevel}</S.LevelText>
                  </S.InfoBottom>
                </S.BodyRigth>

              </S.BodyBackground>
            </S.Body>


            <S.Footer>
              <S.FooterBox>
                <S.FooterTextBox>
                  <S.FooterText>출석</S.FooterText>
                </S.FooterTextBox>
                <S.FooterBarBox>
                  <S.RateBarBox>
                    <S.MyDataBar widthPercentage={dayRates.myRate} >
                      <S.RateLeftText>{myDay}일</S.RateLeftText>
                    </S.MyDataBar>
                    <S.OtherDataBar widthPercentage={dayRates.otherRate} >
                      <S.RateRightText>{pairDay}일</S.RateRightText>
                    </S.OtherDataBar>
                  </S.RateBarBox>
                </S.FooterBarBox>
              </S.FooterBox>
              <S.FooterBox>
                <S.FooterTextBox>
                  <S.FooterText>시간</S.FooterText>
                </S.FooterTextBox>
                <S.FooterBarBox>
                  <S.RateBarBox>
                    <S.MyDataBar widthPercentage={timeRates.myRate} >
                      <S.RateLeftText>{myTime.toFixed(1)}시간</S.RateLeftText>
                    </S.MyDataBar>
                    <S.OtherDataBar widthPercentage={timeRates.otherRate} >
                      <S.RateRightText>{pairTime.toFixed(1)}시간</S.RateRightText>

                    </S.OtherDataBar>
                  </S.RateBarBox>
                </S.FooterBarBox>
              </S.FooterBox>
              <S.FooterBox>
                <S.FooterTextBox>
                  <S.FooterText>거리</S.FooterText>
                </S.FooterTextBox>
                <S.FooterBarBox>
                  <S.RateBarBox>
                    <S.MyDataBar widthPercentage={distRates.myRate} >
                      <S.RateLeftText>{myDistance.toFixed(1)}km</S.RateLeftText>

                    </S.MyDataBar>
                    <S.OtherDataBar widthPercentage={distRates.otherRate} >
                      <S.RateRightText>{pairDistance.toFixed(1)}km</S.RateRightText>

                    </S.OtherDataBar>
                  </S.RateBarBox>
                </S.FooterBarBox>
              </S.FooterBox>
              <S.FooterBox>
                <S.FooterTextBox>
                  <S.FooterText>속도</S.FooterText>
                </S.FooterTextBox>
                <S.FooterBarBox>
                  <S.RateBarBox>
                    <S.MyDataBar widthPercentage={speedRates.myRate} >
                      <S.RateLeftText>{mySpeed.toFixed(1)}km/h</S.RateLeftText>
                    </S.MyDataBar>
                    <S.OtherDataBar widthPercentage={speedRates.otherRate} >
                      <S.RateRightText>{pairSpeed.toFixed(1)}km/h</S.RateRightText>
                    </S.OtherDataBar>
                  </S.RateBarBox>
                </S.FooterBarBox>
              </S.FooterBox>
            </S.Footer>
          </S.ModalContent>
        </S.ModalContainer>

      </S.BackgroundImage>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="😆"
        message={"데이터 누적 기준입니다."}
        closeOnTouchOutside={true}
        onDismiss={() => {
          setShowAlert(false);
        }}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="확인"
        confirmButtonColor="gray"
        contentContainerStyle={{ width: 200, height: 150 }}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />

    </Modal>
  );
};

export default VersusModal;
