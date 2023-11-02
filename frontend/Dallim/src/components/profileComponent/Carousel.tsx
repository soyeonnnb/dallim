import React, {useState} from 'react';
import {FlatList} from 'react-native';

import CardPage from './CardPage';
import * as S from './Carousel.styles';

import {characterData} from '@/recoil/CharacterData';

interface CarouselProps {
  gap: number;
  offset: number;
  pages: any[];
  pageWidth: number;
  onCardSelected?: (num: number) => void;
}

export default function Carousel({
  pages,
  pageWidth,
  gap,
  offset,
  onCardSelected,
}: CarouselProps) {
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
    if (onCardSelected) {
      onCardSelected(pages[newPage].num);
    }
  };

  const currentPageData = pages[page];
  // console.log(currentPageData);
  const selectedCharacter = characterData[currentPageData.characterIndex];
  // console.log(selectedCharacter);
  const selectedCharacterLevelData =
    selectedCharacter.levels[currentPageData.characterlevel];
  // console.log(selectedCharacterLevelData);
  return (
    <S.Container>
      <S.Header></S.Header>
      <S.Body>
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
      </S.Body>

      <S.Footer>
        <S.IndicatorWrapper>
          {Array.from({length: pages.length}, (_, i) => i).map(i => (
            <S.Indicator key={`indicator_${i}`} focused={i === page} />
          ))}
        </S.IndicatorWrapper>
      </S.Footer>
      <S.BodyBottomCharacterImageBox>
        <S.CharacterImage
          source={selectedCharacterLevelData.front}
          resizeMode="contain"
        />
      </S.BodyBottomCharacterImageBox>
    </S.Container>
  );
}