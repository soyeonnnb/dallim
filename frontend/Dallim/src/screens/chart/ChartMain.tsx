import {useState, useEffect} from 'react';
import * as S from './ChartMain.styles'; // 스타일 컴포넌트 import

import Calendar from '../../components/chartComponent/main/Calendar';
import Preview from '../../components/chartComponent/main/Preview';
import {CalendarType} from '@/recoil/CalendarData';
import {MonthlyRecords, fetchUserCalendarChart} from '@/apis/ChartApi';

function Chart() {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<CalendarType>();
  const [everyRecords, setEveryRecords] = useState<MonthlyRecords[]>([]);

  const fetchCalendarData = async () => {
    try {
      const data = await fetchUserCalendarChart();
      setEveryRecords(data);
    } catch (error) {
      console.error('데이터 불러오기 에러 :', error);
    }
  };
  useEffect(() => {
    fetchCalendarData();
  }, []);

  return (
    <>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground4.png')}
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
