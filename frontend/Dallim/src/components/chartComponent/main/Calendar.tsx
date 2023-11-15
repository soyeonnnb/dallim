import {useEffect, useState} from 'react';
import {Dimensions, Text} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Toast from 'react-native-toast-message';

import * as S from './Calendar.styles';
import {borderRadius, colors} from '@/components/common/globalStyles';

// 컴포넌트
import ArrowLeft from '@/assets/icons/ArrowLeft';
import ArrowRight from '@/assets/icons/ArrowRight';

// API
import {MonthlyRecords} from '@/apis/ChartApi';
import {CalendarType, getDateObject} from '@/recoil/CalendarData';
import {numberToTwoString} from '@/recoil/RunningData';
import {setDay} from 'date-fns';

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
  setSelectedYearMonth,
  setPreviewChartType,
}: Props) {
  const [nowDateString, setNowDateString] = useState<string>();
  const [markedDates, setMarkedDates] = useState<{[key: string]: any}>({});
  const [dayHaveDatas, setDayHaveDatas] = useState<string[]>([]);

  const defaultSelectedColor = 'white';
  const clickedSelectedColor = colors.purple._900;
  const defaultSelectedStyle = {
    customStyles: {
      container: {
        backgroundColor: 'white',
        borderRadius: 100,
        elevation: 10,
        shadowOffset: {
          width: 50,
          height: 50,
        },
        shadowColor: 'white',
        shadowOpacity: 1,
        width: 35,
        height: 35,
      },
      text: {
        color: colors.text.black,
      },
    },
  };
  const clickedSelectedStyle = {
    customStyles: {
      container: {
        backgroundColor: colors.lavendar._600,
        borderRadius: 100,
        elevation: 10,
        shadowOffset: {
          width: 0,
          height: -1,
        },
        shadowColor: 'white',
        shadowOpacity: 1,
        width: 35,
        height: 35,
      },
      text: {
        color: colors.text.white,
      },
    },
  };

  useEffect(() => {
    // 현재 날짜 가져오기
    const now = new Date();
    setNowDateString(
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    );

    // 사용자가 달린 날들에 대해 체크표시 하기
    const marks: {[key: string]: any} = {};
    const keyList: string[] = [];

    everyRecords?.map(monthData => {
      monthData.records.map(record => {
        const recordDate = getDateObject(record.createdAt);
        const recordDateString = `${recordDate.year}-${numberToTwoString(
          recordDate.month,
        )}-${numberToTwoString(recordDate.date)}`;
        marks[recordDateString] = defaultSelectedStyle;
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
      updatedMarkedDates[day.dateString] = defaultSelectedStyle;
      setMarkedDates(updatedMarkedDates);
      setSelectedDate(null);
      setIsClicked(false);
    } else {
      // 선택하기
      if (selectedDate) {
        updatedMarkedDates[selectedDate.dateString] = defaultSelectedStyle;
      }
      updatedMarkedDates[day.dateString] = clickedSelectedStyle;
      setMarkedDates(updatedMarkedDates);
      setSelectedDate(day);
      setIsClicked(true);
    }
  };
  const [calendarHeight, setCalendarHeight] = useState<number>();
  const onLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setCalendarHeight(height);
  };
  return (
    <S.Container>
      <S.CalendarContainer onLayout={onLayout}>
        <CalendarList
          style={{
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
            weekVerticalMargin: 13,
            todayTextColor: 'yellow',
            // 어쩔 수 없는 에러. 타입스크립트로 인해 발생.
            'stylesheet.calendar.main': {
              container: {
                height: calendarHeight,
              },
            },
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
            'stylesheet.day.single': {
              base: {
                overflow: 'hidden',
                height: 34,
                alignItems: 'center',
                width: 38,
              },
            },
            'stylesheet.marking': {
              width: '30px',
              height: '50px',
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
          markingType={'custom'}
        />
      </S.CalendarContainer>
    </S.Container>
  );
}

export default ChartCalendar;
