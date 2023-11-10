// 예시: Guide_1.tsx
import React from 'react';
import * as S from './Guide_1.styles';

const Guide_1: React.FC = () => {
  return (
    <S.StyledPage>
      {/* <S.Header></S.Header> */}
      <S.Body>
        <S.StartBox>
          <S.Image
            source={require('@/assets/images/watchGuide/WatchGuide.png')}
            resizeMode="contain"
          />
        </S.StartBox>
      </S.Body>
      <S.Footer>
        <S.MainText>워치 가이드</S.MainText>
      </S.Footer>
    </S.StyledPage>
  );
};

export default Guide_1;
