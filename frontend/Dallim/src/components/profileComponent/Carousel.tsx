import React, {useState} from 'react';
import {FlatList} from 'react-native';

import CardPage from './CardPage';
import * as S from './Carousel.styles';

interface ICarousel {
  gap: number;
  offset: number;
  pages: any[];
  pageWidth: number;
}

export default function Carousel({pages, pageWidth, gap, offset}: ICarousel) {
  const [page, setPage] = useState(0);

  function renderItem({item}: any) {
    return (
      <S.CardContainer>
        <CardPage
          item={item}
          style={{width: pageWidth, marginHorizontal: gap / 2}}
        />
      </S.CardContainer>
    );
  }

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };

  return (
    <S.Container>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item.num}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <S.IndicatorWrapper>
        {Array.from({length: pages.length}, (_, i) => i).map(i => (
          <S.Indicator key={`indicator_${i}`} focused={i === page} />
        ))}
      </S.IndicatorWrapper>
    </S.Container>
  );
}
