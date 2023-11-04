import styled from 'styled-components/native';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {Animated} from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const BackgroundImage = styled(ImageBackground)`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
`;

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: space-between;
`;

export const Body = styled.View`
  flex-direction: row;
  width: 100%;
  height: 30%;
`;

export const Footer = styled.View`
  width: 100%;
  height: 50%;
`;

export const TabBox = styled.View`
  width: 100%;
  height: 10%;
`;

export const LoadingBox = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const AnimatedFooterText = styled(Animated.Text)`
  font-size: 25px;
  color: white;
`;
