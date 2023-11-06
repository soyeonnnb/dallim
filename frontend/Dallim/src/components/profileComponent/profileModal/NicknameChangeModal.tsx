import React, {useState} from 'react';
import {Modal} from 'react-native';
import * as S from './NicknameChangeModal.styles';
import CustomToast from '../../../components/common/CustomToast';

//apis
import {patchNicknameCheck} from '@/apis/ProfileApi';

// recoil
import { useSetRecoilState } from 'recoil';
import {
  userNicknameState,
} from '@/recoil/UserRecoil';

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
  const setUserNickname = useSetRecoilState(userNicknameState);

  //action
  const handleConfirm = async () => {
    const trimmedNickname = newNickname.trim();

    //공백, 빈문자열 체크
    if (!trimmedNickname || /\s/.test(trimmedNickname)) {
      CustomToast({type: 'error', text1: '띄어쓰기, 공백은 불가합니다!'});
      return;
    }

    if (trimmedNickname.length > 5) {
      CustomToast({type: 'error', text1: '닉네임은 최대 5자까지 가능합니다.'});
      return;
    }

    if (Nickname === trimmedNickname) {
      CustomToast({type: 'error', text1: '기존 닉네임과 같습니다!'});
      return;
    }

    // 닉네임 중복 체크를 위한 API 호출
    try {
      const response = await patchNicknameCheck(trimmedNickname);
      // 응답의 상태에 따른 처리
      if (response.status === 'success') {
        CustomToast({type: 'success', text1: '닉네임 변경 성공!'});
        setUserNickname(trimmedNickname); // 리코일 상태 변경 추가 : 은성
        toggleModal();
      } else {
        CustomToast({type: 'error', text1: '중복된 닉네임이 있습니다!'});
      }
    } catch (error) {
      // 오류 처리
      CustomToast({
        type: 'error',
        text1: '닉네임 체크 중 오류가 발생했습니다.',
      });
      console.error('닉네임 중복 체크 실패', error);
    }
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
