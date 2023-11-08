import styled from 'styled-components/native';
import {Image, ImageBackground} from 'react-native';
import Video from 'react-native-video';

export const BackgroundVideo = styled(Video)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const BackgroundImage = styled(ImageBackground)`
  border-width: 1px;
  border-color: blue;
  width: 100%;
  height: 100%;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  /* background-color: transparent; */
`;

export const Top = styled.View`
  border-width: 1px;
  border-color: blue;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 20%;
`;

export const TitleBox = styled.View`
  border-width: 1px;
  border-color: red;
  align-items: center;
  width: 200px;
  height: 40px;
`;

export const TitleImage = styled.Image`
  width: 90%;
  height: 100%;
`;

export const Body = styled.View`
  border-width: 1px;
  border-color: red;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
`;

export const BodyBox = styled.View`
  border-width: 1px;
  border-color: red;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 85%;
`;

export const StyledImage = styled.Image`
  border-width: 1px;
  border-color: blue;
  width: 250px;
  height: 330px;
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Footer = styled.View`
  border-width: 1px;
  border-color: red;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;

export const NaverButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: red; */
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 270px;
  height: 50px;
  background-color: #00c73c;
  margin-bottom: 20px;
  elevation: 5; // 그림자
`;

export const NaverText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const KakaoButton = styled.TouchableOpacity`
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 270px;
  height: 50px;
  background-color: #fee500;
  margin-bottom: 20px;
  elevation: 5; 
`;

export const KakaoText = styled.Text`
  color: black;
  font-size: 16px;
  color: #191919;
`;

export const Icon = styled(Image)`
  width: 20px;
  height: 20px;
  margin-right: 30px;
`;
