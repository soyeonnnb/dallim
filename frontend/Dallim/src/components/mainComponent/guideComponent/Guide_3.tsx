import React from 'react';
import * as S from './Guide_3.styles';

const Guide_3: React.FC = () => {
    return (
        <S.StyledPage>
            <S.Header>
                <S.MainText>혼자 달리기</S.MainText>
            </S.Header>
            <S.RunBody>
                {/* 좌 */}
                <S.RunBox>
                    <S.ImageBox>
                        <S.Image
                            source={require('@/assets/images/watchGuide/RunAlone_1.png')} resizeMode='contain'
                        />
                    </S.ImageBox>
                    <S.ImageBox></S.ImageBox>
                    <S.ImageBox>
                        <S.Image
                            source={require('@/assets/images/watchGuide/RunFinish.png')} resizeMode='contain'
                        />
                    </S.ImageBox>
                </S.RunBox>
                {/* 우 */}
                <S.RunBox>
                    <S.ImageBox></S.ImageBox>
                    <S.ImageBox>
                        <S.Image
                            source={require('@/assets/images/watchGuide/RunAlone_2.png')} resizeMode='contain'
                        />
                    </S.ImageBox>
                    <S.ImageBox></S.ImageBox>
                </S.RunBox>
            </S.RunBody>
            <S.RunFooter>
                <S.SubText>혼자 달리면서 캐릭터를 성장시켜요</S.SubText>

            </S.RunFooter>

        </S.StyledPage>
    );
};

export default Guide_3;
