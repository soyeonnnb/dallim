import React, { useState } from 'react';
import * as S from './RankInfoBox.styles';
import VersusModal from './socialModal/VersusModal';

function RankInfoBox() {
    const Rank = 1;
    const Distance = 123;
    const Nickname = "배고픈 하마";
    const Level = 66;

     // Versus 모달
     const [isVersusModalVisible, setVersusModalVisible] = useState(false);

    return (
        <S.Container>
            <S.Box>
                <S.Left>
                    <S.RankText>{Rank}</S.RankText>
                </S.Left>
                <S.Middle onPress={() => setVersusModalVisible(true)}>
                    <S.Header>
                        <S.DistanceText>{Distance}m</S.DistanceText>
                    </S.Header>
                    <S.Body>
                        <S.NickNameText>{Nickname}  </S.NickNameText>
                        <S.LevelText>Lv. {Level}</S.LevelText>
                    </S.Body>
                </S.Middle>
                <S.Right>
                    {/* 친구가 아닌경우에만 생성되게 할 예정 */}
                    <S.AddFriendButton onPress={() => {
                        console.log("친구 추가 버튼 눌림확인");
                    }}>
                        <S.AddFriendImage source={require('../../assets/icons/AddFriendIcon.png')} />
                    </S.AddFriendButton>
                </S.Right>
            </S.Box>
            <VersusModal
                isVisible={isVersusModalVisible}
                onClose={() => setVersusModalVisible(false)}
            />
        </S.Container>
    );
};

export default RankInfoBox;
