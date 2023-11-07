import * as S from './TimePicker.styles';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

//component
import CustomToast from '../common/CustomToast';

//apis
import {postSchedule} from '@/apis/ProfileApi';

type DayOfWeek = '일' | '월' | '화' | '수' | '목' | '금' | '토';

const screenHeight = Dimensions.get('window').height;
const itemHeight = screenHeight / 20;

const TimePicker = () => {
  //state
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('30');
  const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));

  //useRef
  const hourRef = useRef<ScrollView>(null);
  const minuteRef = useRef<ScrollView>(null);

  //data
  const hours = Array.from({length: 24}, (_, i) => (i < 10 ? '0' : '') + i);
  const minutes = Array.from({length: 60}, (_, i) => (i < 10 ? '0' : '') + i);
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const dayMapping: Record<DayOfWeek, string> = {
    일: 'SUNDAY',
    월: 'MONDAY',
    화: 'TUESDAY',
    수: 'WEDNESDAY',
    목: 'THURSDAY',
    금: 'FRIDAY',
    토: 'SATURDAY',
  };

  //useEffect
  useEffect(() => {
    const initialHourIndex = hours.indexOf(selectedHour);
    const initialMinuteIndex = minutes.indexOf(selectedMinute);

    hourRef.current?.scrollTo({
      y: initialHourIndex * itemHeight,
      animated: false,
    });

    minuteRef.current?.scrollTo({
      y: initialMinuteIndex * itemHeight,
      animated: false,
    });
  }, [selectedHour, selectedMinute, hours, minutes]);

  //action
  const handleDayPress = (index: number) => {
    const updatedDays = [...selectedDays];
    updatedDays[index] = !updatedDays[index];
    setSelectedDays(updatedDays);
  };

  const handleSave = async () => {
    const isAnyDaySelected = selectedDays.some(day => day);
    if (!isAnyDaySelected) {
      CustomToast({
        type: 'error',
        text1: '요일을 선택해주세요!',
      });
      return;
    }

    const selectedDaysForRequest = days
      .filter((_, index) => selectedDays[index])
      .map(day => dayMapping[day as DayOfWeek]);

    console.log(selectedDaysForRequest);

    const hourForRequest = parseInt(selectedHour, 10);
    const minuteForRequest = parseInt(selectedMinute, 10);
    try {
      // Call postSchedule and pass the selected days and time
      const response = await postSchedule(
        selectedDaysForRequest,
        hourForRequest,
        minuteForRequest,
      );
      console.log('저장된 요일과 시간:', response);
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Schedule Save Error:', error);
      CustomToast({
        type: 'error',
        text1: '알림 등록에 실패했습니다.',
      });
    }
  };

  const handleHourChange = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);

    if (index < 0 || index >= hours.length) {
      // 스크롤이 범위를 벗어날 경우 첫 번째 아이템으로 돌아가기
      hourRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      setSelectedHour('00');
    } else {
      const newHour = hours[index];
      console.log(newHour);
      setSelectedHour(newHour);
    }
  };

  const handleMinuteChange = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);

    if (index < 0 || index >= minutes.length) {
      // 스크롤이 범위를 벗어날 경우 첫 번째 아이템으로 돌아가기
      minuteRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      setSelectedMinute('00');
    } else {
      const newMinute = minutes[index];
      console.log(newMinute);
      setSelectedMinute(newMinute);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTop></S.HeaderTop>
        <S.HeaderMiddle>
          <S.BackClock></S.BackClock>

          <S.FullClock>
            <S.MiddleClock>
              <S.MiddleClockBox>
                <ScrollView
                  ref={hourRef}
                  // onScroll={handleHourScroll}
                  showsVerticalScrollIndicator={false}
                  snapToAlignment="center"
                  snapToInterval={itemHeight}
                  decelerationRate="normal"
                  onMomentumScrollEnd={handleHourChange}
                  contentContainerStyle={{
                    paddingTop: itemHeight * 1, // 맨 위에 공간 추가
                    paddingBottom: itemHeight * 2, // 맨 아래에 공간 추가
                  }}>
                  {hours.map(hour => (
                    <View
                      key={hour}
                      style={{
                        height: itemHeight,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: selectedHour === hour ? 30 : 15,
                          color: selectedHour === hour ? 'black' : 'grey',
                          fontWeight: selectedHour === hour ? 'bold' : 'normal',
                        }}>
                        {hour}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 30,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  :
                </Text>
                <ScrollView
                  ref={minuteRef}
                  showsVerticalScrollIndicator={false}
                  snapToAlignment="center"
                  snapToInterval={itemHeight}
                  decelerationRate="normal"
                  onMomentumScrollEnd={handleMinuteChange}
                  contentContainerStyle={{
                    paddingTop: itemHeight * 1,
                    paddingBottom: itemHeight * 2,
                  }}>
                  {minutes.map(minute => (
                    <View
                      key={minute}
                      style={{
                        height: itemHeight,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: selectedMinute === minute ? 30 : 15,
                          color: selectedMinute === minute ? 'black' : 'grey',
                          fontWeight:
                            selectedMinute === minute ? 'bold' : 'normal',
                        }}>
                        {minute}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </S.MiddleClockBox>
            </S.MiddleClock>
          </S.FullClock>
        </S.HeaderMiddle>
        <S.HeaderBottom>
          <S.SaveButton onPress={handleSave}>
            <S.SaveButtonText>저장</S.SaveButtonText>
          </S.SaveButton>
        </S.HeaderBottom>
      </S.Header>

      <S.Body>
        {days.map((day, index) => (
          <S.DayButton
            key={day}
            selected={selectedDays[index]}
            onPress={() => handleDayPress(index)}>
            <S.DayText
              selected={selectedDays[index]}
              isWeekday={day !== '일' && day !== '토'} // '일'과 '토'가 아니면 isWeekday는 true
              style={{
                color:
                  day === '일'
                    ? '#EA5455'
                    : day === '토'
                    ? '#4564D4'
                    : selectedDays[index]
                    ? 'black'
                    : 'white',
              }}>
              {day}
            </S.DayText>
          </S.DayButton>
        ))}
      </S.Body>
    </S.Container>
  );
};

export default TimePicker;
