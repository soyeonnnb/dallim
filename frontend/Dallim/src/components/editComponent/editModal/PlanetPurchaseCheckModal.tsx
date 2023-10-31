import React from 'react';
import { Modal } from 'react-native';
import * as S from './PlanetPurchaseCheckModal.styles'; // 스타일 컴포넌트 임포트
import { planetData } from '../../common/PlanetData';
import SpinAnimation from '@/components/common/SpinAnimation';

type ModalProps = {
    purchaseModalVisible: boolean;
    selectedPlanetIndex: number;
    handleConfirm: () => void;
    handleCancel: () => void;
};

function PlanetPurchaseCheckModal({ purchaseModalVisible, selectedPlanetIndex, handleConfirm, handleCancel }: ModalProps) {
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
                            <SpinAnimation>
                                <S.Image
                                    source={planetData[selectedPlanetIndex].Planet}
                                    resizeMode="contain"
                                />
                            </SpinAnimation>
                        </S.ImageBox>
                    </S.ModalHeader>
                    <S.ModalBody>
                        <S.ConfirmText>행성을 구매하시겠습니까?</S.ConfirmText>
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

export default PlanetPurchaseCheckModal;
