import * as S from './AloneRunModal.styles';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { planetData } from '@/recoil/PlanetData';
import { characterData } from '@/recoil/CharacterData';
import CloseIcon from '@/assets/icons/DirectionLeft_2.png';
import SpinAnimation from '@/components/common/SpinAnimation';

import { useRecoilValue } from 'recoil';
import {
  equippedCharacterIndexState,
  equippedEvolutionStageState,
  equippedPlanetIndexState,
} from '@/recoil/UserRecoil';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const AloneRunModal: React.FC<Props> = ({ isVisible, onClose }) => {

  const equippedCharacterIndex = useRecoilValue(equippedCharacterIndexState);
  const equippedEvolutionStage = useRecoilValue(equippedEvolutionStageState);
  const equippedPlanetIndex = useRecoilValue(equippedPlanetIndexState);

  // 임시 페이스
  const [timer, setTimer] = useState<string>('00:00:00'.replace(/:/g, ' : '));
  const [avgPace, setAvgPace] = useState<string>('00:00'.replace(/:/, "' ") + '"');

  // 카운트다운 상태 관리
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showStart, setShowStart] = useState(false);

  // isVisible이 true가 되면 카운트다운 시작
  useEffect(() => {
    if (isVisible) {
      StartAlone();
    }
  }, [isVisible]);

  // 카운트다운을 시작하는 함수
  const StartAlone = () => {
    console.log('카운트다운 시작!');
    setIsCountdownActive(true);
    setShowStart(false);
    setCountdown(3);
    const intervalId = setInterval(() => {
      setCountdown((currentCountdown) => {
        if (currentCountdown <= 1) {
          clearInterval(intervalId);
          setIsCountdownActive(false);
          setShowStart(true);
          onCountdownFinish();
          return 0;
        }
        return currentCountdown - 1;
      });
    }, 1000);
  };

  // 버튼 텍스트를 결정하는 함수
  const displayButtonText = () => {
    if (isCountdownActive) {
      return countdown;
    }
    if (showStart) {
      return '시작';
    }
    return '';
  };

  // 카운트다운이 끝났을 때 호출할 함수
  const onCountdownFinish = () => {
    console.log('카운트다운 완료!');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <S.BackgroundImage source={require('@/assets/images/MainBackground3.png')}
        resizeMode="cover">
        <S.ModalContainer>
          <S.Header>
            <S.CloseButton onPress={onClose}>
              <S.CloseImage source={CloseIcon} />
            </S.CloseButton>
          </S.Header>

          <S.Body>
            <S.TimerBox>
              <S.TimerText>{timer}</S.TimerText>
            </S.TimerBox>

            <S.StartBox>
              <S.ButtonBackground source={require('@/assets/images/StartButton.png')}
                resizeMode="contain"
              >
                <S.RunButton onPress={StartAlone}>
                  <S.StartText>{displayButtonText()}</S.StartText>
                </S.RunButton>
              </S.ButtonBackground>
            </S.StartBox>

            <S.RecodeBox>
              <S.RecodeLeft>
                <S.RecodeTextBox>
                  <S.RecodeTitle>최근 1km 페이스</S.RecodeTitle>
                </S.RecodeTextBox>
                <S.RecodeBottomBox>
                  <S.RecodeText>{avgPace}</S.RecodeText>
                </S.RecodeBottomBox>
              </S.RecodeLeft>
              <S.RecodeRight>
                <S.RecodeTextBox>
                  <S.RecodeTitle>최근 평균 페이스</S.RecodeTitle>
                </S.RecodeTextBox>
                <S.RecodeBottomBox>
                  <S.RecodeText>{avgPace}</S.RecodeText>
                </S.RecodeBottomBox>
              </S.RecodeRight>
            </S.RecodeBox>

          </S.Body>

          {/* 행성 */}
          <S.ThemeBox>
            <SpinAnimation>
              <S.StyledImage
                source={planetData[equippedPlanetIndex].Planet}
                resizeMode="contain"
              />
            </SpinAnimation>
          </S.ThemeBox>

          {/* 캐릭터 */}
          <S.CharacterBox>
            <S.StyledGif
              source={
                characterData[equippedCharacterIndex].evolutions[equippedEvolutionStage].running
              }
              resizeMode="contain"
            />
          </S.CharacterBox>


        </S.ModalContainer>
      </S.BackgroundImage>
    </Modal>
  );
};

export default AloneRunModal;