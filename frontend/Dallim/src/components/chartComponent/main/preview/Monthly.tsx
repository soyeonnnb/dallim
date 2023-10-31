import React from 'react';
import * as S from './Monthly.styles';

interface Props {
  isShow: boolean;
}

function PreviewMonthly({isShow}: Props) {
  return (
    <S.Container isShow={isShow}>
      <S.Record></S.Record>
      <S.Chart></S.Chart>
    </S.Container>
  );
}

export default PreviewMonthly;
