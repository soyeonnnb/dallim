import React from 'react';
import { Modal } from 'react-native';
import * as S from './RunningMateModal.styles';

type ModalComponentProps = {
    showModal: boolean;
    toggleModal: () => void;
};

const RunningMateModal = ({ showModal, toggleModal }: ModalComponentProps) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={showModal}
        >
            <S.ModalContainer>
                <S.ModalContent>
                    <S.ModalHeader>
                    </S.ModalHeader>
                    <S.ModalBody>
                    </S.ModalBody>
                    <S.ModalFooter>
                    </S.ModalFooter>
                </S.ModalContent>
            </S.ModalContainer>
        </Modal>
    );
};


export default RunningMateModal;
