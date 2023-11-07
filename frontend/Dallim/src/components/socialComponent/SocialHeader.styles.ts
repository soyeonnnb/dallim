import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import {Animated} from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 50%;
`;

export const HeaderLeft = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  align-items: flex-start;
  width: 50%;
  height: 100%;
  padding-left: 5%;
`;

export const DateText = styled.Text`
  font-size: 14px;
  margin-right: 10px;
  color: white;
`;

export const HeaderRight = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  align-items: flex-end;
  width: 30%;
  height: 100%;
  padding-right: 5%;
`;

export const ManageButton = styled(TouchableOpacity)`
  background-color: transparent;
`;

export const ManageText = styled.Text`
  font-size: 15px;
  color: white;
`;

export const AnimatedManageText = styled(Animated.Text)`
  /* border-width: 1px;
  border-color: red; */
  font-size: 15px;
  color: white;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;

`;

export const BodyBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  height: 100%;
`;

export const BodySideBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  padding-bottom: 2%;
  width: 30%;
  height: 100%;
`;

export const QuestionImage = styled.Image`
  width: 20px;
  height: 20px;
`;

export const RankText = styled.Text`
  font-size: 30px;
  color: white;
`;
