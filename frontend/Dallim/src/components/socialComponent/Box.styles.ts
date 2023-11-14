import styled from 'styled-components/native';
import {Image, TouchableOpacity} from 'react-native';
import {colors} from '../common/globalStyles';
import {Shadow} from 'react-native-shadow-2';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  /* border-width: 1px;
  border-color: blue; */
`;

export const Box = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #35306b;
  /* border-bottom: 1px;
  border: grey; */
  /* border-bottom-color: gray; */
  flex-direction: row;
  /* border-radius: 18px; */
  width: 100%;
  height: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  align-items: center;
`;

export const Left = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 20%;
  height: 90%;
  justify-content: center;
  align-items: center;
`;
// export const EmptyBox = styled.View`
//   border-width: 1px;
//   border-color: red;
//   width: 5%;
//   height: 90%;
//   justify-content: center;
//   align-items: center;
// `;

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
  width: 100%;
  height: 100%;
`;

export const Middle = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 60%;
  height: 100%;
  justify-content: center;
  gap: 5px;
  padding-left: 3%;
`;

export const MiddleDelete = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 60%;
  height: 100%;
  justify-content: center;
  gap: 5px;
  padding-left: 3%;
`;

export const Middle_Wait = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 50%;
  height: 100%;
  justify-content: center;
  gap: 5px;
  padding-left: 3%;
`;

export const NicknameText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: black;
`;

export const LevelText = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #8c8c8c;
`;

export const Right = styled.View`
  /* border-width: 1px;
  border-color: red; */
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
  border-width: 1px;
  border-color: ${colors.button.depth1.color};
  background-color: ${colors.button.depth1.color};
  border-radius: 10px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  padding-left: 10%;
`;

export const DeleteButton = styled(TouchableOpacity)`
  border-width: 1px;
  border-color: #eb4242;
  background-color: #f45252;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  padding-left: 10%;
`;

export const Button_Wait = styled(TouchableOpacity)`
  border-width: 1px;
  border-color: ${colors.button.depth1.color};
  background-color: ${colors.button.depth1.color};
  width: 40px;
  height: 40px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
export const Button_Delete = styled(TouchableOpacity)`
  border-width: 1px;
  border-color: #eb4242;
  background-color: #f45252;
  width: 40px;
  height: 40px;
  border-radius: 10px;
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

export const ButtonShadow = styled(Shadow)`
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
`;
