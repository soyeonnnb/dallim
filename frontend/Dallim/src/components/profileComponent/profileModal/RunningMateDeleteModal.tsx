import * as S from './RunningMateDeleteModal.styles';
import {planetData} from '@/recoil/PlanetData';
import {Modal} from 'react-native';
import {Text} from 'react-native-svg';
import Toast from 'react-native-toast-message';

type DeleteModalProps = {
  toggleDeleteModal: () => void;
};

function RunningMateDeleteModal({toggleDeleteModal}: DeleteModalProps) {
  const handleRunningMateListChange = () => {
    toggleDeleteModal();

    Toast.show({
      type: 'success',
      position: 'top',
      text1: '삭제되었습니다 !',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 10,
    });
  };

  return (
    <Modal transparent={true}>
      <S.ModalContainer>
        <S.ModalContent>
          <S.ModalHeader>
            <S.HeaderDeleteText>삭제하시겠습니까?</S.HeaderDeleteText>
          </S.ModalHeader>

          <S.ModalFooter>
            <S.ModalButton onPress={handleRunningMateListChange}>
              <S.ModalButtonText>확인</S.ModalButtonText>
            </S.ModalButton>
            <S.ModalCancelButton onPress={toggleDeleteModal}>
              <S.ModalButtonText>취소</S.ModalButtonText>
            </S.ModalCancelButton>
          </S.ModalFooter>
        </S.ModalContent>
      </S.ModalContainer>
    </Modal>
  );
}

export default RunningMateDeleteModal;
