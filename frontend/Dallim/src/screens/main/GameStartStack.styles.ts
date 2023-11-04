import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';
import {Animated} from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const BackgroundImage = styled(ImageBackground)`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
`;

export const Header = styled.View`
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
  align-items: center;
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
  width: 100%;
  height: 80%;
  align-items: center;
  top: 30px;
  gap: 10px;
`;

export const ButtonBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  width: 80%;
  height: 30%;
  align-items: center;
  justify-content: center;
`;

export const ButtonBackground = styled(ImageBackground)`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const RunButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
  height: 80%;
  padding-left: 10%;
  padding-top: 5%;
`;

export const RunTop = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 60%;
  height: 30%;
  justify-content: center;
`;

export const MainText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export const RunMiddle = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 60%;
  height: 50%;
  top: 5px;
  gap: 5px;
`;

export const SubText = styled.Text`
  font-size: 13px;
  color: white;
`;


export const TabBox = styled.View`
  width: 100%;
  height: 10%;
`;

export const LoadingBox = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const AnimatedFooterText = styled(Animated.Text)`
  font-size: 25px;
  color: white;
`;
