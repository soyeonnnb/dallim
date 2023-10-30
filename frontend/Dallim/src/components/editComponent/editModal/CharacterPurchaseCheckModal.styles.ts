import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: white;
  align-items: center;
  border-radius: 20px;
  width: 80%;
  height: 270px;
`;

export const ModalHeader = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
`;

export const ImageBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
`;

export const StyledGif = styled(FastImage)`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
`;

export const ConfirmText = styled.Text`
  font-size: 20px;
  color: black;
`;

export const ModalBody = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15%;
`;


export const ModalFooter = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 25%;
`;

export const ModalConfirmButton = styled.TouchableOpacity`
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
