import styled from 'styled-components/native';
import {Image, TouchableOpacity} from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Box = styled.View`
  border-width: 1px;
  border-color: gray;
  flex-direction: row;
  border-radius: 18px;
  width: 100%;
  height: 100%;
`;

export const Left = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const FriendDetailButton = styled(TouchableOpacity)`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CharacterImage = styled.Image`
  /* border-width: 1px;
  border-color: gray; */
  width: 80%;
  height: 100%;
`;

export const Middle = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 60%;
  height: 100%;
  justify-content: center;
  gap: 5px;
`;

export const Middle_Wait = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 50%;
  height: 100%;
  justify-content: center;
  gap: 5px;
`;


export const NicknameText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: black;
`;

export const LevelText = styled.Text`
  font-size: 10px;
  color: #8c8c8c;
`;

export const Right = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Right_Wait = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  width: 30%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Button_AcceptWait = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Button_DenyWait = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(TouchableOpacity)`
  /* border-width: 1px;
  border-color: blue; */
  width: 70%;
  height: 90%;
  justify-content: center;
  align-items: center;
`;

export const Button_Wait = styled(TouchableOpacity)`
  /* border-width: 1px;
  border-color: blue; */
  width: 90%;
  height: 90%;
  justify-content: center;
  align-items: center;
`;

export const FriendAddImage = styled(Image)`
  /* border-width: 1px;
  border-color: blue; */
  width: 70%;
  height: 70%;
`;

export const FriendRemoveImage = styled(Image)`
  width: 70%;
  height: 70%;
`;

export const WaitImage = styled(Image)`
  /* border-width: 1px;
  border-color: blue; */
  width: 70%;
  height: 70%;
`;