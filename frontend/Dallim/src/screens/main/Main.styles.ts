import styled from 'styled-components/native';
import {ImageBackground, Image} from 'react-native';
import {Animated} from 'react-native';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  width: 100%;
  height: 10%;
`;

export const HeaderLeft = styled.View`
  /* border-width: 1px;
  border-color: yellow; */
  width: 40%;
  height: 100%;
  justify-content: flex-end;
`;

export const ToggleButtonWrapper = styled(ImageBackground)<{ isOn?: boolean }>`
  border-width: 1px;
  border-radius: 100px;
  border-color: ${props => (props.isOn ? 'white' : 'gray')};
  padding: 4px;
  width: 80px;
  height: 40px;
  margin-left: 20px;
  overflow: hidden;
`;

export const ToggleButtonBackground = styled(TouchableOpacity)`
  /* border-width: 1px;
  border-color: green; */
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const ToggleButton = styled(Animated.createAnimatedComponent(ImageBackground))<{isOn?: boolean}>`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  background-color: transparent;
`;

export const HeaderRight = styled.View`
  /* border-width: 1px;
  border-color: green; */
  flex-direction: row;
  width: 60%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const PointText = styled.Text<{isOn?: boolean}>`
  font-size: 20px;
  color: ${props => (props.isOn ? 'black' : 'white')};
  margin-right: 10%;
`;

export const StampBox = styled.View`
  /* border-width: 1px;
  border-color: red; */

  /* 임시버튼 있는 경우 */
  justify-content: space-between;
  /* justify-content: flex-end; */
  align-items: flex-end;
  width: 90%;
  height: 10%;
  flex-direction: row;
`;

export const Stamp = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  /* align-items: center; */
  width: 45px;
  height: 45px;
`;

export const StampImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const SendButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
`;

export const ThemeBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 80%;
  height: 80%;
  position: relative;
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const StyledGif = styled(FastImage)`
 /* border-width: 1px;
  border-color: red; */
  width: 100px;
  height: 100px;
  top: 60%;
  left: 35%;
  position: absolute;
`;

export const Footer = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 10%;
`;

export const FooterBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const LevelText = styled.Text<{isOn?: boolean}>`
  font-size: 20px;
  color: ${props => (props.isOn ? 'black' : 'white')};
  margin-right: 3%;
`;

export const NicknameText = styled.Text<{isOn?: boolean}>`
  font-size: 20px;
  color: ${props => (props.isOn ? 'black' : 'white')};
`;

export const TabBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 10%;
`;