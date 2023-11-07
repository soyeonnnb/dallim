import * as S from './Alarm.styles';
import React, {useState} from 'react';
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
import {deleteScheduleTwo} from '@/apis/ProfileApi';

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
  //action---------------------------------------------------------------
  const getImageForTime = (hour: number) => {
    return hour >= 6 && hour < 18 ? MorningAlarm : NightAlarm;
  };

  const formatHourAndMinute = (hour: number, minute: number) => {
    const formattedHour = hour === 0 || hour === 12 ? 12 : hour % 12;
    const formattedMinute = String(minute).padStart(2, '0');
    // console.log('몇분인데' + formattedMinute);
    return `${formattedHour}  :  ${formattedMinute}`;
  };

  const getAmPm = (hour: number) => {
    return hour >= 12 ? 'PM' : 'AM';
  };

  const toggleAlarm = (index: number) => {
    setToggles(prevToggles => {
      const newToggles = [...prevToggles];
      newToggles[index] = !newToggles[index];
      console.log('토글값' + newToggles);
      return newToggles;
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
                        {toggles[index] ? (
                          <S.BodyTopToggleButton>
                            <S.Circle></S.Circle>
                          </S.BodyTopToggleButton>
                        ) : (
                          <S.BodyTopToggleFalseButton>
                            <S.Circle></S.Circle>
                          </S.BodyTopToggleFalseButton>
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
                })
                .catch(error => {
                  console.error('스케줄 삭제 실패', error);
                  // Handle the error, maybe show a toast message
                });
            }

            // console.log(rowData?.day);
            // console.log(rowData?.hour);
            // console.log(rowData?.minute);

            // console.log(`삭제된 알람의 요일: ${rowData.day}`);
            // console.log(`삭제된 알람의 시간: ${rowData.hour}:${rowData.minute}`);
            // Toast.show({
            //   type: 'success',
            //   position: 'top',
            //   text1: '알람이 삭제되었습니다 !',
            //   visibilityTime: 3000,
            //   autoHide: true,
            //   topOffset: 10,
            // });
          }
        }}
      />
    </S.Container>
  );
};

export default Alarm;
