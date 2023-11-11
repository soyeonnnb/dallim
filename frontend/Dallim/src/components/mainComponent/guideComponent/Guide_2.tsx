import React from 'react';
import * as S from './Guide_2.styles';

const Guide_2: React.FC = () => {
  return (
    <S.StyledPage>
      <S.Header>
        <S.MainText>웨어러블 기기 연결</S.MainText>
      </S.Header>
      <S.Body>
        <S.WatchLinkLeftBox>
          <S.Image
            source={require('@/assets/images/watchGuide/WatchLinkBox_1.png')}
            resizeMode="contain"
          />
        </S.WatchLinkLeftBox>
        <S.WatchLinkRightBox>
          <S.Image
            source={require('@/assets/images/watchGuide/WatchLinkBox_2.png')}
            resizeMode="contain"
          />
        </S.WatchLinkRightBox>
      </S.Body>
      <S.Footer>
        <S.SubText>워치에 보이는 6자리 숫자를 입력해주세요</S.SubText>
      </S.Footer>
    </S.StyledPage>
  );
};

export default Guide_2;
