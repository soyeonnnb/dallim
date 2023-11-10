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
  border-width: 1px;
  border-color: red;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
`;

export const TitleText = styled.Text`
  font-size: 20px;
  color: black;
`;

export const ModalBody = styled.View`
  border-width: 1px;
  border-color: green;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
`;

export const ModalFooter = styled.View`
  border-width: 1px;
  border-color: blue;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
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
  width: 75px;
  height: 40px;
`;

export const ModalCancelButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
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
