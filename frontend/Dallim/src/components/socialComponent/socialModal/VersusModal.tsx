import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import * as S from './VersusModal.styles';
import {characterData} from '@/recoil/CharacterData';
import CloseIcon from '@/assets/icons/DirectionLeft_2.png';
import QuestionIcon from '@/assets/icons/QuestionIcon.png';
import AwesomeAlert from 'react-native-awesome-alerts';
import {fetchCompare} from '@/apis/SocialApi';

interface Props {
  userId: number;
  isVisible: boolean;
  onClose: () => void;
}

const VersusModal: React.FC<Props> = ({userId, isVisible, onClose}) => {
  const [userData, setUserData] = useState({
    myCharacterIndex: 0,
    myEvolutionStage: 0,
    myNickName: '',
    myLevel: 0,
    myDay: 0,
    myTime: 0,
    myDistance: 0,
    mySpeed: 0,
    pairCharacterIndex: 0,
    pairEvolutionStage: 0,
    pairNickName: '',
    pairLevel: 0,
    pairDay: 0,
    pairTime: 0,
    pairDistance: 0,
    pairSpeed: 0,
  });

  const {
    myCharacterIndex,
    myEvolutionStage,
    myNickName,
    myLevel,
    myDay,
    myTime,
    myDistance,
    mySpeed,
    pairCharacterIndex,
    pairEvolutionStage,
    pairNickName,
    pairLevel,
    pairDay,
    pairTime,
    pairDistance,
    pairSpeed,
  } = userData;

  const myCharacterImage =
    characterData[myCharacterIndex].evolutions[myEvolutionStage].front;
  const pairCharacterImage =
    characterData[pairCharacterIndex].evolutions[pairEvolutionStage].front;

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const response = await fetchCompare(userId);
        console.log('비교 정보 조회 Axios 성공 ', response);
        setUserData(response);
      } catch (error) {
        console.error('비교 정보 조회 Axios 실패 ');
      }
    };
    loadUserInfo();
  }, [userId]);

  const computeRate = (myValue: number, otherValue: number) => {
    const totalValue = myValue + otherValue;
    return {
      myRate: (myValue / totalValue) * 100,
      otherRate: (otherValue / totalValue) * 100,
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
      onRequestClose={onClose}>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover">
        <S.ModalContainer>
          <S.ModalContent>
            <S.Header>
              <S.HeaderLeft>
                <S.CloseButton onPress={onClose}>
                  <S.CloseImage source={CloseIcon} resizeMode="contain" />
                </S.CloseButton>
              </S.HeaderLeft>
              <S.HeaderCenter>
                <S.Title>비교하기</S.Title>
              </S.HeaderCenter>
              <S.HeaderRight>
                <S.HeaderRightBox onPress={() => setShowAlert(true)}>
                  <S.QuestionImage source={QuestionIcon} resizeMode="contain" />
                </S.HeaderRightBox>
              </S.HeaderRight>
            </S.Header>

            <S.Body>
              <S.BodyBackground
                source={require('@/assets/images/VersusBackground.png')}
                resizeMode="cover">
                <S.BodyLeft>
                  <S.InfoTop>
                    <S.CharacterImage
                      source={myCharacterImage}
                      resizeMode="contain"
                    />
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
                    <S.CharacterImage
                      source={pairCharacterImage}
                      resizeMode="contain"
                    />
                  </S.InfoTop>
                  <S.InfoMiddle>
                    <S.NicknameText>{pairNickName}</S.NicknameText>
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
                  <S.LeftTextBox>
                    <S.RateLeftText>{myDay}일</S.RateLeftText>
                  </S.LeftTextBox>
                  <S.MiddleTextBox>
                    <S.FooterText>출석</S.FooterText>
                  </S.MiddleTextBox>
                  <S.RightTextBox>
                    <S.RateRightText>{pairDay}일</S.RateRightText>
                  </S.RightTextBox>
                </S.FooterTextBox>
                <S.FooterBarBox>
                  <S.RateBarBox>
                    <S.MyDataBar widthPercentage={dayRates.myRate} />
                    <S.OtherDataBar widthPercentage={dayRates.otherRate} />
                  </S.RateBarBox>
                </S.FooterBarBox>
              </S.FooterBox>

              <S.FooterBox>
                <S.FooterTextBox>
                  <S.LeftTextBox>
                    {/* 초 */}
                    <S.RateLeftText>{myTime.toFixed(1)}시간</S.RateLeftText>
                  </S.LeftTextBox>
                  <S.MiddleTextBox>
                    <S.FooterText>시간</S.FooterText>
                  </S.MiddleTextBox>
                  <S.RightTextBox>
                    <S.RateRightText>{pairTime.toFixed(1)}시간</S.RateRightText>
                  </S.RightTextBox>
                </S.FooterTextBox>
                <S.FooterBarBox>
                  <S.RateBarBox>
                    <S.MyDataBar widthPercentage={timeRates.myRate} />
                    <S.OtherDataBar widthPercentage={timeRates.otherRate} />
                  </S.RateBarBox>
                </S.FooterBarBox>
              </S.FooterBox>

              <S.FooterBox>
                <S.FooterTextBox>
                  <S.LeftTextBox>
                    {/* 미터 */}
                    <S.RateLeftText>{myDistance.toFixed(1)}km</S.RateLeftText>
                  </S.LeftTextBox>
                  <S.MiddleTextBox>
                    <S.FooterText>거리</S.FooterText>
                  </S.MiddleTextBox>
                  <S.RightTextBox>
                    <S.RateRightText>
                      {pairDistance.toFixed(1)}km
                    </S.RateRightText>
                  </S.RightTextBox>
                </S.FooterTextBox>
                <S.FooterBarBox>
                  <S.RateBarBox>
                    <S.MyDataBar widthPercentage={distRates.myRate} />
                    <S.OtherDataBar widthPercentage={distRates.otherRate} />
                  </S.RateBarBox>
                </S.FooterBarBox>
              </S.FooterBox>

              <S.FooterBox>
                <S.FooterTextBox>
                  <S.LeftTextBox>
                    {/*  초 */}
                    <S.RateLeftText>{mySpeed.toFixed(1)}m/s</S.RateLeftText>
                  </S.LeftTextBox>
                  <S.MiddleTextBox>
                    <S.FooterText>페이스</S.FooterText>
                  </S.MiddleTextBox>
                  <S.RightTextBox>
                    <S.RateRightText>
                      {pairSpeed.toFixed(1)}km/h
                    </S.RateRightText>
                  </S.RightTextBox>
                </S.FooterTextBox>
                <S.FooterBarBox>
                  <S.RateBarBox>
                    <S.MyDataBar widthPercentage={speedRates.myRate} />
                    <S.OtherDataBar widthPercentage={speedRates.otherRate} />
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
        message={'누적 데이터 기준입니다.'}
        closeOnTouchOutside={true}
        onDismiss={() => {
          setShowAlert(false);
        }}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="확인"
        confirmButtonColor="gray"
        contentContainerStyle={{width: 200, height: 150}}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </Modal>
  );
};

export default VersusModal;
