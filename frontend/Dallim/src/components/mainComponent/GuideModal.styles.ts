import styled from 'styled-components/native';
import {ImageBackground, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: white;
  align-items: center;
  border-radius: 20px;
  width: 90%;
  height: 80%;
`;

export const MainBox = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 100%;
  padding: 5%;
`;

export const Header = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 10%;
  flex-direction: row;
`;

export const CloseButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: red;
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CloseImage = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 35%;
  height: 35%;
`;

export const TitleBox = styled.View`
  border-width: 1px;
  border-color: red;
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
  border-width: 1px;
  border-color: red;
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Body = styled.View`
  border-width: 1px;
  border-color: blue;
  width: 100%;
  height: 90%;
`;

export const TimerBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
  height: 15%;
  justify-content: center;
  align-items: center;
`;

export const TimerText = styled.Text`
  font-size: 50px;
  font-weight: bold;
  color: white;
`;

export const StartBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 30%;
  align-items: center;
  justify-content: center;
`;

export const ButtonBackground = styled(ImageBackground)`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const RunButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: blue; */
  width: 50%;
  height: 80%;
  align-items: center;
  justify-content: center;
`;

export const StartText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: white;
`;

export const RecodeBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
  height: 20%;
  flex-direction: row;
`;

export const RecodeLeft = styled.View`
  /* border-width: 1px;
  border-color: green; */
  width: 50%;
  height: 100%;
`;

export const RecodeRight = styled.View`
  /* border-width: 1px;
  border-color: green; */
  width: 50%;
  height: 100%;
`;

export const RecodeTextBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 40%;
  align-items: center;
  justify-content: center;
`;

export const RecodeTitle = styled.Text`
  font-size: 15px;
  color: white;
`;

export const RecodeBottomBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 60%;
  align-items: center;
  justify-content: flex-start;
`;

export const RecodeText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: white;
`;

export const ThemeBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  width: 100%;
  bottom: -30%;
  position: absolute;
`;

export const StyledImage = styled(Image)`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
`;

export const CharacterBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  justify-content: flex-end;
  width: 100%;
  height: 50%;
  position: absolute;
`;

export const StyledGif = styled(FastImage)`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
  height: 40%;
  bottom: -20%;
`;

export const CharacterImage = styled.Image`
  width: 100%;
  height: 100%;
  height: 30%;
  bottom: -20%;
`;

export const TempText = styled.Text`
  font-size: 25px;
  color: white;
`;
