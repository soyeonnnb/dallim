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

export const Top = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  width: 100%;
  height: 25%;
`;

export const Middle = styled.View`
  border-width: 1px;
  border-color: blue;
  flex-direction: row;
  width: 100%;
  height: 65%;
`;

export const Bottom = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  width: 100%;
  height: 10%;
`;
