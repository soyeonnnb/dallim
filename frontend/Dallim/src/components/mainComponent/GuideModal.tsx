import * as S from './GuideModal.styles';
import React from 'react';
import { Modal } from 'react-native';
import CloseIcon from '@/assets/icons/DirectionLeft_2.png';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const GuideModal: React.FC<Props> = ({ isVisible, onClose }) => {

  const Guides = [
    require('@/assets/images/MainBackground1.png'),
    require('@/assets/images/MainBackground2.png'),
    require('@/assets/images/MainBackground3.png'),
  ];


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <S.ModalContainer>
        <S.ModalContent>
          <S.MainBox>
            <S.Header>
              <S.CloseButton onPress={onClose}>
                <S.CloseImage source={CloseIcon} />
              </S.CloseButton>
              <S.TitleBox>
                <S.TitleText>사용 설명서</S.TitleText>
              </S.TitleBox>
              <S.TempBox />
            </S.Header>

            <S.Body>

            </S.Body>
          </S.MainBox>
        </S.ModalContent>

      </S.ModalContainer>
    </Modal>
  );
};

export default GuideModal;