import React, {useState, useEffect} from 'react';
import * as S from './ChartMain.styles'; // 스타일 컴포넌트 import

import Calendar from '../../components/chartComponent/main/Calendar';
import Preview from '../../components/chartComponent/main/Preview';
import {View, Text, StyleSheet} from 'react-native';
import {CalendarType} from '@/recoil/CalendarData';
import {data} from './recordDummyData.json';
import {MonthlyRecords} from '@/apis/ChartApi';

function Chart() {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<CalendarType>();
  const [everyRecords, setEveryRecords] = useState<MonthlyRecords[]>([]);

  useEffect(() => {
    setEveryRecords(data);
  }, []);

  return (
    <>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground3.png')}
        resizeMode="cover"
      />
      <Calendar
        isClicked={isClicked}
        selectedDate={selectedDate}
        setIsClicked={setIsClicked}
        setSelectedDate={setSelectedDate}
        everyRecords={everyRecords}
      />
      <Preview
        isClicked={isClicked}
        selectedDate={selectedDate}
        everyRecords={everyRecords}
      />
    </>
  );
}
export default Chart;
