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
  justify-content: center;
  border-radius: 15px;
  width: 90%;
  height: 200px;
`;

export const ModalHeader = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
`;

export const HeaderDeleteText = styled.Text`
  font-size: 20px;
  color: black;
`;

export const ModalFooter = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 40%;
`;

export const ModalButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: #315182;
  width: 100px;
  height: 50px;
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
