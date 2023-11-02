import React, {useState} from 'react';
import {Modal} from 'react-native';
import * as S from './NicknameChangeModal.styles';
import CustomToast from '../../../components/common/CustomToast';

type ModalComponentProps = {
  showModal: boolean;
  toggleModal: () => void;
  Nickname: string;
};

const NicknameChangeModal = ({
  showModal,
  toggleModal,
  Nickname,
}: ModalComponentProps) => {
  // variable
  const NoticeText = '닉네임은 한글/영문/숫자로 최대 5자까지 입력 가능합니다.';

  // state
  const [newNickname, setNewNickname] = useState(Nickname);

  //action
  const handleConfirm = () => {
    //공백, 빈문자열 체크
    if (!newNickname.trim() || /\s/.test(newNickname)) {
      CustomToast({type: 'error', text1: '띄어쓰기, 공백은 불가합니다!'});
      toggleModal();
      return;
    }

    if (newNickname.trim().length < 5) {
      CustomToast({type: 'error', text1: '닉네임은 최대 5자까지 가능합니다.'});
      toggleModal();
      return;
    }

    if (Nickname === newNickname.trim()) {
      CustomToast({type: 'error', text1: '닉네임 중복 발생!'});
      toggleModal();
      return;
    }

    CustomToast({type: 'success', text1: '변경 완료!'});
    toggleModal();
  };

  return (
    <Modal transparent={true} animationType="fade" visible={showModal}>
      <S.ModalContainer>
        <S.ModalContent>
          <S.ModalHeader>
            <S.TitleBox>
              <S.TitleText>닉네임 변경</S.TitleText>
            </S.TitleBox>
          </S.ModalHeader>
          <S.ModalBody>
            <S.PlaceholderBox>
              <S.NicknameInput
                value={newNickname}
                onChangeText={setNewNickname}
                placeholder={Nickname}
              />
            </S.PlaceholderBox>
            <S.NoticeBox>
              <S.NoticeText>{NoticeText}</S.NoticeText>
            </S.NoticeBox>
          </S.ModalBody>
          <S.ModalFooter>
            <S.ModalButton onPress={handleConfirm}>
              <S.ModalButtonText>확인</S.ModalButtonText>
            </S.ModalButton>
            <S.ModalCancelButton onPress={toggleModal}>
              <S.ModalButtonText>취소</S.ModalButtonText>
            </S.ModalCancelButton>
          </S.ModalFooter>
        </S.ModalContent>
      </S.ModalContainer>
    </Modal>
  );
};

export default NicknameChangeModal;
