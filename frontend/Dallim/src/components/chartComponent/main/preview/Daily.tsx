import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import * as S from './Daily.styles';
import { FlatList } from 'react-native-gesture-handler';
import { CalendarType } from '@/recoil/data/CalendarData';
import { DailyRecord } from '@/apis/ChartApi';
import { useNavigation } from '@react-navigation/native';
import { meterToKMOrMeter, secondToMinuteText } from '@/recoil/data/RunningData';
import ClearIcon from '@/assets/icons/ClearIcon.png';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.8;

interface Props {
  date?: CalendarType;
  isShow: boolean;
  records?: DailyRecord[];
}

function PreviewDaily({ date, isShow, records }: Props) {
  const navigation = useNavigation();
  const [flatListKey, setFlatListKey] = useState(0);

  useEffect(() => {
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
        renderItem={({ item }) => (
          <RunningCard item={item} navigation={navigation} isAlone={true} />
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

function RunningCard({
  item,
  navigation,
}: {
  item: DailyRecord;
  navigation: any;
  isAlone: boolean;
}) {

  console.log("item : " + JSON.stringify(item));

  return (
    <S.Card
      width={cardWidth}
      onPress={() => navigation.push('ChartDetail', { id: item.id })}>
      <S.CardImage
        source={
          item.type === 'PAIR'
            ? require('@/assets/images/RunTogetherPanel.png') // 함께 달리기일 시
            : require('@/assets/images/RunAlonePanel.png') // 혼자 달리기일 시
        }
        resizeMode="cover"
      />
      <S.CardTexts>
        {item.type === 'PAIR' && (
          <S.CardTitle>{item.winOrLose}</S.CardTitle>
        )}
        <S.CardTitle>{item.location}</S.CardTitle>
        <S.CardDatas>
          <S.CardData>{meterToKMOrMeter(item.distance)}</S.CardData>
          <S.CardData>|</S.CardData>
          <S.CardData>
            {item.hour}시 {item.minute}분 시작
          </S.CardData>
          <S.CardData>|</S.CardData>
          <S.CardData>{secondToMinuteText(item.time)}</S.CardData>
        </S.CardDatas>
      </S.CardTexts>
      <S.ClearBox>
        {item.winOrLose == 'WIN' && <S.ClearImage source={ClearIcon} resizeMode="contain" />}
      </S.ClearBox>
    </S.Card>
  );
}

export default PreviewDaily;
