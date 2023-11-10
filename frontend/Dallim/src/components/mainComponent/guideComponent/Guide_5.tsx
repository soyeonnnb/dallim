// 예시: Guide_1.tsx
import React from 'react';
import * as S from './Guide_5.styles';

const Guide_5: React.FC = () => {
    return (
        <S.StyledPage>
            <S.Header>
                <S.MainText>기록 확인</S.MainText>
            </S.Header>
            <S.RunBody>
                {/* 좌 */}
                <S.RunBox>
                    <S.ImageBox>
                        <S.Image
                            source={require('@/assets/images/watchGuide/RecordCheck_1.png')} resizeMode='contain'
                        />
                    </S.ImageBox>

                    <S.ImageBottom>
                        <S.RecordText>혼자 달린 기록을 볼 수 있어요.</S.RecordText>
                    </S.ImageBottom>

                    <S.ImageBox>
                        <S.ImageSideBox>
                            <S.Image
                                source={require('@/assets/images/watchGuide/RecordCheck_2.png')} resizeMode='contain'
                            />
                        </S.ImageSideBox>
                        <S.ImageSideBox>
                            <S.Image
                                source={require('@/assets/images/watchGuide/RecordCheck_3.png')} resizeMode='contain'
                            />
                        </S.ImageSideBox>
                    </S.ImageBox>
                    <S.ImageBottom>
                        <S.RecordText>기록을 뛰어 넘었는지 확인해봐요</S.RecordText>
                    </S.ImageBottom>

                </S.RunBox>
            </S.RunBody>
            {/* <S.RunFooter>
                <S.SubText>달리기를 끝낸 후, 기록을 확인해봐요</S.SubText>
            </S.RunFooter> */}

        </S.StyledPage>
    );
};

export default Guide_5;
