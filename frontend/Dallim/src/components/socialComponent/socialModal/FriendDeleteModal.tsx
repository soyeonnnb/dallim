import * as S from './CheckModal.styles';
import {Modal} from 'react-native';
import { CustomToast } from '@/components/common/toast/CustomToast';

type ModalComponentProps = {
  checkModalVisible: boolean;
  handleDeleteFriend: () => void;
  toggleCheckModal: () => void;
};

function FriendDeleteModal({
  checkModalVisible,
  handleDeleteFriend,
  toggleCheckModal,
}: ModalComponentProps) {
  const handleSaveAndShowToast = async () => {
    try {
      // 등록 처리
      await handleDeleteFriend();
      CustomToast({ type: 'success', text1: '친구 삭제 완료 !' });
      toggleCheckModal();
    } catch (error) {
      CustomToast({ type: 'error', text1: '친구 삭제 실패 !' });
    }
  };

  return (
    <Modal transparent={true} animationType="fade" visible={checkModalVisible}>
      <S.ModalContainer>
        <S.ModalContent>
          <S.ModalHeader>
            <S.ModalText>친구를 삭제하시겠습니까?</S.ModalText>
          </S.ModalHeader>
          <S.ModalBody>
            <S.BoxShadow
              distance={1}
              startColor="rgba(0, 0, 0, 0.15)"
              endColor="rgba(0, 0, 0, 0.15)"
              offset={[0, 1]}>
              <S.ModalButton onPress={toggleCheckModal}>
                <S.ModalButtonText>취소</S.ModalButtonText>
              </S.ModalButton>
            </S.BoxShadow>
            <S.BoxShadow
              distance={1}
              startColor="rgba(0, 0, 0, 0.15)"
              endColor="rgba(0, 0, 0, 0.15)"
              offset={[0, 1]}>
              <S.ModalCancelButton onPress={handleSaveAndShowToast}>
                <S.ModalButtonText>삭제</S.ModalButtonText>
              </S.ModalCancelButton>
            </S.BoxShadow>
          </S.ModalBody>
        </S.ModalContent>
      </S.ModalContainer>
    </Modal>
  );
}

export default FriendDeleteModal;
