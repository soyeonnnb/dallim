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
  height: 60px;
`;

export const Left = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CharacterImage = styled.Image`
  /* border-width: 1px;
  border-color: gray; */
  width: 60%;
  height: 80%;
`;

export const Middle = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 50%;
  height: 100%;
  justify-content: center;
`;

export const NicknameText = styled.Text`
  font-size: 13px;
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
  width: 30%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const FriendRemoveButton = styled(TouchableOpacity)`
  /* border-width: 1px;
  border-color: blue; */
  width: 50%;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

export const FriendRemoveImage = styled(Image)`
  width: 80%;
  height: 80%;
`;

export const FriendDetailButton = styled(TouchableOpacity)`
  /* border-width: 1px;
  border-color: blue; */
  width: 50%;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

export const FriendDetailImage = styled(Image)`
  width: 80%;
  height: 80%;
`;
