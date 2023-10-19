import styled from 'styled-components/native';
import {Animated, TouchableOpacity, Image} from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Top = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  width: 90%;
  height: 10%;
  justify-content: space-between;
  align-items: center;
`;

export const TopLeft = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  height: 100%;
  width: 50%;
  align-items: center;
`;

export const DateText = styled.Text`
  font-size: 14px;
  margin-right: 10px;
  color: white;
`;

export const QuestionImage = styled(Image)`
  width: 20px;
  height: 20px;
`;

export const ToggleButtonWrapper = styled(TouchableOpacity)`
  border-width: 1px;
  border-radius: 100px;
  border-color: transparent;
  padding: 4px;
  width: 120px;
  height: 30px;
  background-color: #122937;
`;

export const ToggleButton = styled(Animated.View)`
  width: 50px;
  height: 20px;
  border-radius: 100px;
  margin-left: 5px;
  background-color: white;
`;

export const ToggleButtonText = styled.Text`
  color: black;
  font-size: 12px;
  text-align: center;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 90%;
  height: 90%;
  padding-top: 20px;
`;

