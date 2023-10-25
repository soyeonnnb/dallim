import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); // 예를 들면 반투명한 배경을 추가
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
`;

export const ModalContent = styled.View`
  width: 90%;
  height: 400px;
  border-radius: 10px;
`;

export const Header = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 20%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderMiddle = styled.View`
  border-width: 1px;
  border-color: red;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
`;

export const Text = styled.Text`
  color: white;
  font-size: 20px;
`;

export const HeaderSide = styled.View`
  border-width: 1px;
  border-color: blue;
  justify-content: flex-start;
  align-items: flex-end;
  width: 20%;
  height: 100%;
  padding: 2%;
`;

export const CloseButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: red; */
  width: 15px;
  height: 15px;
`;

export const CloseImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Body = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

export const Watch = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: white;
`;
