import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import * as S from './VersusModal.styles';
import {characterData} from '@/recoil/CharacterData';
// import CloseIcon from '@/assets/icons/DirectionLeft_2.png';
import DirectionLeftIcon from '@/assets/icons/DirectionLeftIcon';
// import QuestionIcon from '@/assets/icons/QuestionIcon.png';
import AwesomeAlert from 'react-native-awesome-alerts';
import {fetchCompare} from '@/apis/SocialApi';
import QuestionIcon from '@/assets/icons/QuestionIcon';
import GuideModal from '@/components/common/GuideModal';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import {
  calculatePace,
  meterToKMOrMeter,
  secondToHourMinuteSecondText,
  secondToMinuteText,
} from '@/recoil/RunningData';
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
                  <DirectionLeftIcon width={30} height={30}></DirectionLeftIcon>
                </S.CloseButton>
              </S.HeaderLeft>
              <S.EmptyBox></S.EmptyBox>
              <S.EmptyBox></S.EmptyBox>
              <S.HeaderCenter>
                <S.CenterLeft></S.CenterLeft>
                <S.CenterBox>
                  <S.Title>비교하기</S.Title>
                </S.CenterBox>
                {/* <S.CenterLeft> */}
                <S.HeaderRightBox onPress={() => setShowAlert(true)}>
                  <QuestionIcon
                    width={15}
                    height={15}
                    color="white"></QuestionIcon>
                </S.HeaderRightBox>
                {/* </S.CenterLeft> */}
              </S.HeaderCenter>
              <S.HeaderRight></S.HeaderRight>
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
                <S.EmptyBox></S.EmptyBox>
                <S.EmptyBox></S.EmptyBox>

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
                    <S.MyDataBar widthPercentage={dayRates.myRate}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        colors={['#CB5CFD', '#4737D9']}
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          // borderRadius: 15,
                          // flexDirection: 'row',
                        }}>
                        <RadialGradient
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 50,
                            opacity: 0.2,
                            justifyContent: 'center',
                            alignContent: 'center',
                            overflow: 'hidden',
                          }}
                          colors={['#ffffff', '#3D2FBF']}
                          stops={[0, 0.5]}
                          radius={500}
                          center={[50, 100]}></RadialGradient>
                      </LinearGradient>
                    </S.MyDataBar>
                    <S.OtherDataBar widthPercentage={dayRates.otherRate}>
                      <LinearGradient
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 1}}
                        colors={['#6EE2F5', '#6454F0']}
                        style={{
                          height: '100%',
                          width: '100%',
                          overflow: 'hidden',
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          // flexDirection: 'row',
                        }}>
                        <RadialGradient
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 50,
                            opacity: 0.3,
                            justifyContent: 'center',
                            alignContent: 'center',
                            overflow: 'hidden',
                          }}
                          colors={['#ffffff', '#A890FF']}
                          stops={[0, 0.3]}
                          radius={500}
                          center={[50, 100]}></RadialGradient>
                      </LinearGradient>
                    </S.OtherDataBar>
                  </S.RateBarBox>
                </S.FooterBarBox>
              </S.FooterBox>

              <S.FooterBox>
                <S.FooterTextBox>
                  <S.LeftTextBox>
                    {/* 초 */}
                    <S.RateLeftText>
                      {secondToHourMinuteSecondText(myTime)}
                    </S.RateLeftText>
                  </S.LeftTextBox>
                  <S.MiddleTextBox>
                    <S.FooterText>시간</S.FooterText>
                  </S.MiddleTextBox>
                  <S.RightTextBox>
                    <S.RateRightText>
                      {secondToHourMinuteSecondText(pairTime)}
                    </S.RateRightText>
                  </S.RightTextBox>
                </S.FooterTextBox>
                <S.FooterBarBox>
                  <S.RateBarBox>
                    <S.MyDataBar widthPercentage={timeRates.myRate}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        colors={['#CB5CFD', '#4737D9']}
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <RadialGradient
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 50,
                            opacity: 0.2,
                            justifyContent: 'center',
                            alignContent: 'center',
                            overflow: 'hidden',
                          }}
                          colors={['#ffffff', '#3D2FBF']}
                          stops={[0, 0.5]}
                          radius={500}
                          center={[50, 100]}></RadialGradient>
                      </LinearGradient>
                    </S.MyDataBar>

                    <S.OtherDataBar widthPercentage={timeRates.otherRate}>
                      <LinearGradient
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 1}}
                        colors={['#6EE2F5', '#6454F0']}
                        style={{
                          height: '100%',
                          width: '100%',
                          overflow: 'hidden',
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <RadialGradient
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 50,
                            opacity: 0.3,
                            justifyContent: 'center',
                            alignContent: 'center',
                            overflow: 'hidden',
                          }}
                          colors={['#ffffff', '#A890FF']}
                          stops={[0, 0.3]}
                          radius={500}
                          center={[50, 100]}></RadialGradient>
                      </LinearGradient>
                    </S.OtherDataBar>
                  </S.RateBarBox>
                </S.FooterBarBox>
              </S.FooterBox>

              <S.FooterBox>
                <S.FooterTextBox>
                  <S.LeftTextBox>
                    <S.RateLeftText>
                      {meterToKMOrMeter(myDistance)}
                    </S.RateLeftText>
                  </S.LeftTextBox>
                  <S.MiddleTextBox>
                    <S.FooterText>거리</S.FooterText>
                  </S.MiddleTextBox>
                  <S.RightTextBox>
                    <S.RateRightText>
                      {meterToKMOrMeter(pairDistance)}
                    </S.RateRightText>
                  </S.RightTextBox>
                </S.FooterTextBox>
                <S.FooterBarBox>
                  <S.RateBarBox>
                    <S.MyDataBar widthPercentage={distRates.myRate}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        colors={['#CB5CFD', '#4737D9']}
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          // borderRadius: 15,
                          // flexDirection: 'row',
                        }}>
                        <RadialGradient
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 50,
                            opacity: 0.2,
                            justifyContent: 'center',
                            alignContent: 'center',
                            overflow: 'hidden',
                          }}
                          colors={['#ffffff', '#3D2FBF']}
                          stops={[0, 0.5]}
                          radius={500}
                          center={[50, 100]}></RadialGradient>
                      </LinearGradient>
                    </S.MyDataBar>
                    <S.OtherDataBar widthPercentage={distRates.otherRate}>
                      <LinearGradient
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 1}}
                        colors={['#6EE2F5', '#6454F0']}
                        style={{
                          height: '100%',
                          width: '100%',
                          overflow: 'hidden',
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          // flexDirection: 'row',
                        }}>
                        <RadialGradient
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 50,
                            opacity: 0.3,
                            justifyContent: 'center',
                            alignContent: 'center',
                            overflow: 'hidden',
                          }}
                          colors={['#ffffff', '#A890FF']}
                          stops={[0, 0.3]}
                          radius={500}
                          center={[50, 100]}></RadialGradient>
                      </LinearGradient>
                    </S.OtherDataBar>
                  </S.RateBarBox>
                </S.FooterBarBox>
              </S.FooterBox>

              <S.FooterBox>
                <S.FooterTextBox>
                  <S.LeftTextBox>
                    {/*  초 */}
                    <S.RateLeftText>{calculatePace(mySpeed)}</S.RateLeftText>
                  </S.LeftTextBox>
                  <S.MiddleTextBox>
                    <S.FooterText>페이스</S.FooterText>
                  </S.MiddleTextBox>
                  <S.RightTextBox>
                    <S.RateRightText>
                      {calculatePace(pairSpeed)}
                    </S.RateRightText>
                  </S.RightTextBox>
                </S.FooterTextBox>
                <S.FooterBarBox>
                  <S.RateBarBox>
                    <S.MyDataBar widthPercentage={speedRates.myRate}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        colors={['#CB5CFD', '#4737D9']}
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          // borderRadius: 15,
                          // flexDirection: 'row',
                        }}>
                        <RadialGradient
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 50,
                            opacity: 0.2,
                            justifyContent: 'center',
                            alignContent: 'center',
                            overflow: 'hidden',
                          }}
                          colors={['#ffffff', '#3D2FBF']}
                          stops={[0, 0.5]}
                          radius={500}
                          center={[50, 100]}></RadialGradient>
                      </LinearGradient>
                    </S.MyDataBar>
                    <S.OtherDataBar widthPercentage={speedRates.otherRate}>
                      <LinearGradient
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 1}}
                        colors={['#6EE2F5', '#6454F0']}
                        style={{
                          height: '100%',
                          width: '100%',
                          overflow: 'hidden',
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          // flexDirection: 'row',
                        }}>
                        <RadialGradient
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 50,
                            opacity: 0.3,
                            justifyContent: 'center',
                            alignContent: 'center',
                            overflow: 'hidden',
                          }}
                          colors={['#ffffff', '#A890FF']}
                          stops={[0, 0.3]}
                          radius={500}
                          center={[50, 100]}></RadialGradient>
                      </LinearGradient>
                    </S.OtherDataBar>
                  </S.RateBarBox>
                </S.FooterBarBox>
              </S.FooterBox>
            </S.Footer>
          </S.ModalContent>
        </S.ModalContainer>
      </S.BackgroundImage>

      <GuideModal
        text="누적일 기준입니다."
        modalVisible={showAlert}
        toggleModal={() => setShowAlert(false)}
      />
    </Modal>
  );
};

export default VersusModal;
