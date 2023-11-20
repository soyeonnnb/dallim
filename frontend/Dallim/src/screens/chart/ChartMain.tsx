import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import * as S from './ChartMain.styles';

// 컴포넌트
import Calendar from '../../components/chartComponent/main/Calendar';
import Preview from '../../components/chartComponent/main/Preview';
import Loading from '@/components/common/Loading_Run';

//
// API
import { MonthlyRecords, fetchUserCalendarChart } from '@/apis/ChartApi';
import { CalendarType } from '@/recoil/data/CalendarData';

function Chart() {
  const isFocused = useIsFocused();

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<CalendarType>();
  const [everyRecords, setEveryRecords] = useState<MonthlyRecords[]>([]);
  const [selectedYearMonth, setSelectedYearMonth] = useState<{
    year: number;
    month: number;
  }>({ year: 2023, month: 11 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [previewChartType, setPreviewChartType] = useState<'week' | 'month'>(
    'week',
  );

  const fetchCalendarData = async () => {
    try {
      const data = await fetchUserCalendarChart();
      setEveryRecords(data);
      // console.log('ChartApi : 유저 달리기 기록 전체 조회 Axios 성공');
      setIsLoading(false);
    } catch (error) {
      console.log('ChartApi : 유저 달리기 기록 전체 조회 Axios 실패 ', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchCalendarData();
    }
  }, [isFocused]);

  // 새로고침 버튼을 눌렀을 때 실행할 함수
  const handleReload = () => {
    setIsLoading(true); 
    fetchCalendarData();
  };

  return (
    <>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground.png')}
        resizeMode="cover"
      />
      {isLoading ? (
        <Loading onReload={handleReload} />
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
