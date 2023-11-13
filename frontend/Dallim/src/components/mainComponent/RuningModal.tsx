// ExitModal.tsx
import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

interface ModalProps {
    isVisible: boolean;
    modalType: string | null;
    onConfirm: () => void;
    onCancel: () => void;
}

const RuningModal: React.FC<ModalProps> = ({ isVisible, modalType, onConfirm, onCancel }) => {
    return (
        <Modal visible={isVisible}>
            <View>
                {/* 모달 내용 조건부 렌더링 */}
                <Text>{modalType === 'start' ? '러닝을 시작하시겠습니까?' : '러닝을 종료하시겠습니까?'}</Text>
                <Button title="확인" onPress={onConfirm} />
                <Button title="취소" onPress={onCancel} />
            </View>
        </Modal>
    );
};

export default RuningModal;