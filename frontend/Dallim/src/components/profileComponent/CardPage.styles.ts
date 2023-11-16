import styled from 'styled-components/native';
import {Image} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {colors} from '../common/globalStyles';

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
  padding-left: 7%;
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
  font-size: 12px;
`;

export const LevelText = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: bold;
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
  left: 5%;
  width: 20%;
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
  height: 10%;
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
  /* border-width: 1px;
  border-color: red; */
  /* align-items: center; */
  justify-content: center;
  font-size: 15px;
  color: white;
  left: 5%;
`;

export const ClearBox = styled.View`
  /* border-width: 1px;
  border-color: orange; */
  width: 20%;
  height: 20%;
  right: 90%;
  bottom: 85%;
  /* top: 60%; */
  /* left: 5%; */
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
  width: 70%;
  height: 65%;
  top: 43%;
  justify-content: flex-end;
  left: 45%;
  position: absolute;
`;

export const CharacterImage = styled.Image`
  /* border-width: 1px; */
  width: 100%;
  height: 100%;
`;

export const CircleShadow = styled(Shadow)`
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

export const PlaceCircle = styled.View`
  border-radius: 100px;
  background-color: ${colors.all.red.color};
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const DateCircle = styled.View`
  border-radius: 100px;
  background-color: ${colors.all.green.color};
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const DistCircle = styled.View`
  border-radius: 100px;
  background-color: ${colors.all.orange.color};
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const TimeCircle = styled.View`
  border-radius: 100px;
  background-color: ${colors.all.pink.color};
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const SpeedCircle = styled.View`
  border-radius: 100px;
  background-color: ${colors.all.blue.color};
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;
