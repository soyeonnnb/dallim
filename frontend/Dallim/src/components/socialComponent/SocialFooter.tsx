import React, { useState } from 'react';
import * as S from './SocialFooter.styles';
import FriendListModal from './socialModal/FriendListModal';

function SocialBottom() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <S.Container>
            <S.Box>
                <S.Manage onPress={() => {
                    console.log("친구 관리 버튼 클릭확인");
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
