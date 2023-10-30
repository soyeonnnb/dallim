import React from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import * as S from './PurchaseCheckModal.styles'; // 스타일 컴포넌트 임포트

type ModalProps = {
    showModal: boolean;
    handleConfirm: () => void;
    handleCancel: () => void;
};

function PurchaseCheckModal({ showModal, handleConfirm, handleCancel }: ModalProps) {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={showModal}
        >
            <S.ModalContainer>
                <S.ModalContent>
                    <S.ModalHeader>
                        <Text>행성을 구매하시겠습니까?</Text>
                    </S.ModalHeader>
                    <S.ModalFooter>
                        <TouchableOpacity onPress={handleConfirm}>
                            <Text>확인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCancel}>
                            <Text>취소</Text>
                        </TouchableOpacity>
                    </S.ModalFooter>
                </S.ModalContent>
            </S.ModalContainer>
        </Modal>
    );
};

export default PurchaseCheckModal;
