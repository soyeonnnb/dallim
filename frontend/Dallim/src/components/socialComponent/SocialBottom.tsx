import React from 'react';
import * as S from './SocialBottom.styles';

function SocialBottom() {

    return (
        <S.Container>
            <S.Box>
                <S.Manage onPress={() => {
                    console.log("팔로잉 관리 버튼 클릭확인");
                }}>
                    <S.ManageText>팔로잉 관리</S.ManageText>
                </S.Manage>
            </S.Box>
        </S.Container>
    );
};

export default SocialBottom;
