import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

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
  width: 90%;
  height: 300px;
`;

export const ModalHeader = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
`;

export const ModalText = styled.Text`
  font-size: 20px;
  color: black;
`;

export const ModalBody = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 60%;
`;

export const BoxStyle = styled.View`
  /* border-width: 1px;
  border-color: green; */
  width: 40%;
  height: 80%;
`;

export const ChangeBoxStyle = styled.View`
  /* border-width: 1px;
  border-color: green; */
  width: 20%;
  height: 40%;
`;

export const Image = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

export const ChangeBox = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ChangeIcon = styled.Image`
  border-width: 1px;
  border-color: green;
  width: 25px;
  height: 25px;
`;

export const ModalFooter = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  height: 20%;
`;

export const ModalButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #315182;
  width: 60px;
  height: 30px;
`;

export const ModalCancelButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #e36f6f;
  width: 60px;
  height: 30px;
`;

export const ModalButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;
