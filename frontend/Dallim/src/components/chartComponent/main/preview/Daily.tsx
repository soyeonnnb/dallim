import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {View, Dimensions} from 'react-native';
import * as S from './Daily.styles';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {CalendarType} from '@/recoil/CalendarData';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {DailyRecord} from '../Preview';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.8;

interface Props {
  date?: CalendarType;
  isShow: boolean;
  records?: DailyRecord[];
}
function PreviewDaily({date, isShow, records}: Props) {
  const navigation = useNavigation();
  const [flatListKey, setFlatListKey] = useState(0);

  useEffect(() => {
    // records가 변경될 때마다 flatListKey를 업데이트하여 FlatList를 재랜더링합니다.
    setFlatListKey(flatListKey + 1);
  }, [records]);
  return (
    <S.Container isShow={isShow}>
      <S.Title>
        {date?.year}년 {date?.month}월 {date?.day}일
      </S.Title>
      <FlatList
        horizontal
        data={records}
        key={flatListKey} // 이걸 이용해서 records가 변경될 때마다 flat리스트가 재 랜더링되도록 함
        renderItem={({item}) => (
          <RunningCard item={item} navigation={navigation} />
        )}
        showsHorizontalScrollIndicator={false} // 가로 스크롤바 표시
        contentContainerStyle={{
          paddingHorizontal: screenWidth / 12,
        }} // 왼쪽과 오른쪽에 여백 추가
        initialScrollIndex={0}
      />
    </S.Container>
  );
}

function RunningCard({item, navigation}: {item: DailyRecord; navigation: any}) {
  return (
    <S.Card
      style={{width: cardWidth}}
      onPress={() => navigation.navigate('ChartDetail', {id: item.id})}>
      <S.CardTitle>{item.location}</S.CardTitle>
      <S.CardDatas>
        <S.CardData>{item.distance}m</S.CardData>
        <S.CardData>
          {item.hour}시 {item.minute}분
        </S.CardData>
        <S.CardData>{item.time}분</S.CardData>
      </S.CardDatas>
    </S.Card>
  );
}

export default PreviewDaily;
