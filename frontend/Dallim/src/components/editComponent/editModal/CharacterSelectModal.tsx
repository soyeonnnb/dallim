import React from 'react';
import { Modal } from 'react-native';
import * as S from './SelectModal.styles';
import { characterData } from '../../common/CharacterData';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';

type ModalComponentProps = {
    characterSelectModalVisible: boolean;
    toggleModal: () => void;
    equippedCharacterChange: () => void;
    equippedCharacterIndex: number;
    equippedCharacterLevel: number;
    equippedEvolutionStage: number;
    selectedCharacterIndex: number;
    selectedCharacterLevel: number;
    selectedEvolutionStage: number;
};

function CharacterSelectModal({ characterSelectModalVisible, toggleModal, equippedCharacterChange, equippedCharacterIndex, equippedCharacterLevel, equippedEvolutionStage, selectedCharacterIndex, selectedCharacterLevel, selectedEvolutionStage }: ModalComponentProps) {

    const handleEquippedCharacterChange = () => {
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
