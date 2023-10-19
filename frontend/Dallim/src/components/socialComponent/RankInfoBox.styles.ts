import styled from 'styled-components/native';
import {Image, TouchableOpacity} from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Box = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  border-radius: 18px;
  width: 100%;
  height: 60px;
  background-color: white;
`;

export const Left = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const RankText = styled.Text`
  font-size: 40px;
  color: black;
`;

export const Middle = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 65%;
  height: 100%;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 45%;
  padding-top: 10px;
`;

export const DistanceText = styled.Text`
  font-size: 12px;
  color: #626262;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  height: 55%;
  padding-bottom: 10px;
`;

export const NickNameText = styled.Text`
  font-size: 16px;
  color: black;
`;

export const LevelText = styled.Text`
  font-size: 10px;
  color: #ffcc00;
`;

export const Right = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 15%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const AddFriendButton = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const AddFriendImage = styled(Image)`
  width: 50%;
  height: 50%;
`;
