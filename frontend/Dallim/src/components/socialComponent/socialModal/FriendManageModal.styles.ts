import styled from 'styled-components/native';
import {TextInput, Image} from 'react-native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const ModalContent = styled.View`
  /* border-color: red;
  border-width: 1px; */
  width: 90%;
  height: 80%;
`;

export const Header = styled.View`
  /* border-color: red;
  border-width: 1px; */
  border-radius: 20px;
  width: 100%;
  height: 80%;
  align-items: center;
  background-color: white;
`;

export const Top = styled.View`
  border-bottom-color: gray;
  border-bottom-width: 1px;
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: center;
`;

export const TopText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: black;
`;

export const ListBox = styled.View`
  /* border-color: blue;
  border-width: 1px; */
  width: 100%;
  height: 88%;
  align-items: center;
  padding: 5px;
`;

export const UserBox = styled.View`
  /* border-color: red;
  border-width: 1px; */
  width: 90%;
  height: 70px;
  margin-top: 10px;
  margin-left: 5%; // 스크롤
`;

export const FriendBox = styled.View`
  /* border-color: red;
  border-width: 1px; */
  width: 90%;
  height: 70px;
  margin-top: 10px;
  margin-left: 5%; // 스크롤
`;

export const Body = styled.View`
  /* border-color: red;
  border-width: 1px; */
  width: 100%;
  height: 10%;
  align-items: center;
`;

export const ViewSelector = styled.View`
  /* border-color: blue;
  border-width: 1px; */
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  bottom: 10px;
  z-index: -1;
`;

export const SelectorButton = styled.TouchableOpacity<{ isActive: boolean }>`
  /* border-color: red;
  border-width: 1px; */
  border-radius: 10px;
  background-color: ${({ isActive }) => (isActive ? 'white' : '#C1C4E7')};
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 70%;
`;

export const SelectorText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: black;
`;

export const Footer = styled.View`
  /* border-color: red;
  border-width: 1px; */
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: center;
`;

export const EmptyImage = styled.Image`
  width: 50%;
  height: 40%;
  margin-top: 20%;
`;

export const EmptyText = styled.Text`
  font-size: 10px;
  color: #8c8c8c;
  text-align: center;
`;

export const Bottom = styled.View`
  flex-direction: row;
  border-radius: 15px;
  width: 100%;
  height: 10%;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

export const CloseImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Search = styled.View`
  /* border-color: blue;
  border-width: 1px; */
  flex-direction: row;
  border-radius: 15px;
  width: 65%;
  height: 10%;
  align-items: center;
`;

export const SearchLeft = styled.View`
  border-color: gray;
  border-width: 1px;
  border-radius: 10px;
  flex-direction: row;
  margin-left: 5%;
  width: 80%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const SearchBox = styled(TextInput)`
  /* border-color: green;
  border-width: 1px; */
  height: 100%;
  width: 100%;
  padding: 5px;
  font-size: 10px;
  color: #8c8c8c;
`;

export const SearchRight = styled.View`
  /* border-color: red;
  border-width: 1px; */
  flex-direction: row;
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const SendButton = styled.TouchableOpacity`
  /* border-color: red;
  border-width: 1px; */
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 80%;
`;

export const SearchIcon = styled(Image)`
  width: 100%;
  height: 100%;
`;
