import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

// 사용하지 않는 ModalContainer 스타일을 제거했습니다.

export const BackgroundImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
`;

export const ModalContent = styled.View`
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledPage = styled.View`
  flex: 1;
  width: 100%;
`;

export const StyledImage = styled.Image`
  width: 100%;
`;

export const Header = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 10%;
  flex-direction: row;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CloseImage = styled.Image`
  width: 35%;
  height: 35%;
`;

export const TitleBox = styled.View`
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
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Body = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  border-width: 1px;
  border-color: blue;
  width: 80%;
  height: 80%;
`;

export const Footer = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 10%;
`;

export const FooterLeft = styled.View`
  border-width: 1px;
  border-color: blue;
  width: 40%;
  height: 100%;
`;

export const PotBox = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 100%;
`;

interface IndicatorProps {
  active: boolean;
}

export const Indicator = styled.View<IndicatorProps>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: 5px;
  background-color: ${props => (props.active ? 'white' : 'gray')};
`;
