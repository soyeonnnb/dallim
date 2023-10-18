import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import * as S from './FriendListModal.styles';
import CloseIcon from '../../../assets/icons/CloseIcon.png';

type Props = {
    isVisible: boolean;
    onClose: () => void;
};

const FriendListModal: React.FC<Props> = ({ isVisible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <S.ModalContainer>
                <S.ModalContent>
                    <S.Top>
                    <S.CloseButton onPress={onClose}>
                        <S.CloseImage source={CloseIcon} />
                    </S.CloseButton>
                    </S.Top>
                    <S.Middle></S.Middle>
                    <S.Bottom></S.Bottom>
                </S.ModalContent>
            </S.ModalContainer>
        </Modal>
    );
};

export default FriendListModal;
