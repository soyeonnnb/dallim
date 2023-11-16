import * as S from './GuideModal.styles';
import {Modal} from 'react-native';

type DeleteModalProps = {
  text: string;
  toggleModal: () => void;
  modalVisible: boolean;
};

function GuideModal({text, toggleModal, modalVisible}: DeleteModalProps) {
  return ( 
    <Modal transparent={true} visible={modalVisible}>
      <S.ModalContainer>
        {/* <S.ContentShadow
          distance={10}
          offset={[0, 0]}
          sides={{
            bottom: true,
          }}> */}
        <S.ModalContent
          style={{
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowOffset: {width: 4, height: 4},
            shadowRadius: 4,
            elevation: 10,
          }}>
          <S.ModalHeaderEmptyBox></S.ModalHeaderEmptyBox>
          <S.ModalHeader>
            <S.HeaderText>{text}</S.HeaderText>
          </S.ModalHeader>
          <S.ModalFooter>
            {/* <S.ButtonShadow
              distance={100}
              offset={[0, 0]}
              sides={{
                bottom: true,
              }}> */}
            <S.ModalButton
              onPress={toggleModal}
              style={{
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 3},
                shadowRadius: 4,
                elevation: 6,
              }}>
              <S.ModalButtonText>확인</S.ModalButtonText>
            </S.ModalButton>
            {/* </S.ButtonShadow> */}
          </S.ModalFooter>
        </S.ModalContent>
        {/* </S.ContentShadow> */}
      </S.ModalContainer>
    </Modal>
  );
}

export default GuideModal;
