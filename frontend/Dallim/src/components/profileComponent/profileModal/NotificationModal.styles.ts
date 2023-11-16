import styled from 'styled-components/native';
import {colors} from '@/components/common/globalStyles';
import { Shadow } from 'react-native-shadow-2';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: white;
  align-items: center;
  border-radius: 15px;
  border-color: ${colors.button.depth1.color};
  width: 80%;
  height: 180px;
`;

export const ModalHeader = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 65%;
`;

export const TextBox = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
`;

export const TitleText = styled.Text`
  /* border-width: 1px;
  border-color: red; */
  font-size: 20px;
  color: #35306b;
`;

export const ModalFooter = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 35%;
`;

export const ModalText = styled.Text`
  font-size: 20px;
  color: black;
`;

export const ModalButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #315182;
  width: 70px;
  height: 35px;
`;

export const ModalCancelButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #e36f6f;
  width: 70px;
  height: 35px;
`;

export const ModalButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;

export const BoxShadow = styled(Shadow)`
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;