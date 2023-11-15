import styled from 'styled-components/native';
import {ImageBackground, Image} from 'react-native';
import {Animated} from 'react-native';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

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
  border-width: 1px;
  border-color: blue;
  flex-direction: row;
  width: 90%;
  height: 10%;
`;

export const HeaderLeft = styled.View`
  border-width: 1px;
  border-color: yellow;
  width: 40%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
`;

export const HeaderRight = styled.View`
  border-width: 1px;
  border-color: green;
  flex-direction: row;
  width: 60%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const PointText = styled.Text`
  font-size: 20px;
  color: white;
`;

export const ButtonBox = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 10%;
`;

export const GuideBox = styled.View`
  border-width: 1px;
  border-color: red;
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
  border-width: 1px;
  border-color: white;
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
  padding-left: 10%;
`;

export const Body = styled.View`
  border-width: 1px;
  border-color: red;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 70%;
`;

export const NicknameBox = styled.View`
  border-width: 1px;
  border-color: blue;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 20%;
  margin-bottom: 30%;
`;

export const StartBox = styled.View`
  border-width: 1px;
  border-color: blue;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
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
  border-width: 1px;
  border-color: red;
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
  bottom: -50%;
  position: absolute;
`;

export const CharacterGif = styled(FastImage)`
  border-width: 1px;
  border-color: red;
  width: 50%;
  height: 50%;
  bottom: 30%;
  position: absolute;
`;

export const LevelText = styled.Text`
  font-size: 20px;
  color: white;
  margin-right: 3%;
`;

export const NicknameText = styled.Text`
  font-size: 20px;
  color: white;
`;

export const StartText = styled.Text`
  font-size: 20px;
  z-index: 10;
  color: white;
  text-align: center;
  position: absolute;
`;
