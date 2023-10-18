import styled from 'styled-components/native';
import {Image} from 'react-native';
import Video from 'react-native-video';

export const BackgroundVideo = styled(Video)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background-color: transparent; */
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
`;

export const StyledImage = styled(Image)`
  margin-top: 20%;
  width: 60%;
  height: 60%;
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Bottom = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
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
`;

export const Icon = styled(Image)`
  width: 20px;
  height: 20px;
  margin-right: 30px;
`;
