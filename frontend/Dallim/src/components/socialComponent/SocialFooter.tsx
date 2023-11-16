import React, { useState } from 'react';
import * as S from './SocialFooter.styles';
import FriendListModal from './socialModal/FriendManageModal';

function SocialBottom() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <S.Container>
            <S.Box>
                <S.Manage onPress={() => {
                    setModalVisible(true);
                }}>
                    <S.ManageText>친구 관리</S.ManageText>
                </S.Manage>
            </S.Box>

            <FriendListModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </S.Container>
    );
};

export default SocialBottom;
