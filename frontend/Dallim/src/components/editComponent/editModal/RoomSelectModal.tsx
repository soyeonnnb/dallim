import React from 'react';
import { Modal } from 'react-native';
import * as S from './SelectModal.styles'; // 스타일 컴포넌트 임포트
import { roomData } from '../RoomData';
import { selectedRoom } from '../RoomData';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';

type ModalComponentProps = {
    showModal: boolean;
    toggleModal: () => void;
    confirmRoomChange: () => void;
    roomIndex: number;
};

const RoomSelectModal = ({ showModal, toggleModal, confirmRoomChange, roomIndex }: ModalComponentProps) => {

    const handleConfirmRoomChange = () => {
        Toast.show({
            type: 'success',
            position: 'top',
            text1: '대표 방 변경 완료 !',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 10,
        });

        confirmRoomChange();
    };

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
                            <S.Image source={roomData[selectedRoom.index].Room} resizeMode="contain" />
                        </S.BoxStyle>
                        <S.ChangeBoxStyle>
                            <S.ChangeBox>
                                <FastImage
                                    source={require('../../../assets/icons/ArrowIcon.gif')}
                                    style={{ width: 25, height: 25 }}
                                />
                            </S.ChangeBox>
                        </S.ChangeBoxStyle>
                        <S.BoxStyle >
                            <S.Image source={roomData[roomIndex].Room} resizeMode="contain" />
                        </S.BoxStyle>

                    </S.ModalBody>
                    <S.ModalFooter>
                        <S.ModalButton onPress={handleConfirmRoomChange}>
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
