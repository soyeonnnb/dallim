import React, {useState} from 'react';
import * as S from './PreviewDaily.styles';
import {CalendarType} from '@/components/common/CalendarData';

interface Props {
  date?: CalendarType;
  isShow: boolean;
}
interface DailyRecord {
  location: string; // 출발 위치
  distance: number; // 거리
  hour: number; // 출발 기준 시
  minute: number; // 출발 기준 분
  time: number; // 얼마나 걸렸는지 (시간)
}

function PreviewMonthly({date, isShow}: Props) {
  const [runningDatas, setRunningDatas] = useState<DailyRecord[]>([]);
  return (
    <S.Container isShow={isShow}>
      <S.Text>Daily: {date?.dateString}</S.Text>
    </S.Container>
  );
}

export default PreviewMonthly;
