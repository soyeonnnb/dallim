import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  border-radius: 15px;
  width: 90%;
  height: 450px;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 20%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderMiddle = styled.View`
  /* border-width: 1px;
  border-color: red; */
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
  /* border-width: 1px;
  border-color: blue; */
  justify-content: flex-start;
  align-items: flex-end;
  width: 20%;
  height: 100%;
  padding: 5%;
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
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

export const Watch = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  height: 80%;
  width: 80%;
  /* border-radius: 120px; */
  /* background-color: #17183f; */
`;

export const WatchImage = styled.Image`
  width: 100%;
  height: 100%;
`;
