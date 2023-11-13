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
  height: 30%;
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
  height: 40%;
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
  height: 30%;
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
  width: 60%;
  height: 90%;
`;

export const AddButton = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #2a2c45;
  border-radius: 10px;
`;

export const AddText = styled.Text`
  color: white;
  font-size: 10px;
`;

export const AddButton_two = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #d3d3d3;
  border-radius: 10px;
`;

export const AddText_two = styled.Text`
  color: white;
  font-size: 10px;
`;

export const Icon = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 30%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 10px;
  color: white;
`;
