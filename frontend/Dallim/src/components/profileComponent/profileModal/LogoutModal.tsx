import React from 'react';
import { Modal } from 'react-native';
import * as S from './LogoutModal.styles';
import { useNavigation, CommonActions } from '@react-navigation/native';

type ModalComponentProps = {
    showModal: boolean;
    toggleModal: () => void;
};

const LogoutModal = ({ showModal, toggleModal }: ModalComponentProps) => {
    const navigation = useNavigation();

    const handleConfirm = () => {
        console.log("로그인아웃 버튼 눌림!");

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Login' }
                ],
            })
        );

        toggleModal();
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
                        <S.TitleBox>
                            <S.TitleText>로그아웃 하시겠습니까?</S.TitleText>
                        </S.TitleBox>
                    </S.ModalHeader>
                    <S.ModalFooter>
                        <S.ModalButton onPress={handleConfirm}>
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
};


export default LogoutModal;
