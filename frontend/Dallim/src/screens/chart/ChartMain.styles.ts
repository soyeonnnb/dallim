import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';
import be from 'date-fns/locale/be/index.js';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: green;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: -1;
  position: absolute;
`;
