import React, {useCallback, useMemo, useRef, useState} from 'react';
import * as S from './ChartMain.styles'; // 스타일 컴포넌트 import

import Calendar from '../../components/chartComponent/main/Calendar';
import Preview from '../../components/chartComponent/main/Preview';
import {View, Text, StyleSheet} from 'react-native';
import {CalendarType} from '@/components/common/CalendarData';

function Chart() {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<CalendarType>();
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
        setSelectedDate={setSelectedDate}></Calendar>
      <Preview isClicked={isClicked} selectedDate={selectedDate}></Preview>
    </>
  );
}
export default Chart;
