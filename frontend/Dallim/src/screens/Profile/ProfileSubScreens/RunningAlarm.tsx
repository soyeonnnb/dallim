import * as S from './RunningAlarm.styles';
import React, {useState, useEffect} from 'react';

//icon
import BackButtonIcon from '@/assets/icons/ArrowLeft';

//component
import TimePicker from '@/components/profileComponent/TimePicker';
import Alarm from '@/components/profileComponent/Alarm';

interface RunningAlarmProps {
  navigation: any;
}

function RunningAlarm({navigation}: RunningAlarmProps) {
  // state--------------------
  const [showTimePicker, setShowTimePicker] = useState(false);

  //useEffect
  useEffect(() => {
    setShowTimePicker(true);
    // 만약 페이지를 벗어날 때 TimePicker를 숨기고 싶다면 여기서 cleanup 함수를 반환합니다.
    return () => setShowTimePicker(false);
  }, []);

  //dummydata
  const dummy = [
    {
      day: ['월'],
      hour: 1,
      minute: 30,
    },
    {
      day: ['월', '화'],
      hour: 13,
      minute: 30,
    },
    {
      day: ['월', '화', '수', '목', '금', '토', '일'],
      hour: 14,
      minute: 30,
    },
    {
      day: ['월', '화', '수', '목', '금', '토', '일'],
      hour: 14,
      minute: 30,
    },
    {
      day: ['월', '화', '수', '목', '금', '토', '일'],
      hour: 14,
      minute: 30,
    },
    {
      day: ['월', '화', '수', '목', '금', '토', '일'],
      hour: 14,
      minute: 30,
    },
    {
      day: ['월', '화', '수', '목', '금', '토', '일'],
      hour: 14,
      minute: 30,
    },
    {
      day: ['월', '화', '수', '목', '금', '토', '일'],
      hour: 14,
      minute: 30,
    },
    {
      day: ['월', '화', '수', '목', '금', '토', '일'],
      hour: 14,
      minute: 30,
    },
    {
      day: ['월', '화', '수', '목', '금', '토', '일'],
      hour: 14,
      minute: 30,
    },
  ];

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
        <S.Body>{showTimePicker && <TimePicker />}</S.Body>
        <S.Footer>
          <Alarm alarmList={dummy} />
        </S.Footer>

        <S.TabBox />
      </S.BackgroundImage>
    </S.Container>
  );
}

export default RunningAlarm;
