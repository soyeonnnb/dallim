import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const RoomBox = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const RoomImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ThemeButton = styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: blue;
  position: absolute;
  top: 65%;
  left: 80%;
`;

export const ThemeIcon = styled.Image`
  width: 100%;
  height: 100%;
`;
