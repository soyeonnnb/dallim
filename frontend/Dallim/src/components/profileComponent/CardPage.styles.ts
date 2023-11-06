import styled from 'styled-components/native';
import {Image} from 'react-native';

export const PageItem = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

export const ImageWrapper = styled.View`
  /* border-width: 1px;
  border-color: red; */
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const StyledImage = styled.ImageBackground`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  width: 100%;
  height: 15%;
`;

export const HeaderLeft = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  padding-left: 5%;
`;

export const HeaderRight = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  padding-right: 5%;
`;

export const DateText = styled.Text`
  color: white;
  font-size: 15px;
`;

export const LevelText = styled.Text`
  color: white;
  font-size: 25px;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30%;
`;

export const NicknameText = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: bold;
`;

export const Footer = styled.View`
  /* border-width: 1px;
  border-color: green; */
  width: 60%;
  height: 55%;
`;

export const Icon = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 30%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const IconImage = styled(Image)`
  width: 20px;
  height: 20px;
`;

export const TopBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  width: 100%;
  height: 20%;
  justify-content: flex-start;
  align-items: center;
`;

export const MiddleBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  width: 100%;
  height: 20%;
  justify-content: flex-start;
  align-items: center;
`;

export const BottomBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  width: 100%;
  height: 20%;
  justify-content: flex-start;
  align-items: center;
`;

export const FooterText = styled.Text`
  font-size: 15px;
  color: white;
`;

export const ClearBox = styled.View`
  /* border-width: 1px;
  border-color: orange; */
  width: 50%;
  height: 50%;
  top: 60%;
  left: 5%;
  position: absolute;
`;

export const ClearImage = styled.Image`
  /* border-width: 1px; */
  width: 100%;
  height: 100%;
`;

export const BodyBottomCharacterImageBox = styled.View`
  /* border-width: 1px;
  border-color: orange; */
  width: 60%;
  height: 70%;
  top: 45%;
  justify-content: flex-end;
  left: 50%;
  position: absolute;
`;

export const CharacterImage = styled.Image`
  /* border-width: 1px; */
  width: 100%;
  height: 100%;
`;
