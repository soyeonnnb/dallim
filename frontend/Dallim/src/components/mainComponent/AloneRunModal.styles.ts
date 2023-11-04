import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); // 반투명한 배경을 추가
`;

export const BackgroundImage = styled(ImageBackground)`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
`;

export const ModalContent = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
`;

export const Header = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 10%;
  justify-content: center;
  align-items: flex-end;
`;


export const Body = styled.View`
  border-width: 1px;
  border-color: blue;
  width: 100%;
  height: 60%;
`;


export const Bottom = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 30%;
`;
