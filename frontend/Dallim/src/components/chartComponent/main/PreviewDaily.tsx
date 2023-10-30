import React from 'react';
import * as S from './PreviewDaily.styles';
import {CalendarType} from '@/components/common/CalendarData';

interface Props {
  date?: CalendarType;
}

function PreviewMonthly({date}: Props) {
  return (
    <S.Container>
      <S.Text>Daily: {date?.dateString}</S.Text>
    </S.Container>
  );
}

export default PreviewMonthly;
