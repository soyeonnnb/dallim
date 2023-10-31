import React from 'react';
import styled from 'styled-components/native';
import {ViewStyle, Image} from 'react-native';

interface ICardPage {
  item: {num: number; cardImage: any};
  style: ViewStyle;
}

const PageItem = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

export default function CardPage({item, style}: ICardPage) {
  return (
    <PageItem style={style}>
      <Image
        source={item.cardImage}
        resizeMode="contain"
        style={{width: '100%', height: '100%'}}
      />
    </PageItem>
  );
}
