import React from 'react';
import * as S from './PreviewMonthly.styles';

interface Props {
  isShow: boolean;
}

function PreviewMonthly({isShow}: Props) {
  return (
    <S.Container isShow={isShow}>
      <S.Text>Monthly</S.Text>
    </S.Container>
  );
}

export default PreviewMonthly;
