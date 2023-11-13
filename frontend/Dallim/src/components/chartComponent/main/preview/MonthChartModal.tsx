import * as S from './MonthChartModal.styles';
import {Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CalendarIcon from '@/assets/icons/CalendarIcon';
import DistanceIcon from '@/assets/icons/DistanceIcon';
import ClockIcon from '@/assets/icons/ClockIcon';

type MonthChartModalProps = {
  toggleModalVisible: any;
  modalVisible: boolean;
  item?: {
    date: string;
    id: string;
    distance: string;
    time: string;
  };
};

function MonthChartModal({
  toggleModalVisible,
  modalVisible,
  item,
}: MonthChartModalProps) {
  const navigation = useNavigation();
  return (
    <Modal transparent={true} visible={modalVisible}>
      <S.ModalContainer>
        <S.ModalContent>
          <S.ModalHeader>
            <S.HeaderDeleteText>러닝 기록</S.HeaderDeleteText>
          </S.ModalHeader>
          <S.ModalBody>
            <S.ModalRecord>
              <S.IconCircle
                colors={['#CB5CFD', '#4737D9']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}>
                <CalendarIcon width={15} height={15} color="white" />
              </S.IconCircle>
              <S.ModalName>날짜</S.ModalName>
              <S.ModalItem>{item?.date}</S.ModalItem>
            </S.ModalRecord>
            <S.ModalRecord>
              <S.IconCircle
                colors={['#FFC84E', '#FC76B3']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}>
                <DistanceIcon width={20} height={20} color="white" stroke={2} />
              </S.IconCircle>
              <S.ModalName>달린 거리</S.ModalName>
              <S.ModalItem>{item?.distance}</S.ModalItem>
            </S.ModalRecord>
            <S.ModalRecord>
              <S.IconCircle
                colors={['#6454F0', '#6EE2F5']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}>
                <ClockIcon width={20} height={20} color="white" />
              </S.IconCircle>
              <S.ModalName>달린 시간</S.ModalName>
              <S.ModalItem>{item?.time}</S.ModalItem>
            </S.ModalRecord>
          </S.ModalBody>
          <S.ModalFooter>
            <S.ModalButton
              onPress={() => navigation.push('ChartDetail', {id: item?.id})}>
              <S.ModalButtonText>상세 보기</S.ModalButtonText>
            </S.ModalButton>
            <S.ModalCancelButton onPress={toggleModalVisible}>
              <S.ModalButtonText>닫기</S.ModalButtonText>
            </S.ModalCancelButton>
          </S.ModalFooter>
        </S.ModalContent>
      </S.ModalContainer>
    </Modal>
  );
}

export default MonthChartModal;
