import React from 'react';
import { Modal } from 'react-native';
import * as S from './SelectModal.styles'; // 스타일 컴포넌트 임포트
import { planetData } from '../../common/PlanetData';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';

type ModalComponentProps = {
    showModal: boolean;
    equippedPlanetIndex: number;
    selectedPlanetIndex: number;
    toggleModal: () => void;
    equippedPlanetChange: () => void;
};

function planetSelectModal ({ showModal, equippedPlanetIndex, selectedPlanetIndex, toggleModal, equippedPlanetChange }: ModalComponentProps) {

    const handleEquippedPlanetChange = () => {
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
            visible={showModal}
        >
            <S.ModalContainer>
                <S.ModalContent>
                    <S.ModalHeader>
                        <S.ModalText>이 행성을 선택하시겠습니까?</S.ModalText>
                    </S.ModalHeader>
                    <S.ModalBody>

                        <S.BoxStyle >
                            <S.Image source={planetData[equippedPlanetIndex].Planet} resizeMode="contain" />
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
                            <S.Image source={planetData[selectedPlanetIndex].Planet} resizeMode="contain" />
                        </S.BoxStyle>

                    </S.ModalBody>
                    <S.ModalFooter>
                        <S.ModalButton onPress={handleEquippedPlanetChange}>
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

export default planetSelectModal;
