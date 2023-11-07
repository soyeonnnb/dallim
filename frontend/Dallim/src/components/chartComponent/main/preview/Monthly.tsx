import React, {useEffect, useState} from 'react';
import * as S from './Monthly.styles';
import MonthlyRecord from './MonthlyRecord';
import MonthlyChart from './MonthlyChart';

interface Props {
  isShow: boolean;
  selectedYearMonth: {year: number; month: number};
  setSelectedYearMonth: any;
  previewRecords: {
    count: number;
    distance: number;
    time: number;
    runningMate: {
      characterIndex: number;
      evolutionStage: number;
      nickname: string;
    };
  };
  previewMonthRankingRecords: {
    stacks: {value: number; color: string}[];
    label: string;
  }[];
}

function PreviewMonthly({
  isShow,
  selectedYearMonth,
  setSelectedYearMonth,
  previewRecords,
  previewMonthRankingRecords,
}: Props) {
  return (
    <S.Container isShow={isShow}>
      <MonthlyRecord
        selectedYearMonth={selectedYearMonth}
        previewRecords={previewRecords}
      />
      <MonthlyChart
        selectedYearMonth={selectedYearMonth}
        setSelectedYearMonth={setSelectedYearMonth}
        previewMonthRankingRecords={previewMonthRankingRecords}
      />
    </S.Container>
  );
}

export default PreviewMonthly;
