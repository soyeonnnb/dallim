import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Top = styled.View`
  border-width: 1px;
  border-color: red;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15%;
`;

export const TopBox = styled.View`
  border-width: 1px;
  border-color: blue;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
`;

export const Dot = styled.View<{isActive: boolean}>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${props => (props.isActive ? '#6099AD' : 'white')};
  margin: 0 5px;
`;

export const SelectText = styled.Text`
  font-size: 20px;
  color: white;
`;

export const Body = styled.View`
  border-width: 1px;
  border-color: blue;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65%;
`;

export const RoomBox = styled.View<{isOn?: boolean}>`
  border-width: 1px;
  border-color: green;
  width: ${props => (props.isOn ? '100%' : '80%')};
  height: 90%;
`;

export const Bottom = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 20%;
  align-items: center;
`;

export const ButtonBox = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #2a2c45;
  width: 100%;
  height: 50%;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: white;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  width: 70%;
  height: 200px;
`;

export const ModalHeader = styled.View`
  border-width: 1px;
  border-color: red;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;

export const ModalBody = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 50%;
`;

export const ModalText = styled.Text`
  font-size: 15px;
  color: black;
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

export const ModalButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;

export const ModalCancelButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #E36F6F;
  width: 60px;
  height: 30px;
`;
