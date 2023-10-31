import React from 'react';
import { Modal } from 'react-native';
import * as S from './CharacterPurchaseCheckModal.styles'; // 스타일 컴포넌트 임포트
import { characterData } from '@/components/common/CharacterData';

type ModalProps = {
    handleConfirm: () => void;
    handleCancel: () => void;
    purchaseModalVisible: boolean;
    selectedCharacterIndex: number;
    selectedEvolutionStage: number;
};

function CharacterPurchaseCheckModal({ handleConfirm, handleCancel, purchaseModalVisible, selectedCharacterIndex, selectedEvolutionStage }: ModalProps) {

    const CharacterData = characterData[selectedCharacterIndex].levels[selectedEvolutionStage];

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={purchaseModalVisible}
        >
            <S.ModalContainer>
                <S.ModalContent>
                    <S.ModalHeader>
                        <S.ImageBox>
                            <S.StyledGif source={CharacterData.running} resizeMode="contain" />
                        </S.ImageBox>
                    </S.ModalHeader>
                    <S.ModalBody>
                        <S.ConfirmText>캐릭터를 구매하시겠습니까?</S.ConfirmText>
                    </S.ModalBody>
                    <S.ModalFooter>
                        <S.ModalConfirmButton onPress={handleConfirm}>
                            <S.ModalButtonText>확인</S.ModalButtonText>
                        </S.ModalConfirmButton>
                        <S.ModalCancelButton onPress={handleCancel}>
                            <S.ModalButtonText>취소</S.ModalButtonText>
                        </S.ModalCancelButton>
                    </S.ModalFooter>
                </S.ModalContent>
            </S.ModalContainer>
        </Modal>
    );
};

export default CharacterPurchaseCheckModal;
