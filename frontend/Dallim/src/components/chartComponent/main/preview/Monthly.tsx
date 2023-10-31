import React from 'react';
import * as S from './Monthly.styles';

import MonthlyRecord from './MonthlyRecord';
import MonthlyChart from './MonthlyChart';

interface Props {
  isShow: boolean;
}

function PreviewMonthly({isShow}: Props) {
  return (
    <S.Container isShow={isShow}>
      <MonthlyRecord />
      <MonthlyChart />
    </S.Container>
  );
}

export default PreviewMonthly;
