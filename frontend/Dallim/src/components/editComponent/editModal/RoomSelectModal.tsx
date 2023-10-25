import React from 'react';
import { Modal } from 'react-native';
import * as S from './SelectModal.styles'; // 스타일 컴포넌트 임포트
import { roomData } from '../RoomData';
import { selectedRoom } from '../RoomData';

type ModalComponentProps = {
    showModal: boolean;
    toggleModal: () => void;
    confirmRoomChange: () => void;
    roomIndex: number;
};

const RoomSelectModal = ({ showModal, toggleModal, confirmRoomChange, roomIndex }: ModalComponentProps) => {

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={showModal}
        >
            <S.ModalContainer>
                <S.ModalContent>
                    <S.ModalHeader>
                        <S.ModalText>이 방을 선택하시겠습니까?</S.ModalText>
                    </S.ModalHeader>
                    <S.ModalBody>

                        <S.BoxStyle >
                            <S.RoomImage source={roomData[roomIndex].Room} resizeMode="contain" />
                        </S.BoxStyle>
                        <S.ChangeBoxStyle>
                            <S.ChangeBox>
                                <S.ChangeIcon source={require('../../../assets/icons/ArrowIcon.png')} />
                            </S.ChangeBox>
                        </S.ChangeBoxStyle>
                        <S.BoxStyle >
                            <S.RoomImage source={roomData[selectedRoom.index].Room} resizeMode="contain" />
                        </S.BoxStyle>

                    </S.ModalBody>
                    <S.ModalFooter>
                        <S.ModalButton onPress={confirmRoomChange}>
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

export default RoomSelectModal;
