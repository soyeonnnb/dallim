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

import Clock from '@/assets/images/Clock.png';

const screenHeight = Dimensions.get('window').height;
const itemHeight = screenHeight / 7;

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
  const days = ['월', '화', '수', '목', '금', '토', '일'];

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

  const handleSave = () => {
    const selectedDaysString = selectedDays
      .map((selected, index) => (selected ? days[index] : null))
      .filter(Boolean)
      .join(', ');

    console.log('저장된 요일:', selectedDaysString);
    console.log('저장된 시간:', selectedHour, selectedMinute);
  };

  console.log(selectedHour);
  console.log(selectedMinute);

  const handleHourChange = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    const newHour = hours[index];
    setSelectedHour(newHour);
  };

  const handleMinuteChange = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    const newMinute = minutes[index];
    setSelectedMinute(newMinute);
  };

  return (
    <S.Container>
      {/* <S.PickerContainer> */}
      <S.Header>
        <S.HeaderTop></S.HeaderTop>
        <S.HeaderMiddle>
          <S.FullClock>
            {/* <S.ClockImg source={Clock} resizeMode="contain"> */}
            <ScrollView
              ref={hourRef}
              showsVerticalScrollIndicator={false}
              snapToAlignment="center"
              snapToInterval={itemHeight}
              decelerationRate="fast"
              onMomentumScrollEnd={handleHourChange}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: itemHeight, // paddingTop 조정
                paddingBottom: itemHeight, // paddingBottom 조정
              }}
              style={{flex: 1, borderRightWidth: 0.5, borderColor: 'red'}}>
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
                      fontSize: selectedHour === hour ? 20 : 15,
                      color: selectedHour === hour ? 'black' : 'grey',
                    }}>
                    {hour}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <ScrollView
              ref={minuteRef}
              showsVerticalScrollIndicator={false}
              snapToAlignment="center"
              snapToInterval={itemHeight}
              decelerationRate="fast"
              onMomentumScrollEnd={handleMinuteChange}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: itemHeight, // paddingTop 조정
                paddingBottom: itemHeight, // paddingBottom 조정
              }}
              style={{flex: 1, borderWidth: 0.5, borderColor: '#ddd'}}>
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
                      fontSize: selectedMinute === minute ? 20 : 15,
                      color: selectedMinute === minute ? 'black' : 'grey',
                    }}>
                    {minute}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </S.FullClock>
        </S.HeaderMiddle>
        <S.HeaderBottom>
          <S.SaveButton onPress={handleSave}>
            <S.SaveButtonText>저장</S.SaveButtonText>
          </S.SaveButton>
        </S.HeaderBottom>
      </S.Header>
      {/* </S.PickerContainer> */}
      <S.DaysContainer>
        {days.map((day, index) => (
          <S.DayButton
            key={day}
            selected={selectedDays[index]}
            onPress={() => handleDayPress(index)}>
            <S.DayText>{day}</S.DayText>
          </S.DayButton>
        ))}
      </S.DaysContainer>
    </S.Container>
  );
};

export default TimePicker;
