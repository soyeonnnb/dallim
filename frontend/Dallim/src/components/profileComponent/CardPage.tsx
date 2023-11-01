import {ViewStyle} from 'react-native';
import * as S from './CardPage.styles';

interface ICardPage {
  item: {num: number; cardImage: any};
  style: ViewStyle;
}

export default function CardPage({item, style}: ICardPage) {
  return (
    <S.PageItem style={style}>
      <S.StyledImage source={item.cardImage} resizeMode="contain" />
    </S.PageItem>
  );
}
