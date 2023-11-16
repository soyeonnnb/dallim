import * as S from './SelectModal.styles';
import {characterData} from '@/recoil/data/CharacterData';
import {Modal} from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomToast } from '@/components/common/toast/CustomToast';

import {useRecoilState} from 'recoil';
import {
  equippedCharacterIndexState,
  equippedEvolutionStageState,
  selectedCharacterIndexState,
  selectedEvolutionStageState,
} from '@/recoil/UserRecoil';

type ModalComponentProps = {
  toggleModal: () => void;
  equippedCharacterChange: () => void;
  characterSelectModalVisible: boolean;
};

function CharacterSelectModal({
  characterSelectModalVisible,
  toggleModal,
  equippedCharacterChange,
}: ModalComponentProps) {
  const [equippedCharacterIndex, setEquippedCharacterIndex] = useRecoilState(
    equippedCharacterIndexState,
  );
  const [equippedEvolutionStage, setEquippedEvolutionStage] = useRecoilState(
    equippedEvolutionStageState,
  );
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useRecoilState(
    selectedCharacterIndexState,
  );
  const [selectedEvolutionStage, setSelectedEvolutionStage] = useRecoilState(
    selectedEvolutionStageState,
  );

  const handleEquippedCharacterChange = () => {
    setEquippedCharacterIndex(selectedCharacterIndex);
    setEquippedEvolutionStage(selectedEvolutionStage);

    CustomToast({ type: 'success', text1: '대표 캐릭터 선택 완료!' });
    
    equippedCharacterChange();
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={characterSelectModalVisible}>
      <S.ModalContainer>
        <S.ModalContent>
          <S.ModalHeader>
            <S.ModalText>이 캐릭터를 선택하시겠습니까?</S.ModalText>
          </S.ModalHeader>
          <S.ModalBody>
            <S.BoxStyle>
              <S.Image
                source={
                  characterData[equippedCharacterIndex].Evolutions[
                    equippedEvolutionStage
                  ].Main
                }
                resizeMode="contain"
              />
            </S.BoxStyle>
            <S.ChangeBoxStyle>
              <S.ChangeBox>
                <FastImage
                  source={require('@/assets/icons/ArrowIcon.gif')}
                  style={{width: 25, height: 25}}
                />
              </S.ChangeBox>
            </S.ChangeBoxStyle>
            <S.BoxStyle>
              <S.Image
                source={
                  characterData[selectedCharacterIndex].Evolutions[
                    selectedEvolutionStage
                  ].Main
                }
                resizeMode="contain"
              />
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
    </Modal>
  );
}

export default CharacterSelectModal;
