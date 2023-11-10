import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const BackgroundImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
`;

export const StyledPage = styled.View`
  flex: 1;
  width: 100%;
`;

export const Header = styled.View`
  width: 100%;
  height: 10%;
  justify-content: flex-start;
  align-items: center;
`;

export const Body = styled.View`
  width: 100%;
  height: 80%;
  flex-direction: row;
`;

export const RunBody = styled.View`
  width: 100%;
  height: 90%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const WatchLinkLeftBox = styled.View`
  width: 50%;
  height: 80%;
`;

export const WatchLinkRightBox = styled.View`
  width: 50%;
  height: 80%;
  margin-top: 30%;
`;

export const StartBox = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const RunBox = styled.View`
  width: 50%;
  height: 100%;
`;

export const RunTop = styled.View`
  width: 100%;
  height: 10%;
  justify-content: center;
  align-items: center;
`;

export const RunMiddle = styled.View`
  width: 100%;
  height: 75%;
`;

export const RunBottom = styled.View`
  width: 100%;
  height: 15%;
`;

export const ImageBox = styled.View`
  height: 40%;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Footer = styled.View`
  width: 100%;
  height: 10%;
  justify-content: center;
  align-items: center;
`;

export const MainText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: white;
`;

export const SubText = styled.Text`
  font-size: 15px;
  color: white;
`;
