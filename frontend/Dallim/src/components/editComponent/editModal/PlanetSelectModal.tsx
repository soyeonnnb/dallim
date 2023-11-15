import * as S from './SelectModal.styles';
import { planetData } from '@/recoil/data/PlanetData';
import { Modal } from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';

import { useRecoilState, useRecoilValue } from 'recoil';
import { equippedPlanetIndexState, selectedPlanetIndexState } from '@/recoil/UserRecoil';

type ModalComponentProps = {
    togglePlanetSelectModal: () => void;
    equippedPlanetChange: () => void;
    planetSelectModalVisible: boolean;
};

function planetSelectModal({ planetSelectModalVisible, togglePlanetSelectModal, equippedPlanetChange }: ModalComponentProps) {

    const [equippedPlanetIndex, setEquippedPlanetIndex] = useRecoilState(equippedPlanetIndexState);
    const selectedPlanetIndex = useRecoilValue(selectedPlanetIndexState);

    const handleEquippedPlanetChange = () => {
        setEquippedPlanetIndex(selectedPlanetIndex);

        Toast.show({
            type: 'success',
            position: 'top',
            text1: '대표 행성 변경 완료 !',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 10,
        });
        equippedPlanetChange();
    };

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={planetSelectModalVisible}
        >
            <S.ModalContainer>
                <S.ModalContent>
                    <S.ModalHeader>
                        <S.ModalText>이 행성을 선택하시겠습니까?</S.ModalText>
                    </S.ModalHeader>
                    <S.ModalBody>

                        <S.BoxStyle >
                            <S.Image source={planetData[equippedPlanetIndex].Main} resizeMode="contain" />
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
                            <S.Image source={planetData[selectedPlanetIndex].Main} resizeMode="contain" />
                        </S.BoxStyle>

                    </S.ModalBody>
                    <S.ModalFooter>
                        <S.ModalButton onPress={handleEquippedPlanetChange}>
                            <S.ModalButtonText>확인</S.ModalButtonText>
                        </S.ModalButton>
                        <S.ModalCancelButton onPress={togglePlanetSelectModal}>
                            <S.ModalButtonText>취소</S.ModalButtonText>
                        </S.ModalCancelButton>
                    </S.ModalFooter>
                </S.ModalContent>
            </S.ModalContainer>

        </Modal >
    );
};

export default planetSelectModal;
