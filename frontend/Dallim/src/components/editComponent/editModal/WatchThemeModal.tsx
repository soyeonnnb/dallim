import * as S from './WatchThemeModal.styles';
import { planetData } from '@/recoil/PlanetData';
import { Modal } from 'react-native';
import CloseIcon from '@/assets/icons/CloseIcon_2.png';
import React from 'react';

type Props = {
    isVisible: boolean;
    onClose: () => void;
    index: number;
};

const WatchThemeModal: React.FC<Props> = ({ isVisible, onClose, index }) => {

    const Text = "워치화면 미리보기";

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <S.ModalContainer>
                <S.ModalContent>
                    <S.BackgroundImage source={planetData[index].Theme} >
                        <S.Header>
                            <S.HeaderSide />
                            <S.HeaderMiddle>
                                <S.Text>{Text}</S.Text>
                            </S.HeaderMiddle>
                            <S.HeaderSide >
                                <S.CloseButton onPress={onClose}>
                                    <S.CloseImage source={CloseIcon} />
                                </S.CloseButton>
                            </S.HeaderSide>
                        </S.Header>
                        <S.Body>
                            <S.Watch>
                                <S.WatchImage source={planetData[index].watch} resizeMode="contain" />
                            </S.Watch>
                        </S.Body>
                    </S.BackgroundImage>
                </S.ModalContent>
            </S.ModalContainer>
        </Modal>
    );
};

export default WatchThemeModal;
