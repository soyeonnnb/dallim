import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
`;

export const BackButtonFlexBoxLeft = styled.TouchableOpacity`
  width: 10%;
  align-items: center;
`;

export const BackButtonIcon = styled.Image`
  width: 100%;
  height: 100%;
`;

export const BackButtonFlexBoxRight = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
`;

export const TitleText = styled.Text`
  font-size: 25px;
  color: white;
`;

export const Body = styled.View`
  border-width: 1px;
  border-color: red;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40%;
`;

export const Footer = styled.View`
  border-width: 1px;
  border-color: green;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
`;

export const TabBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 10%;
`;
