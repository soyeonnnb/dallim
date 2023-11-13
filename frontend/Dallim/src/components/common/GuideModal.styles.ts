import styled from 'styled-components/native';
import {colors} from './globalStyles';
import {Shadow} from 'react-native-shadow-2';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;

  /* border-width: 5px; */
`;

export const ModalContent = styled.View`
  background-color: white;
  border-color: #2a2b48;
  border-width: 2px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  width: 60%;
  height: 20%;
`;

export const ContentShadow = styled(Shadow)`
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
  width: 100%; // Match the width of your Container
  background-color: red;
  height: 100%;
`;

export const ButtonShadow = styled(Shadow)`
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
  width: 100%; // Match the width of your Container
  background-color: red;
  height: 100%;
`;

export const ModalHeaderEmptyBox = styled.View`
  /* background-color: white;
  align-items: center;
  justify-content: center; */
  /* border-radius: 15px; */
  width: 100%;
  height: 10%;
`;

export const ModalHeader = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50%;
`;

export const HeaderText = styled.Text`
  font-size: 15px;
  color: #35306b;
`;

export const ModalFooter = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 40%;
`;

export const ModalButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: #5969a1;
  width: 40%;
  height: 60%;
  /* shadowColor: '#000'; // React Native에서는 카멜 케이스(camelCase)를 사용합니다.
  shadowOffset: { width: 0, height: 4 };
  shadowOpacity: 0.3;
  shadowRadius: 5;
  elevation: 5;  */
`;

export const ModalCancelButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: #e36f6f;
  width: 100px;
  height: 50px;
`;

export const ModalButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;
