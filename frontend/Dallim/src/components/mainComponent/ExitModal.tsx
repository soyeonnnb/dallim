// ExitModal.tsx
import React from 'react';
import { Modal, View, Text, Button } from 'react-native';
// 필요한 스타일링 및 기타 import 추가

interface ExitModalProps {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ isVisible, onConfirm, onCancel }) => {
    return (
        <Modal
            visible={isVisible}
        // 모달 관련 기타 속성
        >
            <View>
                {/* 모달 내용 */}
                <Text>정말 종료하시겠습니까?</Text>
                <Button title="확인" onPress={onConfirm} />
                <Button title="취소" onPress={onCancel} />
            </View>
        </Modal>
    );
};

export default ExitModal;