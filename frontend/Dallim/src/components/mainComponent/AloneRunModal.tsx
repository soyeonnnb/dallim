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

  // const characterImage = characterData[equippedCharacterIndex].evolutions[equippedEvolutionStage].front;
  // const characterImage = characterData[0].evolutions[1].front;

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
              <S.TempText>시간 넣을 건가요?</S.TempText>
            </S.TimerBox>
            <S.StartBox>
              <S.TempText>좀 더 연구해볼께요 커스텀 해야할듯</S.TempText>
            </S.StartBox>
            <S.RecodeBox>
              <S.RecodeLeft>
                <S.RecodeTextBox>
                  <S.RecodeText>최근 1km 페이스</S.RecodeText>
                </S.RecodeTextBox>
                <S.LeftBottom></S.LeftBottom>
              </S.RecodeLeft>
              <S.RecodeRight>
                <S.RecodeTextBox>
                  <S.RecodeText>최근 평균 페이스</S.RecodeText>
                </S.RecodeTextBox>
                <S.LeftBottom></S.LeftBottom>
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