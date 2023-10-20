import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); // 반투명한 배경을 추가
`;

export const ModalContent = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 80%;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  align-items: center;
`;

export const Top = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 90%;
  height: 15%;
  justify-content: center;
  align-items: flex-end;
`;

export const CloseButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: red; */
  width: 30px;
  height: 30px;
`;

export const CloseImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Middle = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
  height: 85%;
`;
