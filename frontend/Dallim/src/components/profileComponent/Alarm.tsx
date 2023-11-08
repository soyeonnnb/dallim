import * as S from './Alarm.styles';
import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SwipeListView} from 'react-native-swipe-list-view';
import Toast from 'react-native-toast-message';

//img---------------------------------------------------------------
import MorningAlarm from '@/assets/images/MorningAlarm.png';
import NightAlarm from '@/assets/images/NightAlarm.png';

//component-------------------------------------------------------------
// import AlarmDeleteModal from './profileModal/AlarmDeleteModal';

//api----------------------------------------------------------
import {deleteScheduleTwo, patchSchedule} from '@/apis/ProfileApi';

const windowWidth = Dimensions.get('window').width;

type AlarmProps = {
  alarmList: {
    day: string[];
    hour: number;
    minute: number;
    state: boolean;
    userId: number;
  }[];
  onRefresh: () => void;
};

type DayTranslations = {
  [key: string]: string;
};

const Alarm: React.FC<AlarmProps> = ({alarmList, onRefresh}) => {
  //state---------------------------------------------------------------
  // const [modalVisible, setModalVisible] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [toggles, setToggles] = useState<boolean[]>(
    alarmList.map(alarm => alarm.state),
  );

  //useEffect
  useEffect(() => {
    // alarmList에서 각 알람의 state를 사용하여 toggles 배열 초기화
    const initialToggles = alarmList.map(alarm => alarm.state);
    setToggles(initialToggles);
  }, [alarmList]);
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
    const newToggles = toggles.map((toggle, i) =>
      i === index ? !toggle : toggle,
    );

    // 알람 상태 업데이트
    setToggles(newToggles);

    // API 호출을 위한 알람 데이터 준비
    const alarm = alarmList[index];
    const updatedState = newToggles[index];
    console.log('가져온 알림 리스트' + alarm);

    console.log('토글상태변화' + updatedState);

    // API 호출하여 서버에 알람 상태 업데이트
    patchSchedule(alarm.day, alarm.hour, alarm.minute, updatedState)
      .then(response => {
        console.log('알람 상태 업데이트 성공:', response);
        onRefresh();
        // console.log(updatedState);
        // 필요한 경우 여기서 추가적인 상태 업데이트나 UI 반영을 할 수 있습니다.
      })
      .catch(error => {
        console.error('알람 상태 업데이트 실패:', error);
        // 에러 처리 로직, 사용자에게 피드백 제공 등을 여기서 수행합니다.
      });
  };

  const dayTranslations: DayTranslations = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일',
  };

  const translateDays = (days: string[]): string => {
    return days.map(day => dayTranslations[day] || day).join(', ');
  };

  return (
    <S.Container>
      <SwipeListView
        style={{width: '90%'}}
        data={alarmList}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item: alarm, index}) => (
          <S.CardImageWrapper key={index}>
            <S.Body>
              <S.CardBox
                source={getImageForTime(alarm.hour)}
                resizeMode="cover">
                <S.BodyContainer>
                  <S.BodyContainerBoX>
                    <S.ToggleContainer>
                      <TouchableOpacity onPress={() => toggleAlarm(index)}>
                        {alarm.state ? (
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
                        <S.DayText>{translateDays(alarm.day)}</S.DayText>
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
        )}
        renderHiddenItem={({item, index}) => <View></View>}
        rightOpenValue={-windowWidth}
        disableRightSwipe
        showsVerticalScrollIndicator={true}
        onRowOpen={(rowKey, rowMap, toValue) => {
          if (toValue === -windowWidth) {
            const rowData = rowMap[rowKey]?.props.item; // rowKey를 사용하여 rowMap에서 해당 데이터에 접근
            if (rowData) {
              deleteScheduleTwo(rowData.day, rowData.hour, rowData.minute)
                .then(() => {
                  Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: '알림삭제 성공!',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 10,
                  });

                  onRefresh();
                  if (rowMap[rowKey]) {
                    rowMap[rowKey].closeRow();
                  }
                })
                .catch(error => {
                  console.error('스케줄 삭제 실패', error);
                  // Handle the error, maybe show a toast message
                });
            }
          }
        }}
      />
    </S.Container>
  );
};

export default Alarm;
