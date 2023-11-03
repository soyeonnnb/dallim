import {ViewStyle, Text} from 'react-native';
import * as S from './CardPage.styles';
import {planetData} from '@/recoil/PlanetData';
import {characterData} from '@/recoil/CharacterData';

interface ICardPage {
  item: {
    num: number;
    planetIndex: number;
    characterIndex: number;
    characterlevel: number;
    date: string;
    level: number;
    nickname: string;
    distance: string;
    minutes: number;
    speed: string;
  };
  style: ViewStyle;
}

export default function CardPage({item, style}: ICardPage) {
  const selectedCharacter = characterData[item.characterIndex];
  const selectedCharacterLevelData =
    selectedCharacter.evolutions[item.characterlevel];

  // console.log(item.num);

  return (
    <S.PageItem style={style}>
      <S.ImageWrapper>
        <S.StyledImage
          source={planetData[item.planetIndex].Cardtwo}
          resizeMode="cover">
          <S.Header>
            <S.DateText>{item.date}</S.DateText>
            <S.LevelText>level. {item.level}</S.LevelText>
          </S.Header>
          <S.Body>
            <S.NicknameText>{item.nickname}</S.NicknameText>
          </S.Body>
          <S.Bottom>
            <S.TopBox>
              <S.DistanceText>{item.distance}</S.DistanceText>
            </S.TopBox>
            <S.MiddleBox>
              <S.MinutesText>{item.minutes}분</S.MinutesText>
            </S.MiddleBox>
            <S.BottomBox>
              <S.SpeedText>{item.speed}</S.SpeedText>
            </S.BottomBox>
          </S.Bottom>
          {/* <S.CharacterImage
          source={selectedCharacterLevelData.front}
          resizeMode="contain"></S.CharacterImage> */}
        </S.StyledImage>
      </S.ImageWrapper>
    </S.PageItem>
  );
}
