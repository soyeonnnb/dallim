import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  align-items: center;
  border-radius: 20px;
  width: 90%;
  height: 70%;
  background-color: white;
`;

export const Header = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 10%;
  flex-direction: row;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CloseImage = styled.Image`
  width: 35%;
  height: 35%;
`;

export const TitleBox = styled.View`
  border-width: 1px;
  border-color: blue;
  width: 60%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const TitleText = styled.Text`
  font-size: 20px;
  color: black;
`;

export const TempBox = styled.View`
  width: 20%;
  height: 100%;
`;

export const Body = styled.View`
  border-width: 1px;
  border-color: blue;
  width: 100%;
  height: 70%;
  justify-content: center;
  align-items: center;
`;

export const InfoBox = styled.View`
  border-width: 1px;
  border-color: blue;
  width: 90%;
  height: 90%;
`;

export const Footer = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 20%;
`;
