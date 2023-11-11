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
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  width: 90%;
  height: 10%;
`;

export const HeaderLeft = styled.View`
  /* border-width: 1px;
  border-color: yellow; */
  width: 40%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const HeaderRight = styled.View`
  /* border-width: 1px;
  border-color: green; */
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
  /* border-width: 1px;
  border-color: red; */
  justify-content: space-between;
  flex-direction: row;
  width: 90%;
  height: 10%;
  flex-direction: row;
`;

export const GuideBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
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
  border-color: blue; */
  width: 40px;
  height: 40px;
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
  width: 100%;
  height: 100%;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45%;
`;

export const ThemeBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 60%;
  height: 60%;
  margin-top: 10%;
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const StyledGif = styled(FastImage)`
  /* border-width: 1px;
  border-color: red; */
  width: 80%;
  height: 80%;
  top: -65%;
  left: 10%;
  position: absolute;
`;

export const Footer = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 20%;
`;

export const FooterBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 30%;
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

export const StartBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
`;

export const StartButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 20px;
  background-color: #2a2c45;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
`;

export const StartText = styled.Text`
  font-size: 20px;
  color: white;
`;

export const TabBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 15%;
`;
