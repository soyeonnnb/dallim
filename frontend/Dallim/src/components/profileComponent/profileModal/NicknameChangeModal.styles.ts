import styled from 'styled-components/native';
import {Shadow} from 'react-native-shadow-2';
export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  border: 2px;
  border-color: #2a2b48;
`;

export const ModalContent = styled.View`
  background-color: white;
  align-items: center;
  border-radius: 20px;
  width: 85%;
  height: 230px;
`;

export const ModalHeader = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25%;
`;

export const TitleBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const TitleText = styled.Text`
  font-size: 20px;
  color: #35306b;
  font-weight: bold;
`;

export const ModalBody = styled.View`
  /* border-width: 1px;
  border-color: green; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45%;
`;

export const PlaceholderBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  align-items: flex-start;
  justify-content: flex-end;
  width: 90%;
  height: 60%;
  padding-left: 10px;
`;

export const NicknameInput = styled.TextInput`
  font-size: 15px;
  color: black;
  width: 90%;
  height: 70%;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

export const NoticeBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  justify-content: flex-start;
  align-items: flex-start;
  width: 90%;
  height: 40%;
`;

export const NoticeText = styled.Text`
  font-size: 10px;
  color: #ada5a5;
  padding-left: 10px;
  padding-top: 10px;
`;

export const ModalFooter = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 30%;
`;

export const ModalButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: white; */
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #576599;
  width: 75px;
  height: 40px;
`;

export const ModalCancelButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: white; */
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #e36f6f;
  width: 75px;
  height: 40px;
`;

export const ModalButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;

export const BoxShadow = styled(Shadow)`
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;
