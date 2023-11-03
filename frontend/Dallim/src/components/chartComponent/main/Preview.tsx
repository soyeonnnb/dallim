/* eslint-disable curly */
import React, {useRef, useState, useMemo, useCallback, useEffect} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import PreviewDaily from './preview/Daily';
import PreviewRecord from './preview/PreviewRecord';
import PreviewMonthly from './preview/Monthly';
import * as S from './Preview.styles';
import {CalendarType} from '@/recoil/CalendarData';
import {MonthlyRecords} from '@/apis/ChartApi';

interface Props {
  isClicked?: boolean;
  selectedDate?: CalendarType;
  everyRecords?: MonthlyRecords[];
  selectedYearMonth: {year: number; month: number};
  setSelectedYearMonth?: any;
  previewChartType: 'week' | 'month';
}

export interface DailyRecord {
  id: string;
  location: string; // 출발 위치
  distance: number; // 거리
  hour: number; // 출발 기준 시
  minute: number; // 출발 기준 분
  time: number; // 얼마나 걸렸는지 (시간)
}

function Preview({
  isClicked,
  selectedDate,
  everyRecords,
  selectedYearMonth,
  setSelectedYearMonth,
  previewChartType,
}: Props) {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isUp, setIsUp] = useState(false);
  const [dailyRecords, setDailyRecords] = useState<DailyRecord[]>();
  const [previewRecords, setPreviewRecords] = useState<{
    count: number;
    distance: number;
    time: number;
    runningMate: {
      characterIndex: number;
      evolutionStage: number;
      nickname: string;
    };
  }>({
    count: 0,
    distance: 0,
    time: 0,
    runningMate: {
      characterIndex: 0,
      evolutionStage: 0,
      nickname: '',
    },
  });

  const snapPoints = useMemo(() => ['40%', '90%'], []); // 전체 화면에서 몇퍼센트 차지할

  // sheet size 수정 시 실행
  const handleSheetChanges = useCallback((index: number) => {
    if (index == 0) setIsUp(false); // 0이 40%
    else setIsUp(true);
  }, []);

  // 선택된 해/달 변화시 발생
  useEffect(() => {
    const newMonth: {
      count: number;
      distance: number;
      time: number;
      runningMate: {
        characterIndex: number;
        evolutionStage: number;
        nickname: string;
      };
    } = {
      count: 0,
      distance: 0,
      time: 0,
      runningMate: {
        characterIndex: 0,
        evolutionStage: 0,
        nickname: '',
      },
    };
    everyRecords?.map(monthData => {
      if (
        monthData.year === selectedYearMonth.year &&
        monthData.month === selectedYearMonth.month
      ) {
        monthData.records.map(record => {
          newMonth.count += 1;
          newMonth.distance += record.totalDistance;
          newMonth.time += record.totalTime;
        });
        console.log('monthData===========\n', monthData);
        newMonth.runningMate.characterIndex =
          monthData.runningMateCharacterIndex;
        newMonth.runningMate.evolutionStage = monthData.runningMateLevel;
        newMonth.runningMate.nickname = monthData.runningMateNickname;
      }
    });
    setPreviewRecords(newMonth);
  }, [selectedYearMonth]);

  // 선택된 날짜 변경 시 실행
  useEffect(() => {
    if (selectedDate == null) {
      return;
    }

    let newDailyRecords: DailyRecord[] = [];
    everyRecords?.map(monthData => {
      if (
        monthData.year === selectedDate.year &&
        monthData.month === selectedDate.month
      ) {
        monthData.records.map(record => {
          const recordDate = Number(record.createdAt.slice(8, 10));
          if (selectedDate.day === recordDate) {
            newDailyRecords.push({
              id: record.id,
              location: record.location,
              distance: record.totalDistance,
              hour: Number(record.createdAt.slice(11, 13)),
              minute: Number(record.createdAt.slice(14, 16)),
              time: record.totalTime,
            });
          }
        });
      }
    });
    setDailyRecords(newDailyRecords);
  }, [selectedDate]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0} // default 사이즈 수정시
      snapPoints={snapPoints} // sheet를 어느정도로 둘 것인지
      onChange={handleSheetChanges} // sheet 사이즈 수정시
    >
      <S.Container>
        <S.DownPreview isShow={isUp ? false : true}>
          <PreviewRecord
            isShow={isClicked ? false : true}
            type={previewChartType}
            previewRecords={previewRecords}
            year={selectedYearMonth.year}
            month={selectedYearMonth.month}
          />
          <PreviewDaily
            records={dailyRecords}
            date={selectedDate}
            isShow={isClicked ? true : false}
          />
        </S.DownPreview>
        <PreviewMonthly
          isShow={isUp ? true : false}
          selectedYearMonth={selectedYearMonth}
          setSelectedYearMonth={setSelectedYearMonth}
          previewRecords={previewRecords}
        />
      </S.Container>
    </BottomSheet>
  );
}

export default Preview;
