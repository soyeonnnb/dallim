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

          </S.Body>

          <S.Bottom>
          </S.Bottom>


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
                // characterData[equippedCharacterIndex].evolutions[equippedEvolutionStage]
                characterData[2].evolutions[1]
                  .running
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