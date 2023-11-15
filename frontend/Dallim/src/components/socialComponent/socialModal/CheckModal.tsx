import * as S from './CheckModal.styles';
import { Modal } from 'react-native';
import { CustomToast } from '@/components/common/toast/CustomToast';

type ModalComponentProps = {
  checkModalVisible: boolean;
  handleModalRecordSave: () => void;
  toggleCheckModal: () => void;
};

function CheckModal({
  checkModalVisible,
  handleModalRecordSave,
  toggleCheckModal,
}: ModalComponentProps) {
  const handleSaveAndShowToast = async () => {
    try {
      // 등록 처리
      await handleModalRecordSave();

      CustomToast({
        type: 'success',
        text1: '런닝메이트 등록 완료!'
      });
      toggleCheckModal();
    } catch (error) {
      CustomToast({
        type: 'error',
        text1: '런닝메이트 등록 실패!'
      });
    }
  };

  return (
    <Modal transparent={true} animationType="fade" visible={checkModalVisible}>
      <S.ModalContainer>
        <S.ModalContent>
          <S.ModalHeader>
            <S.ModalText>기록을 등록하시겠습니까?</S.ModalText>
          </S.ModalHeader>
          <S.ModalBody>
            <S.BoxShadow
              distance={1}
              startColor="rgba(0, 0, 0, 0.15)"
              endColor="rgba(0, 0, 0, 0.15)"
              offset={[0, 1]}>
              <S.ModalButton onPress={handleSaveAndShowToast}>
                <S.ModalButtonText>등록</S.ModalButtonText>
              </S.ModalButton>
            </S.BoxShadow>
            <S.BoxShadow
              distance={1}
              startColor="rgba(0, 0, 0, 0.15)"
              endColor="rgba(0, 0, 0, 0.15)"
              offset={[0, 1]}>
              <S.ModalCancelButton onPress={toggleCheckModal}>
                <S.ModalButtonText>취소</S.ModalButtonText>
              </S.ModalCancelButton>
            </S.BoxShadow>
          </S.ModalBody>
        </S.ModalContent>
      </S.ModalContainer>
    </Modal>
  );
}

export default CheckModal;
