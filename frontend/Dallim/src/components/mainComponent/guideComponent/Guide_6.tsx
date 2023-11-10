// 예시: Guide_1.tsx
import React from 'react';
import * as S from './Guide_6.styles';

const Guide_6: React.FC = () => {
    return (
        <S.StyledPage>
            <S.Header>
                <S.MainText>설정</S.MainText>
            </S.Header>
            <S.RunBody>
                {/* 좌 */}
                <S.RunBox>
                    <S.ImageBox>
                        <S.ImageSideBox>
                            <S.Image
                                source={require('@/assets/images/watchGuide/Setting_1.png')} resizeMode='contain'
                            />
                        </S.ImageSideBox>
                        <S.ImageSideBox>
                            <S.Image
                                source={require('@/assets/images/watchGuide/Setting_2.png')} resizeMode='contain'
                            />
                        </S.ImageSideBox>
                    </S.ImageBox>

                    <S.ImageBottom>
                        <S.RecordText>인터넷이 끊겨있는 경우, 데이터를 쌓아놔요.</S.RecordText>
                    </S.ImageBottom>

                    <S.ImageBox>
                        <S.ImageSideBox>
                            <S.Image
                                source={require('@/assets/images/watchGuide/Setting_3.png')} resizeMode='contain'
                            />
                        </S.ImageSideBox>
                        <S.ImageSideBox>
                            <S.Image
                                source={require('@/assets/images/watchGuide/Setting_4.png')} resizeMode='contain'
                            />
                        </S.ImageSideBox>
                    </S.ImageBox>
                    <S.ImageBottom>
                        <S.RecordText>모바일과 연결을 관리할 수 있어요.</S.RecordText>
                    </S.ImageBottom>

                </S.RunBox>
            </S.RunBody>
            {/* <S.RunFooter>
                <S.SubText>달리기를 끝낸 후, 기록을 확인해봐요</S.SubText>
            </S.RunFooter> */}

        </S.StyledPage>
    );
};

export default Guide_6;
