import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import * as S from './AloneRunModal.styles';
import CloseIcon from '../../assets/icons/CloseIcon.png';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { fetchUserCalendar } from '@/apis/MainApi';


interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const AloneRunModal: React.FC<Props> = ({ isVisible, onClose }) => {


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <S.BackgroundImage source={require('@/assets/images/MainBackground5.png')}
        resizeMode="cover">
        <S.ModalContainer>
          <S.ModalContent>
            <S.Header>

            </S.Header>
            <S.Body>

            </S.Body>
            <S.Bottom>

            </S.Bottom>
          </S.ModalContent>
        </S.ModalContainer>
      </S.BackgroundImage>
    </Modal>
  );
};

export default AloneRunModal;