import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {View, Dimensions} from 'react-native';
import * as S from './Daily.styles';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {CalendarType} from '@/components/common/CalendarData';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.8;

interface Props {
  date?: CalendarType;
  isShow: boolean;
}

interface DailyRecord {
  id: number;
  location: string; // 출발 위치
  distance: number; // 거리
  hour: number; // 출발 기준 시
  minute: number; // 출발 기준 분
  time: number; // 얼마나 걸렸는지 (시간)
}

function PreviewDaily({date, isShow}: Props) {
  const [runningDatas, setRunningDatas] = useState<DailyRecord[]>([]);
  useEffect(() => {
    setRunningDatas([
      {
        id: 1,
        location: '서울 석촌호수1',
        distance: 1,
        hour: 1,
        minute: 1,
        time: 1,
      },
      {
        id: 2,
        location: '서울 석촌호수2',
        distance: 2,
        hour: 2,
        minute: 2,
        time: 2,
      },
      {
        id: 3,
        location: '서울 석촌호수3',
        distance: 3,
        hour: 3,
        minute: 3,
        time: 3,
      },
      {
        id: 4,
        location: '서울 석촌호수4',
        distance: 4,
        hour: 4,
        minute: 4,
        time: 4,
      },
      {
        id: 5,
        location: '서울 석촌호수5',
        distance: 5,
        hour: 5,
        minute: 5,
        time: 5,
      },
      {
        id: 6,
        location: '서울 석촌호수6',
        distance: 6,
        hour: 6,
        minute: 6,
        time: 6,
      },
      {
        id: 7,
        location: '서울 석촌호수7',
        distance: 7,
        hour: 7,
        minute: 7,
        time: 7,
      },
    ]);
  }, [date]);
  return (
    <S.Container isShow={isShow}>
      <S.Title>
        {date?.year}년 {date?.month}월 {date?.day}일
      </S.Title>
      <FlatList
        horizontal
        data={runningDatas}
        keyExtractor={item => item.id.toString()}
        renderItem={RunningCard}
        showsHorizontalScrollIndicator={false} // 가로 스크롤바 표시
        contentContainerStyle={{
          paddingHorizontal: screenWidth / 12,
        }} // 왼쪽과 오른쪽에 여백 추가
      />
    </S.Container>
  );
}

function RunningCard({item}: {item: DailyRecord}) {
  return (
    <S.Card style={{width: cardWidth}}>
      <S.CardTitle>{item.location}</S.CardTitle>
      <S.CardDatas>
        <S.CardData>{item.distance}km</S.CardData>
        <S.CardData>
          {item.hour}시 {item.minute}분
        </S.CardData>
        <S.CardData>{item.time}분</S.CardData>
      </S.CardDatas>
    </S.Card>
  );
}

export default PreviewDaily;
