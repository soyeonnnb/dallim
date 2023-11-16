import {deleteRunningMate} from '@/apis/ProfileApi';
import * as S from './RunningMateDeleteModal.styles';
import {Modal} from 'react-native';
import { CustomToast } from '@/components/common/toast/CustomToast';

import {useSetRecoilState} from 'recoil';
import {competitorDataState} from '@/recoil/RunningRecoil';

type DeleteModalProps = {
  isVisible: boolean;
  competitorId: string;
  toggleDeleteModal: () => void;
  onDeleteSuccess: () => void;
};

function RunningMateDeleteModal({
  isVisible,
  competitorId,
  toggleDeleteModal,
  onDeleteSuccess,
}: DeleteModalProps) {
  const setCompetitorData = useSetRecoilState(competitorDataState);

  const handleRunningMateListChange = async () => {
    try {
      const isSuccess = await deleteRunningMate(competitorId);
      if (isSuccess) {
        CustomToast({ type: 'success', text1: '런닝메이트가 삭제되었습니다!' });

        setCompetitorData(oldCompetitorData =>
          oldCompetitorData.filter(
            competitor => competitor.runningMateId !== competitorId,
          ),
        );
        onDeleteSuccess(); // 성공 콜백
      } else {
        throw new Error('삭제하는데 에러발생');
      }
    } catch (error) {
      CustomToast({ type: 'error', text1: '에러발생! 다시 시도해주세요.' });
      // console.error('삭제하는데 에러발생2', error);
    }
    toggleDeleteModal(); // 무조건 모달을 닫는 동작
  };

  return (
    <Modal transparent={true} visible={isVisible}>
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
