import React from 'react';
import * as S from './RankInfoBox.styles';

function RankInfoBox() {

    const Rank = 1;
    const Distance = 123;
    const Nickname = "배고픈 하마";
    const Level = 66;
    return (
        <S.Container>
            <S.Box>
                <S.Left>
                    <S.RankText>{Rank}</S.RankText>
                </S.Left>
                <S.Middle>
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
        </S.Container>
    );
};

export default RankInfoBox;
