import React from 'react';
import { Modal } from 'react-native';
import * as S from './SelectModal.styles'; // 스타일 컴포넌트 임포트
import { selectedRoom } from '../RoomData';
import { characterData } from '../CharacterData';

type ModalComponentProps = {
    showModal: boolean;
    toggleModal: () => void;
    confirmCharacterChange: () => void;
    characterIndex: number;
};

const CharacterSelectModal = ({ showModal, toggleModal, confirmCharacterChange, characterIndex }: ModalComponentProps) => {

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={showModal}
        >
            <S.ModalContainer>
                <S.ModalContent>
                    <S.ModalHeader>
                        <S.ModalText>이 캐릭터를 선택하시겠습니까?</S.ModalText>
                    </S.ModalHeader>
                    <S.ModalBody>
                        <S.BoxStyle >
                            <S.RoomImage source={characterData[characterIndex].character} resizeMode="contain" />
                        </S.BoxStyle>
                        <S.ChangeBoxStyle>
                            <S.ChangeBox>
                                <S.ChangeIcon source={require('../../../assets/icons/ArrowIcon.png')} />
                            </S.ChangeBox>
                        </S.ChangeBoxStyle>
                        <S.BoxStyle >
                            <S.RoomImage source={characterData[selectedRoom.index].character} resizeMode="contain" />
                        </S.BoxStyle>

                    </S.ModalBody>
                    <S.ModalFooter>
                        <S.ModalButton onPress={confirmCharacterChange}>
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
