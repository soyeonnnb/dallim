import styled from 'styled-components/native';
import {Image, TouchableOpacity} from 'react-native';
import {colors} from '../common/globalStyles';
import {Shadow} from 'react-native-shadow-2';

export const Container = styled.View`
  flex: 1;
  /* border-width: 1px;
  border-color: red; */
  /* padding: 5px; */
`;

export const BoxShadow = styled(Shadow)`
  /* border-width: 1px;
  border-color: red; */
  /* width: 100%; */
  /* margin: px; */
  justify-content: center;
  align-items: center;
  /* color: black; */
  /* width: 10px; */
  /* height: 100%; */
  border-radius: 30px;
  /* margin-bottom: 20px; */
`;

export const Box = styled.View`
  border-width: 1px;
  border-color: ${colors.buttonColor.firstDepth};
  width: 100%;
  height: 100%;
  background-color: ${colors.buttonColor.firstDepth};
  border-radius: 18px;
  padding: 10px;
`;

export const Top = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  width: 100%;
  height: 33.3%;
`;

export const TopLeft = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const IconImage = styled(Image)`
  width: 20px;
  height: 20px;
`;

export const TopRight = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const Middle = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  width: 100%;
  height: 33.3%;
`;

export const MiddleLeft = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const MiddleRight = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const Bottom = styled.View`
  /* border-width: 1px;
  border-color: green; */
  flex-direction: row;
  width: 100%;
  height: 33.3%;
`;

export const BottomLeft = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const BottomRight = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  width: 50%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const AddBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 50%;
  height: 90%;
`;

export const AddButton = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
`;

export const AddText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

export const AddButton_two = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${colors.button.depth2.color};
  border-radius: 15px;
`;

export const AddText_two = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

export const Icon = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 30%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const Circle = styled.View`
  border-width: 1px;
  border-radius: 100px;
  border-color: white;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 10px;
  font-weight: normal;
  color: white;
`;

export const PlaceCircle = styled.View`
  border-radius: 100px;
  background-color: ${colors.all.red.color};
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;
export const DateCircle = styled.View`
  border-radius: 100px;
  background-color: ${colors.all.green.color};
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const DistCircle = styled.View`
  border-radius: 100px;
  background-color: ${colors.all.orange.color};
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const TimeCircle = styled.View`
  border-radius: 100px;
  background-color: ${colors.all.pink.color};
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const SpeedCircle = styled.View`
  border-radius: 100px;
  background-color: ${colors.all.blue.color};
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const CircleShadow = styled(Shadow)`
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

export const ButtonShadow = styled(Shadow)`
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: 100%;
  height: 100%;
`;
