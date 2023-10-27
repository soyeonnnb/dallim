import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const Header = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15%;
`;

export const Body = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  width: 100%;
  height: 75%;
`;

export const Footer = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  width: 100%;
  height: 10%;
`;

export const TabBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 10%;
`;