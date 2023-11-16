import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';

export const Container = styled.View`
  flex: 1;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  width: 90%;
  height: 10%;
`;

export const HeaderLeft = styled.View`
  /* border-width: 1px;
  border-color: yellow; */
  width: 50%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const LevelImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const LevelBox = styled.View`
  /* border-width: 1px;
  border-color: white; */
  width: 100%;
  height: 100%;
`;

export const LevelText = styled.Text`
  /* border-width: 1px;
  border-color: green; */
  color: white;
  top: 64%;
  left: 9%;
  position: absolute;
`;

export const NicknameText = styled.Text`
  /* border-width: 1px;
  border-color: red; */
  font-size: 15px;
  width: 50%;
  color: white;
  font-weight: bold;
  top: 35%;
  right: 7%;
  position: absolute;
  text-align: center;
`;

export const ExpBarContainer = styled.View`
  /* border-width: 1px;
  border-color: red; */
  border-radius: 10px;
  background-color: white;
  width: 50%;
  height: 10%;
  color: white;
  bottom: 5%;
  right: 5%;

  position: absolute;
`;

interface ExpBarProps extends ViewProps {
  expPercent: number;
  levelIndex: number;
}
const getExpBarColor = (levelIndex: number): string => {
  switch (levelIndex) {
    case 0:
      return '#835343';
    case 1:
      return '#96ADD2';
    case 2:
      return '#ED9F48';
    case 3:
      return '#7AEDEE';
    case 4:
      return '#BBD9FF';
    default:
      return 'blue'; // 기본 색상
  }
};
export const ExpBar = styled.View<ExpBarProps>`
  width: ${props => props.expPercent}%;
  height: 100%;
  background-color: ${props => getExpBarColor(props.levelIndex)};
  border-radius: 10px;
`;

export const HeaderRight = styled.View`
  /* border-width: 1px;
  border-color: green; */
  flex-direction: row;
  width: 50%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const PointBox = styled.View`
  /* border-width: 1px;
  border-color: white; */
  width: 120px;
  justify-content: center;
  align-items: center;
`;

export const PointImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const PointText = styled.Text`
  /* border-width: 1px;
  border-color: white; */
  font-size: 12px;
  font-weight: bold;
  width: 50%;
  color: white;
  top: 40%;
  right: 5%;
  position: absolute;
  text-align: center;
`;

export const ButtonBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 10%;
`;

export const GuideBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  width: 50%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

export const StampBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
`;

export const Box = styled.View`
  /* border-width: 1px;
  border-color: white; */
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const ImageStyle = styled.Image`
  width: 100%;
  height: 100%;
`;

export const PrivacyImg = styled.Image`
  width: 100%;
  height: 100%;
`;
export const ButtonStyle = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: red; */
  width: 80%;
  height: 80%;
  justify-content: center;
  align-items: center;
  padding-bottom: 5%;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 70%;
`;

export const StartBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  margin-bottom: 15%;
`;

export const StartButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: white; */
  background-color: transparent;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
`;

export const ThemeBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 60%;
  height: 60%;
  position: absolute;
`;

/* export const PlanetGif = styled(Image)` */
export const PlanetGif = styled(FastImage)`
  /* border-width: 1px;
  border-color: red; */
  width: 120%;
  height: 120%;
  bottom: -55%;
  position: absolute;
`;

export const CharacterGif = styled(FastImage)`
  /* border-width: 1px;
  border-color: red; */
  width: 50%;
  height: 50%;
  bottom: 30%;
  position: absolute;
`;

export const StartText = styled.Text`
  font-size: 20px;
  z-index: 10;
  color: white;
  text-align: center;
  position: absolute;
`;
