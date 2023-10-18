import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); // 예를 들면 반투명한 배경을 추가
`;

export const ModalContent = styled.View`
  width: 280px;
  height: 550px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

export const Top = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: center;
`;

export const CloseButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: red;
  align-self: flex-end;
  width: 30px;
  height: 30px;
`;

export const CloseImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Middle = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  width: 100%;
  height: 80%;
  align-items: center;
`;

export const Bottom = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  width: 100%;
  height: 10%;
  align-items: center;
`;