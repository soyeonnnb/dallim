import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Body = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 90%;
  justify-content: center;
  align-items: center;
`;

export const BodyBox = styled.View`
  border-width: 1px;
  border-color: blue;
  border-radius: 20px;
  width: 90%;
  height: 80%;
  background-color: rgba(255, 255, 255, 0.35);
  overflow: visible;
  align-items: center;
  margin-top: 15%;
`;

export const Top = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 20%;
`;

export const CharacterBox = styled.View`
  border-width: 1px;
  border-color: green;
  width: 100%;
  height: 70%;
  align-items: center;
`;

export const Cycle = styled.View`
  border-width: 1px;
  border-color: green;
  width: 120px;
  height: 120px;
  top: -60px;
  border-radius: 60px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const CharacterImage = styled.Image`
  width: 60px;
  height: 80%;
`;

export const NicknameBox = styled.View`
  border-width: 1px;
  border-color: green;
  width: 100%;
  height: 30%;
  justify-content: center;
  align-items: center;
`;

export const NicknameText = styled.Text`
  font-size: 20px;
  color: black;
`;

export const Middle = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

export const TabBox = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 10%;
`;