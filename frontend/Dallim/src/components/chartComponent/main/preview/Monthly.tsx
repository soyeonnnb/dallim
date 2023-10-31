import React, {useEffect, useState} from 'react';
import * as S from './Monthly.styles';
import {getCurrentDate} from '@/components/common/CalendarData';

import MonthlyRecord from './MonthlyRecord';
import MonthlyChart from './MonthlyChart';

interface Props {
  isShow: boolean;
}

function PreviewMonthly({isShow}: Props) {
  const [year, setYear] = useState<number>(2023);
  const [month, setMonth] = useState<number>(11);

  useEffect(() => {
    const now = getCurrentDate();
    setYear(now[0]);
    setMonth(now[1]);
  }, [isShow]);
  return (
    <S.Container isShow={isShow}>
      <MonthlyRecord year={year} month={month} />
      <MonthlyChart
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
      />
    </S.Container>
  );
}

export default PreviewMonthly;
