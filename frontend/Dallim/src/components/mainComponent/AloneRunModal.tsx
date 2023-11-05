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

  // 이미지
  // const characterImage = characterData[equippedCharacterIndex].evolutions[equippedEvolutionStage].front;
  // const characterImage = characterData[0].evolutions[1].front;

  // 임시 페이스
  const [timer, setTimer] = useState<string>('00:00:00'.replace(/:/g, ' : '));
  const [avgPace, setAvgPace] = useState<string>('00:00'.replace(/:/, "' ") + '"');

  function StartAlone() {
    console.log("시작 버튼이 눌렸습니다.");
  }

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
                    <S.StartText>시작</S.StartText>
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

          {/* 캐릭터 : 어떻게 할지 고민*/}
          <S.CharacterBox>
            <S.StyledGif
              source={
                characterData[equippedCharacterIndex].evolutions[equippedEvolutionStage].running
              }
              resizeMode="contain"
            />
            {/* <S.CharacterImage source={characterImage} resizeMode="contain" /> */}
          </S.CharacterBox>


        </S.ModalContainer>
      </S.BackgroundImage>
    </Modal>
  );
};

export default AloneRunModal;