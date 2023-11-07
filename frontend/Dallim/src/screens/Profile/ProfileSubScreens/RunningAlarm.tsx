import * as S from './RunningAlarm.styles';
import React, {useState, useEffect} from 'react';

//icon
import BackButtonIcon from '@/assets/icons/ArrowLeft';

//component
import TimePicker from '@/components/profileComponent/TimePicker';
import Alarm from '@/components/profileComponent/Alarm';

//apis
import {fetchScheduleList} from '@/apis/ProfileApi';

interface RunningAlarmProps {
  navigation: any;
}

function RunningAlarm({navigation}: RunningAlarmProps) {
  // state--------------------
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [scheduleList, setScheduleList] = useState([]);
  const [refreshKey, setRefreshKey] = useState(false);
  //
  //useEffect
  useEffect(() => {
    setShowTimePicker(true);
    return () => setShowTimePicker(false);
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await fetchScheduleList(); // API 호출
        setScheduleList(data); // 상태 업데이트
      } catch (error) {
        console.error('스케줄 리스트를 가져오는데 실패', error);
      }
    };

    fetchSchedule(); // 정의한 비동기 함수 호출
  }, [refreshKey]);

  //action

  const refreshScheduleList = () => {
    setRefreshKey(prev => !prev);
  };

  return (
    <S.Container>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover">
        <S.Header>
          <S.BackButtonFlexBoxLeft
            onPress={() => navigation.navigate('Profile')}>
            <BackButtonIcon width={30} height={30} color="white" />
          </S.BackButtonFlexBoxLeft>
          <S.BackButtonFlexBoxRight>
            <S.TitleText>운동 알림 설정</S.TitleText>
          </S.BackButtonFlexBoxRight>
          <S.BackButtonFlexBoxLeft></S.BackButtonFlexBoxLeft>
        </S.Header>
        <S.Body>
          {showTimePicker && <TimePicker onRefresh={refreshScheduleList} />}
        </S.Body>
        <S.Footer>
          <Alarm alarmList={scheduleList} onRefresh={refreshScheduleList} />
        </S.Footer>

        <S.TabBox />
      </S.BackgroundImage>
    </S.Container>
  );
}

export default RunningAlarm;
