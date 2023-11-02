import styled from 'styled-components/native';
import {ImageBackground, TouchableOpacity} from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const BackgroundImageWrapper = styled.View`
  width: 100%;
  height: 100%;
`;

export const BackgroundImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
`;

export const ModalContent = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 90%;
  background-color: #fff;
  border-radius: 10px;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: space-between;
`;

export const CloseButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: red; */
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

export const HeaderBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 60%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
`;

export const DetailText = styled.Text`
  font-size: 25px;
  color: white;
`;

export const Empty = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 20%;
  height: 100%;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  width: 100%;
  height: 30%;
`;

export const ProfileBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  width: 100%;
  height: 80%;
`;

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
`;

export const Footer = styled.View`
  /* border-width: 1px;
  border-color: yellow; */
  width: 100%;
  height: 50%;
`;

export const FooterTop = styled.View`
  /* border-width: 1px;
  border-color: yellow; */
  width: 100%;
  height: 15%;
  flex-direction: row;
`;

export const RecordTitleBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 30%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const RecordTitle = styled.Text`
  color: white;
  font-size: 20px;
`;

export const FooterLine = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 45%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
`;

export const SortBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 25%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
`;

export const Sort = styled.TouchableOpacity`
  position: relative;
  /* border-width: 1px;
  border-color: red; */
  width: 85px;
  height: 80%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const SortText = styled.Text`
  color: white;
  font-size: 15px;
`;

export const DropdownMenu = styled.View`
  position: absolute;
  top: 110%;
  width: 100%;
  z-index: 10;
`;

export const DropdownItem = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: #898989; */
  padding: 5px;
  width: 85px;
  background-color: black;
  border-radius: 10px;
  z-index: 10;
`;

export const DropdownItemText = styled.Text`
  color: white;
  font-size: 10px;
  text-align: center;
`;

export const FooterList = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85%;
`;

export const RunBox = styled.View`
  border-width: 1px;
  border-color: gray;
  width: 90%;
  height: 140px;
  border-radius: 15px;
  margin-bottom: 15px;
  margin-left: 5%;
  /* justify-content: center;
  align-items: center; */
`;

export const TabBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 10%;
`;
