import {deleteRunningMate} from '@/apis/ProfileApi';
import * as S from './RunningMateDeleteModal.styles';
import {Modal} from 'react-native';
import Toast from 'react-native-toast-message';

import {useSetRecoilState} from 'recoil';
import {competitorDataState} from '@/recoil/RunningRecoil';

type DeleteModalProps = {
  competitorId: string;
  toggleDeleteModal: () => void;
  onDeleteSuccess: () => void;
};

function RunningMateDeleteModal({
  competitorId,
  toggleDeleteModal,
  onDeleteSuccess,
}: DeleteModalProps) {
  const setCompetitorData = useSetRecoilState(competitorDataState);

  const handleRunningMateListChange = async () => {
    try {
      const isSuccess = await deleteRunningMate(competitorId);
      if (isSuccess) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: `${competitorId}번 경쟁자가 삭제되었습니다!`,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 10,
        });
        setCompetitorData(oldCompetitorData =>
          oldCompetitorData.filter(
            competitor => competitor.id !== competitorId,
          ),
        );
        onDeleteSuccess(); // 성공 콜백
      } else {
        throw new Error('삭제하는데 에러발생');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: '삭제 실패. 다시 시도해주세요.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 10,
      });
      console.error('삭제하는데 에러발생2', error);
    }
    toggleDeleteModal(); // 무조건 모달을 닫는 동작
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
