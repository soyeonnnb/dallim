import * as S from './NotificationModal.styles';
import React from 'react';
import {Linking, Modal} from 'react-native';

type ModalComponentProps = {
  isVisible: boolean;
  onClose: () => void;
};

const NotificationModal = ({isVisible, onClose}: ModalComponentProps) => {
  const handleConfirm = () => {
    const url =
      'https://gregarious-nutmeg-67b.notion.site/b5a7f52251eb4413a6ecbc607171d922';
    Linking.openURL(url).catch(err => {
      console.error('링크를 열 수 없음', err.message);
    });
  };

  return (
    <Modal transparent={true} animationType="fade" visible={isVisible}>
      <S.ModalContainer>
        <S.ModalContent>
          <S.ModalHeader>
            <S.TextBox>
              <S.TitleText>개인정보처리방침 페이지로</S.TitleText>
              <S.TitleText>이동하시겠습니까?</S.TitleText>
            </S.TextBox>
          </S.ModalHeader>

          <S.ModalFooter>
            <S.ModalButton onPress={handleConfirm}>
              <S.ModalButtonText>확인</S.ModalButtonText>
            </S.ModalButton>
            <S.ModalCancelButton onPress={onClose}>
              <S.ModalButtonText>취소</S.ModalButtonText>
            </S.ModalCancelButton>
          </S.ModalFooter>
        </S.ModalContent>
      </S.ModalContainer>
    </Modal>
  );
};

export default NotificationModal;
