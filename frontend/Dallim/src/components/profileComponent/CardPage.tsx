import {ViewStyle, Text} from 'react-native';
import * as S from './CardPage.styles';

interface ICardPage {
  item: {
    num: number;
    cardImage: any;
    date?: string;
    level?: number;
    nickname?: string;
    distance?: string;
    minutes?: number;
    speed?: string;
  };
  style: ViewStyle;
}

export default function CardPage({item, style}: ICardPage) {
  console.log(item.level);
  console.log(item.nickname);
  return (
    <S.PageItem style={style}>
      {item.date && <Text>{item.date}</Text>}
      {item.level && <Text>레벨: {item.level}</Text>}
      {item.nickname && <Text>{item.nickname}</Text>}
      {item.distance && <Text>{item.distance}</Text>}
      {item.minutes && <Text>{item.minutes}분</Text>}
      {item.speed && <Text>{item.speed}</Text>}
      <S.StyledImage source={item.cardImage} resizeMode="contain" />
    </S.PageItem>
  );
}
