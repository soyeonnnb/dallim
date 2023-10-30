import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import * as S from './PreviewDaily.styles';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {CalendarType} from '@/components/common/CalendarData';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';

interface Props {
  date?: CalendarType;
  isShow: boolean;
}
interface DailyRecord {
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
        location: '서울 석촌호수1',
        distance: 1,
        hour: 1,
        minute: 1,
        time: 1,
      },
      {
        location: '서울 석촌호수2',
        distance: 2,
        hour: 2,
        minute: 2,
        time: 2,
      },
      {
        location: '서울 석촌호수3',
        distance: 3,
        hour: 3,
        minute: 3,
        time: 3,
      },
      {
        location: '서울 석촌호수4',
        distance: 4,
        hour: 4,
        minute: 4,
        time: 4,
      },
      {
        location: '서울 석촌호수5',
        distance: 5,
        hour: 5,
        minute: 5,
        time: 5,
      },
      {
        location: '서울 석촌호수6',
        distance: 6,
        hour: 6,
        minute: 6,
        time: 6,
      },
      {
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
      <ScrollView
        showsHorizontalScrollIndicator
        horizontal={true}
        pagingEnabled
        centerContent={true}
        style={{backgroundColor: 'red'}}>
        {runningDatas.map((data, index) => {
          return <RunningCard data={data} key={index} />;
        })}
      </ScrollView>
    </S.Container>
  );
}

interface CardProps {
  data: DailyRecord;
}

// function RunningCard({data}: CardProps) {
function RunningCard(data: any) {
  console.log(data);
  return (
    <S.Card>
      <S.CardTitle>{data.location}</S.CardTitle>
      <S.CardDatas>
        <S.CardData>{data.distance}km</S.CardData>
        <S.CardData>
          {data.hour}시 {data.minute}분
        </S.CardData>
        <S.CardData>{data.time}분</S.CardData>
      </S.CardDatas>
    </S.Card>
  );
}

export default PreviewDaily;
