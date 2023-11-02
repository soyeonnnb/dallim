import * as S from './PlanetPurchaseCheckModal.styles';
import { Modal } from 'react-native';
import { planetData } from '@/recoil/PlanetData';
import SpinAnimation from '@/components/common/SpinAnimation';
import { useRecoilValue } from 'recoil';
import { selectedPlanetIndexState } from '@/recoil/EditRecoil';

type ModalProps = {
    handleConfirm: () => void;
    handleCancel: () => void;
    purchaseModalVisible: boolean;
    // selectedPlanetIndex: number;
};

function PlanetPurchaseCheckModal({ purchaseModalVisible, handleConfirm, handleCancel }: ModalProps) {
    const selectedPlanetIndex = useRecoilValue(selectedPlanetIndexState);

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
