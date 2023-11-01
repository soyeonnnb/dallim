import * as S from './SelectModal.styles';
import { characterData } from '@/recoil/CharacterData';
import { Modal } from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';

import { useRecoilState } from 'recoil';
import {
  equippedCharacterIndexState,
  equippedEvolutionStageState,
  selectedCharacterIndexState,
  selectedEvolutionStageState,
} from '@/recoil/EditRecoil';

type ModalComponentProps = {
  toggleModal: () => void;
  equippedCharacterChange: () => void;
  characterSelectModalVisible: boolean;
};

function CharacterSelectModal({ characterSelectModalVisible, toggleModal, equippedCharacterChange }: ModalComponentProps) {

  const [equippedCharacterIndex, setEquippedCharacterIndex] = useRecoilState(equippedCharacterIndexState);
  const [equippedEvolutionStage, setEquippedEvolutionStage] = useRecoilState(equippedEvolutionStageState);
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useRecoilState(selectedCharacterIndexState);
  const [selectedEvolutionStage, setSelectedEvolutionStage] = useRecoilState(selectedEvolutionStageState);


  const handleEquippedCharacterChange = () => {
    setEquippedCharacterIndex(selectedCharacterIndex);
    setEquippedEvolutionStage(selectedEvolutionStage);

    Toast.show({
      type: 'success',
      position: 'top',
      text1: '대표 캐릭터 변경 완료 !',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 10,
    });
    equippedCharacterChange();
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={characterSelectModalVisible}
    >
      <S.ModalContainer>
        <S.ModalContent>
          <S.ModalHeader>
            <S.ModalText>이 캐릭터를 선택하시겠습니까?</S.ModalText>
          </S.ModalHeader>
          <S.ModalBody>
            <S.BoxStyle >
              <S.Image source={characterData[equippedCharacterIndex].levels[equippedEvolutionStage].front} resizeMode="contain" />
            </S.BoxStyle>
            <S.ChangeBoxStyle>
              <S.ChangeBox>
                <FastImage
                  source={require('@/assets/icons/ArrowIcon.gif')}
                  style={{ width: 25, height: 25 }}
                />
              </S.ChangeBox>
            </S.ChangeBoxStyle>
            <S.BoxStyle >
              <S.Image source={characterData[selectedCharacterIndex].levels[selectedEvolutionStage].front} resizeMode="contain" />
            </S.BoxStyle>

          </S.ModalBody>
          <S.ModalFooter>
            <S.ModalButton onPress={handleEquippedCharacterChange}>
              <S.ModalButtonText>확인</S.ModalButtonText>
            </S.ModalButton>
            <S.ModalCancelButton onPress={toggleModal}>
              <S.ModalButtonText>취소</S.ModalButtonText>
            </S.ModalCancelButton>
          </S.ModalFooter>
        </S.ModalContent>
      </S.ModalContainer>

    </Modal >
  );
};

export default CharacterSelectModal;
