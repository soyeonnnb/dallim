import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const ModalContainer = styled.View`
  flex: 1;
`;

export const BackgroundImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
`;

export const ModalContent = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
  /* background-color: #fff; */
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  width: 100%;
  height: 10%;
`;
export const HeaderLeft = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: red; */
  width: 40%;
  height: 40%;
  justify-content: center;
  align-items: center;
`;
export const CloseImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const HeaderCenter = styled.View`
  /* border-width: 1px;
  border-color: red; */
  align-items: flex-end;
  justify-content: center;
  width: 40%;
  height: 100%;
`;

export const Title = styled.Text`
  font-size: 25px;
  color: white;
`;

export const HeaderRight = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 40%;
  height: 100%;
  padding-left: 2%;
`;

export const HeaderRightBox = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
  padding-top: 5%;
`;

export const QuestionImage = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 20px;
  height: 20px;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
  height: 40%;
`;
export const BodyBackground = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

export const BodyLeft = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 50%;
  height: 100%;
`;

export const InfoTop = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 75%;
  justify-content: flex-end;
  align-items: center;
`;

export const CharacterImage = styled.Image`
  /* border-width: 1px;
  border-color: blue; */
  width: 80%;
  height: 80%;
`;

export const InfoMiddle = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 10%;
  justify-content: flex-start;
  align-items: center;
`;

export const NicknameText = styled.Text`
  /* border-width: 1px;
  border-color: blue; */
  font-size: 20px;
  color: white;
`;

export const InfoBottom = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 15%;
  justify-content: flex-start;
  align-items: center;
`;

export const LevelText = styled.Text`
  /* border-width: 1px;
  border-color: blue; */
  font-size: 15px;
  color: black;
`;

export const BodyRigth = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 50%;
  height: 100%;
`;

export const Footer = styled.View`
  /* border-width: 1px;
  border-color: yellow; */
  width: 100%;
  height: 45%;
  align-items: center;
`;

export const FooterBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 25%;
  align-items: center;
`;

export const FooterTextBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 40%;
  flex-direction: row;
`;

export const LeftTextBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 30%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-start;
`;
export const MiddleTextBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 40%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const RightTextBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 30%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const FooterText = styled.Text`
  color: white;
  font-size: 18px;
`;

export const FooterBarBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 90%;
  height: 60%;
  justify-content: center;
`;

export const RateBarBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
  height: 50%;
  flex-direction: row;
  border-radius: 50px;
  overflow: hidden;
`;

export const RateBar = styled.View<{
  myWidthPercentage: number;
  otherWidthPercentage: number;
}>`
  flex-direction: row;
`;

export const MyDataBar = styled.View<{widthPercentage: number}>`
  position: relative;
  width: ${props => props.widthPercentage}%;
  height: 100%;
  background-color: #fdcb86; // 내 데이터 색상
`;

export const OtherDataBar = styled.View<{widthPercentage: number}>`
  position: relative;
  width: ${props => props.widthPercentage}%;
  height: 100%;
  background-color: #8da478; // 상대 데이터 색상
  border-radius: 40px;
  align-items: flex-end;
  justify-content: center;
`;

export const RateLeftText = styled.Text`
  position: absolute;
  color: white;
  font-size: 13px;
  padding-left: 20%;
`;

export const RateRightText = styled.Text`
  position: absolute;
  color: white;
  font-size: 13px;
  padding-right: 20%;
`;
