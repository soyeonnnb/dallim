import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  object-fit: contain;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 35%;
`;

export const Text = styled.Text`
  font-size: 15px;
  color: white;
`;

export const TitleProfileBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 20%;
`;

export const ProfileBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  width: 100%;
  height: 80%;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 55%;
`;

export const TitleSetBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 15%;
`;

export const SetBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  width: 100%;
  height: 85%;
`;

export const ButtonBox = styled.TouchableOpacity`
  border-width: 2px;
  border-color: white;
  border-radius: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #2a2c45;
  width: 100%;
  height: 20%;
  margin-bottom: 5%;
`;

export const DeleteButtonBox = styled.TouchableOpacity`
  border-width: 2px;
  border-color: red;
  border-radius: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #2a2c45;
  width: 100%;
  height: 20%;
`;

export const IconBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
`;

export const ButtonIcon = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 25px;
  height: 25px;
`;

export const TextBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  height: 50%;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;

export const TabBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 10%;
`;

// 캐릭터 띄우기
export const ImageBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 35%;
  height: 25%;
  position: absolute;
  top: 18%;
  left: 65%;
`;

export const CharacterImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
