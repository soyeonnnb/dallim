import * as S from './Carousel.styles';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import NoFriendImage from '@/assets/images/NoFriend.png';
import CardPage from './CardPage';

interface CarouselProps {
  gap: number;
  offset: number;
  // competitorData: any[];
  pageWidth: number;
  onCardSelected?: (num: number) => void;
}

import {useRecoilValue} from 'recoil';
import {competitorDataState} from '@/recoil/RunningRecoil';

export default function Carousel({
  gap,
  offset,
  pageWidth,
  onCardSelected,
}: CarouselProps) {
  const competitorData = useRecoilValue(competitorDataState);

  useEffect(() => {
    // console.log('데이터가 넘어옴??:' + JSON.stringify(competitorData, null, 2));
  }, [competitorData]);

  const [page, setPage] = useState(0);

  // CardPage 컴포넌트를 렌더링
  const renderItem = ({item}: any) => {
    return (
      <S.CardContainer style={{width: pageWidth, marginHorizontal: gap / 2}}>
        <CardPage item={item} />
      </S.CardContainer>
    );
  };

  // 스크롤 위치에 따라 현재 페이지를 결정
  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
    if (onCardSelected) {
      onCardSelected(newPage);
    }
  };

  return (
    <S.Container>
      {competitorData.length > 0 ? (
        <>
          <FlatList
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={{
              paddingHorizontal: offset + gap / 2,
            }}
            data={competitorData}
            decelerationRate="fast"
            horizontal
            // keyExtractor={(item: any) => `page__${item.runnigMateId}`}
            keyExtractor={item => item.runningRecordId}
            onScroll={onScroll}
            pagingEnabled
            renderItem={renderItem}
            snapToInterval={pageWidth + gap}
            snapToAlignment="start"
            showsHorizontalScrollIndicator={false}
          />

          <S.Footer>
            <S.IndicatorWrapper>
              {Array.from({length: competitorData.length}, (_, i) => (
                <S.Indicator key={`indicator_${i}`} focused={i === page} />
              ))}
            </S.IndicatorWrapper>
          </S.Footer>
        </>
      ) : (
        <S.EmptyBox>
          <S.EmptyImage source={NoFriendImage} resizeMode="contain" />
          <S.EmptyText style={{marginRight: 10}}>
            등록된 런닝메이트가 없어요.
          </S.EmptyText>
        </S.EmptyBox>
      )}
    </S.Container>
  );
}
