import {useEffect, useState} from 'react';
import {Dimensions, Text} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import * as S from './Calendar.styles';
import {getCurrentDate, CalendarType} from '@/recoil/CalendarData';

import ArrowLeft from '@/assets/icons/ArrowLeft';
import ArrowRight from '@/assets/icons/ArrowRight';
import {MonthlyRecords} from '@/apis/ChartApi';
import Toast from 'react-native-toast-message';
import {makeShareableCloneRecursive} from 'react-native-reanimated';

interface Props {
  isClicked?: boolean;
  selectedDate?: CalendarType;
  setIsClicked: any;
  setSelectedDate: any;
  everyRecords?: MonthlyRecords[];
}

function ChartCalendar({
  isClicked,
  selectedDate,
  setIsClicked,
  setSelectedDate,
  everyRecords,
}: Props) {
  const [nowDateString, setNowDateString] = useState<string>();
  const [markedDates, setMarkedDates] = useState<{[key: string]: MarkType}>({});
  const [dayHaveDatas, setDayHaveDatas] = useState<string[]>([]);
  const defaultSelectedColor = 'blue';
  const clickedSelectedColor = 'gray';
  type MarkType = {selected: boolean; selectedColor: string};

  useEffect(() => {
    // 현재 날짜 가져오기
    const now = getCurrentDate();
    setNowDateString(now[0] + '-' + now[1] + '-' + now[2]);

    // 사용자가 달린 날들에 대해 체크표시 하기
    const marks: {[key: string]: MarkType} = {};
    const keyList: string[] = [];

    everyRecords?.map(monthData => {
      monthData.records.map(record => {
        const recordDate = record.createdAt.slice(0, 10);
        marks[recordDate] = {
          selected: true,
          selectedColor: defaultSelectedColor,
        };
        keyList.push(recordDate);
      });
    });
    setMarkedDates(marks);

    setDayHaveDatas(keyList);
  }, [everyRecords]);

  // 달 바뀜
  const handleMonthChange = async (date: CalendarType) => {
    let marks = {};
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
        };
      }
      updatedMarkedDates[day.dateString] = {
        selected: true,
        selectedColor: clickedSelectedColor,
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
