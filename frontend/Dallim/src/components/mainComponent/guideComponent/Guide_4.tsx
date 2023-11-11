// 예시: Guide_1.tsx
import React from 'react';
import * as S from './Guide_4.styles';

const Guide_4: React.FC = () => {
  return (
    <S.StyledPage>
      <S.Header>
        <S.MainText>함께 달리기</S.MainText>
      </S.Header>
      <S.RunBody>
        {/* 좌 */}
        <S.RunBox>
          <S.ImageBox></S.ImageBox>
          <S.ImageBox>
            <S.Image
              source={require('@/assets/images/watchGuide/RunWith_2.png')}
              resizeMode="contain"
            />
          </S.ImageBox>
          <S.ImageBox></S.ImageBox>
        </S.RunBox>
        {/* 우 */}
        <S.RunBox>
          <S.ImageBox>
            <S.Image
              source={require('@/assets/images/watchGuide/RunWith_1.png')}
              resizeMode="contain"
            />
          </S.ImageBox>
          <S.ImageBox></S.ImageBox>
          <S.ImageBox>
            <S.Image
              source={require('@/assets/images/watchGuide/RunWith_3.png')}
              resizeMode="contain"
            />
          </S.ImageBox>
        </S.RunBox>
      </S.RunBody>
      <S.RunFooter>
        <S.SubText>나 또는 친구의 기록과 경쟁하면서 체력을 길러요</S.SubText>
      </S.RunFooter>
    </S.StyledPage>
  );
};

export default Guide_4;
