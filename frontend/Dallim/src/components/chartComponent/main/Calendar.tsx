import {useEffect, useState} from 'react';
import {Dimensions, Text} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import * as S from './Calendar.styles';

import ArrowLeft from '@/assets/icons/ArrowLeft';
import ArrowRight from '@/assets/icons/ArrowRight';
import {MonthlyRecords} from '@/apis/ChartApi';
import Toast from 'react-native-toast-message';
import {CalendarType, getDateObject} from '@/recoil/CalendarData';
import {colors} from '@/components/common/globalStyles';

interface Props {
  isClicked?: boolean;
  selectedDate?: CalendarType;
  setIsClicked: any;
  setSelectedDate: any;
  everyRecords?: MonthlyRecords[];
  selectedYearMonth?: {year: number; month: number};
  setSelectedYearMonth?: any;
  previewChartType: 'week' | 'month';
  setPreviewChartType: any;
}

function ChartCalendar({
  isClicked,
  selectedDate,
  setIsClicked,
  setSelectedDate,
  everyRecords,
  // selectedYearMonth,
  setSelectedYearMonth,
  // previewChartType,
  setPreviewChartType,
}: Props) {
  const [nowDateString, setNowDateString] = useState<string>();
  const [markedDates, setMarkedDates] = useState<{[key: string]: MarkType}>({});
  const [dayHaveDatas, setDayHaveDatas] = useState<string[]>([]);

  const defaultSelectedColor = colors.lightLavender;
  const clickedSelectedColor = colors.darkPurple;

  type MarkType = {
    selected?: boolean;
    selectedColor?: string;
    selectedTextColor?: string;
  };

  useEffect(() => {
    // 현재 날짜 가져오기
    const now = new Date();
    setNowDateString(
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    );

    // 사용자가 달린 날들에 대해 체크표시 하기
    const marks: {[key: string]: MarkType} = {};
    const keyList: string[] = [];

    everyRecords?.map(monthData => {
      monthData.records.map(record => {
        const recordDate = getDateObject(record.createdAt);
        const recordDateString = `${recordDate.year}-${
          recordDate.month < 10 ? '0' : ''
        }${recordDate.month}-${recordDate.day < 10 ? '0' : ''}${
          recordDate.day
        }`;
        marks[recordDateString] = {
          selected: true,
          selectedTextColor: colors.darkPurple,
          selectedColor: defaultSelectedColor,
        };
        keyList.push(recordDateString);
      });
    });
    setMarkedDates(marks);
    setDayHaveDatas(keyList);
  }, []);

  // 달 바뀜
  const handleMonthChange = async (date: CalendarType) => {
    if (nowDateString?.slice(0, 7) === date.dateString.slice(0, 7)) {
      setPreviewChartType('week');
    } else {
      setPreviewChartType('month');
    }
    setSelectedYearMonth({
      year: date.year,
      month: date.month,
    });
    setSelectedDate(null);
    setIsClicked(false);
  };

  // 특정 날짜 선택시
  const handleClickedSelectedDate = (day: CalendarType) => {
    if (!dayHaveDatas.includes(day.dateString)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: '달리기 안한날!',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 10,
      });
      return;
    }
    let updatedMarkedDates = {...markedDates}; // 여기서 새로운 객체를 만듭니다.

    if (
      isClicked &&
      selectedDate &&
      selectedDate.dateString === day.dateString
    ) {
      // 선택 해제
      updatedMarkedDates[day.dateString] = {
        selected: true,
        selectedColor: defaultSelectedColor,
        selectedTextColor: colors.darkPurple,
      };
      setMarkedDates(updatedMarkedDates);
      setSelectedDate(null);
      setIsClicked(false);
    } else {
      // 선택하기
      if (selectedDate) {
        updatedMarkedDates[selectedDate.dateString] = {
          selected: true,
          selectedColor: defaultSelectedColor,
          selectedTextColor: colors.darkPurple,
        };
      }
      updatedMarkedDates[day.dateString] = {
        selected: true,
        selectedColor: clickedSelectedColor,
        selectedTextColor: 'white',
      };
      setMarkedDates(updatedMarkedDates);
      setSelectedDate(day);
      setIsClicked(true);
    }
  };

  return (
    <S.Container>
      <S.CalendarContainer>
        <CalendarList
          style={{
            // backgroundColor: 'transparent', // 얘만 나중에 transparent로 바꾸기
            width: Dimensions.get('window').width, // calendar scroll시 가운데로 가도록 해줌
          }}
          // 화살표
          renderArrow={direction => {
            return (
              <Text>
                {direction === 'left' ? (
                  <ArrowLeft width={25} height={25} color="white" />
                ) : (
                  <ArrowRight width={25} height={25} color="white" />
                )}
              </Text>
            );
          }}
          theme={{
            calendarBackground: 'transparent',
            textDayFontSize: 20, // 날짜 폰트 크기
            textDayHeaderFontSize: 17,
            dayTextColor: 'white', // 날짜 폰트 색깔
            weekVerticalMargin: 10,
            todayTextColor: 'yellow',
            // 어쩔 수 없는 에러. 타입스크립트로 인해 발생.
            'stylesheet.calendar.header': {
              header: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
              },
              monthText: {
                lineHeight: 30,
                fontSize: 23,
                color: 'white',
                marginLeft: 30,
                marginRight: 30,
              },
            },
          }}
          // calendar에서 month가 바뀔 때 실행하는 함수
          onVisibleMonthsChange={months => {
            handleMonthChange(months[0]);
          }}
          hideArrows={false} // 다음 달로 가는 화살표
          // disableArrowRight 다음달로 가는 화살표 숨기기

          horizontal={true}
          pagingEnabled={true}
          // 현재 날짜
          current={nowDateString}
          // 날짜 선택 시 실행
          onDayPress={day => {
            handleClickedSelectedDate(day);
          }}
          // 체크되어야 하는 날짜 지정
          markedDates={markedDates}
          monthFormat={`yyyy년 MM월`}
          futureScrollRange={0}
          pastScrollRange={20}
        />
      </S.CalendarContainer>
    </S.Container>
  );
}

export default ChartCalendar;
