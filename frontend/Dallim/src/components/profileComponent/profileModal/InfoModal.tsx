import * as S from './InfoModal.styles';
import React from 'react';
import { Modal } from 'react-native';
import CloseIcon from '@/assets/icons/DirectionLeft_2.png';
interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<Props> = ({ isVisible, onClose }) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <S.ModalContainer>
        <S.ModalContent >

          <S.Header>
            <S.CloseButton onPress={onClose}>
              <S.CloseImage source={CloseIcon} />
            </S.CloseButton>
            <S.TitleBox>
              <S.TitleText>워치 연동 설명서</S.TitleText>
            </S.TitleBox>
            <S.TempBox />
          </S.Header>

          <S.Body>
            <S.InfoBox>

            </S.InfoBox>
          </S.Body>

          <S.Footer>
          </S.Footer>


        </S.ModalContent>
      </S.ModalContainer>

    </Modal>
  );
};

export default InfoModal;
