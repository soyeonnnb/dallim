
import React from 'react';
import { Modal, TouchableOpacity, Text, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import * as S from './SampleModal.styles';

interface Props {
    isVisible: boolean;
    onClose: () => void;
}

const QuestionModal: React.FC<Props> = ({ isVisible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <BlurView
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                blurType="dark" // "dark", "extraDark", "light" 블러 타입 선택
                blurAmount={5}  // 블러 정도 설정
            >
                <TouchableOpacity onPress={onClose} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <S.ModalContent>
                        <S.Text>이번주 뛴 거리의 랭킹입니다.</S.Text>
                    </S.ModalContent>
                </TouchableOpacity>
            </BlurView>
        </Modal>
    );
}

export default QuestionModal;
