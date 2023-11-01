import {useState, useEffect} from 'react';
import * as S from './ChartMain.styles'; // 스타일 컴포넌트 import

import Calendar from '../../components/chartComponent/main/Calendar';
import Preview from '../../components/chartComponent/main/Preview';
import {CalendarType} from '@/recoil/CalendarData';
import {MonthlyRecords, fetchUserCalendarChart} from '@/apis/ChartApi';
import Loading from '@/components/common/Loading';

function Chart() {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<CalendarType>();
  const [everyRecords, setEveryRecords] = useState<MonthlyRecords[]>([]);
  const [selectedYearMonth, setSelectedYearMonth] = useState<{
    year: number;
    month: number;
  }>({year: 2023, month: 11});

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [previewChartType, setPreviewChartType] = useState<'week' | 'month'>(
    'week',
  );
  const fetchCalendarData = async () => {
    try {
      const data = await fetchUserCalendarChart();
      setEveryRecords(data);
      setIsLoading(false);
    } catch (error) {
      console.error('데이터 불러오기 에러 :', error);
    }
  };
  useEffect(() => {
    fetchCalendarData();
  }, []);
  // 현재 선택된 해나 달이 바뀌었을 때 기록 변경
  useEffect(() => {}, [selectedYearMonth]);

  return (
    <>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover"
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Calendar
            isClicked={isClicked}
            selectedDate={selectedDate}
            setIsClicked={setIsClicked}
            setSelectedDate={setSelectedDate}
            everyRecords={everyRecords}
            selectedYearMonth={selectedYearMonth}
            setSelectedYearMonth={setSelectedYearMonth}
            previewChartType={previewChartType}
            setPreviewChartType={setPreviewChartType}
          />
          <Preview
            isClicked={isClicked}
            selectedDate={selectedDate}
            everyRecords={everyRecords}
            selectedYearMonth={selectedYearMonth}
            setSelectedYearMonth={setSelectedYearMonth}
            previewChartType={previewChartType}
          />
        </>
      )}
    </>
  );
}
export default Chart;
