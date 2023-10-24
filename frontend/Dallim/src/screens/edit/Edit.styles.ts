import styled from 'styled-components/native';
import {Image} from 'react-native';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {Animated} from 'react-native';

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

export const TopMiddle = styled.View`
  border-width: 1px;
  border-color: red;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  height: 100%;
`;

export const ToggleButtonWrapper = styled(TouchableOpacity)`
  border-width: 1px;
  border-radius: 100px;
  border-color: transparent;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px;
  width: 120px;
  height: 50px;
  margin-left: 20px;
  overflow: hidden;
`;

export const ToggleButton = styled(Animated.View)<{isOn?: boolean}>`
  width: 60px;
  height: 40px;
  border-radius: 100px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export const ToggleImage = styled(Image)`
  width: 30px;
  height: 30px;
`;

export const TopSide = styled.View`
  border-width: 1px;
  border-color: blue;
  flex-direction: row;
  width: 30%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
`;

export const PointText = styled.Text`
  font-size: 20px;
  color: white;
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
  width: 20%;
  height: 100%;
`;

export const BodyCenter = styled.View`
  border-width: 1px;
  border-color: red;
  width: 60%;
  height: 100%;
`;

export const BodyRight = styled.View`
  border-width: 1px;
  border-color: red;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
`;

export const TabBox = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 10%;
`;
