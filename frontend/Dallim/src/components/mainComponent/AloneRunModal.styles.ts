import styled from 'styled-components/native';
import {ImageBackground, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BackgroundImage = styled(ImageBackground)`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 10%;
  flex-direction: row;
`;

export const CloseButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: red; */
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const CloseImage = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 35%;
  height: 35%;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
  height: 60%;
`;

export const Bottom = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 30%;
`;

export const ThemeBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  width: 100%;
  bottom: -30%;
  position: absolute;
`;

export const StyledImage = styled(Image)`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
`;

export const CharacterBox = styled.View`
  border-width: 1px;
  border-color: green;
  justify-content: flex-end;
  width: 100%;
  height: 50%;
  position: absolute;
`;

export const StyledGif = styled(FastImage)`
  border-width: 1px;
  border-color: blue;
  width: 100%;
  height: 40%;
  bottom: -20%;
`;
