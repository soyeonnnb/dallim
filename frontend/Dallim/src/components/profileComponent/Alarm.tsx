import * as S from './Alarm.styles';
import React, {useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//img---------------------------------------------------------------
import MorningAlarm from '@/assets/images/MorningAlarm.png';
import NightAlarm from '@/assets/images/NightAlarm.png';

type AlarmProps = {
  alarmList: {
    day: string[];
    hour: number;
    minute: number;
  }[];
};

const Alarm: React.FC<AlarmProps> = ({alarmList}) => {
  //state---------------------------------------------------------------
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [toggles, setToggles] = useState<boolean[]>(alarmList.map(() => false));
  //action---------------------------------------------------------------
  const getImageForTime = (hour: number) => {
    return hour >= 6 && hour < 18 ? MorningAlarm : NightAlarm;
  };

  const formatHourAndMinute = (hour: number, minute: number) => {
    const formattedHour = hour === 0 || hour === 12 ? 12 : hour % 12;
    const formattedMinute = String(minute).padStart(2, '0');
    return `${formattedHour}  :  ${formattedMinute}`;
  };

  const getAmPm = (hour: number) => {
    return hour >= 12 ? 'PM' : 'AM';
  };

  const toggleAlarm = (index: number) => {
    setToggles(prevToggles => {
      const newToggles = [...prevToggles];
      newToggles[index] = !newToggles[index];
      return newToggles;
    });
  };

  return (
    <S.Container>
      <ScrollView style={{width: '90%'}}>
        {alarmList.map((alarm, index) => (
          <S.CardImageWrapper key={index}>
            <S.Body>
              <S.CardBox
                source={getImageForTime(alarm.hour)}
                resizeMode="cover">
                <S.BodyContainer>
                  <S.BodyContainerBoX>
                    <S.ToggleContainer>
                      <TouchableOpacity onPress={() => toggleAlarm(index)}>
                        {toggles[index] ? (
                          <S.BodyTopToggleFalseButton>
                            <S.Circle></S.Circle>
                          </S.BodyTopToggleFalseButton>
                        ) : (
                          <S.BodyTopToggleButton>
                            <S.Circle></S.Circle>
                          </S.BodyTopToggleButton>
                        )}
                      </TouchableOpacity>
                    </S.ToggleContainer>
                    <S.DayContainer>
                      <S.DayBox>
                        <S.DayText>{alarm.day.join(', ')}</S.DayText>
                      </S.DayBox>
                      <S.TimeBox>
                        <S.TopTimeText>
                          <S.MiddleTimeTextBox>
                            <S.TimeText>
                              {formatHourAndMinute(alarm.hour, alarm.minute)}
                            </S.TimeText>
                          </S.MiddleTimeTextBox>
                          <S.BottomTimeTextBox>
                            <S.TimeText>{getAmPm(alarm.hour)}</S.TimeText>
                          </S.BottomTimeTextBox>
                        </S.TopTimeText>
                      </S.TimeBox>
                    </S.DayContainer>
                  </S.BodyContainerBoX>
                </S.BodyContainer>
              </S.CardBox>
            </S.Body>
          </S.CardImageWrapper>
        ))}
      </ScrollView>
    </S.Container>
  );
};

export default Alarm;
