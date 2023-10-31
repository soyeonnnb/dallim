import styled from 'styled-components/native';
import {ImageBackground, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Animated} from 'react-native';

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

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 60%;
`;

export const ThemeBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 60%;
  margin-top: 10%;
`;

export const StyledGif = styled(FastImage)`
  /* border-width: 1px;
  border-color: blue; */
  width: 150%;
  height: 100%;
`;

export const Footer = styled.View`
  /* border-width: 1px;
  border-color: red; */
  align-items: center;
  width: 100%;
  height: 30%;
`;

export const FooterBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  flex-direction: row;
  width: 70%;
  height: 50%;
`;

export const AnimatedFooterText = styled(Animated.Text)`
  font-size: 25px;
  color: white;
`;

export const TabBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 10%;
`;
