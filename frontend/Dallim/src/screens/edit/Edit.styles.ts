import styled from 'styled-components/native';
import {Image} from 'react-native';
import {ImageBackground, TouchableOpacity} from 'react-native';

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
  height: 15%;
`;

export const Body = styled.View`
  border-width: 1px;
  border-color: blue;
  flex-direction: row;
  width: 100%;
  height: 75%;
`;

export const RotationBox = styled(TouchableOpacity)`
  border-width: 1px;
  border-color: red;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 10%;
`;

export const DirectionIcon = styled(Image)`
  width: 20px;
  height: 30px;
`;

export const BodyLeft = styled.View`
  border-width: 1px;
  border-color: red;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 100%;
`;

export const BodyCenter = styled.View`
  border-width: 1px;
  border-color: red;
  width: 70%;
  height: 100%;
`;

export const BodyRight = styled.View`
  border-width: 1px;
  border-color: red;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 100%;
`;

export const TabBox = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 10%;
`;