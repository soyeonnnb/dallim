import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';
import {colors} from '@/components/common/globalStyles';

export const Container = styled.View`
  flex: 1;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  flex: 0.1;
`;

export const BackButtonFlexBoxLeft = styled.TouchableOpacity`
  width: 10%;
  align-items: center;
`;

export const BackButtonIcon = styled.Image`
  width: 100%;
  height: 100%;
`;

export const BackButtonFlexBoxRight = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
`;

export const TitleText = styled.Text`
  font-size: 25px;
  color: white;
`;

export const Body = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  /* background-color: red; */
  flex: 0.45;
`;

export const Footer = styled.View`
  background-color: white;
  border-radius: 40px;
  align-items: center;
  width: 100%;
  flex: 0.45;
`;

export const TopText = styled.Text`
  color: white;
  font-size: 18px;
  vertical-align: middle;
  flex: 0.1;
`;
export const NumberInputBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10%;
  flex: 0.3;
`;
export const NumberInput = styled.View`
  flex: 1;
  height: 20px;
  margin: 0 2%;
  height: 55%;
  justify-content: center;
  align-items: center;
  border-bottom-width: 2px;
  border-color: white;
`;

export const NumberInputText = styled.Text`
  font-size: 45px;
  color: white;
`;
export const InfoBox = styled.TouchableOpacity`
border-width: 1px;
  border-color: blue;
  flex: 0.1;
  justify-content: flex-start;
`;

export const InfoText = styled.Text`
  text-decoration: underline;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
`;
export const ConnectButtonBox = styled.TouchableOpacity`
  flex: 0.15;
  background-color: white;
  justify-content: center;
  width: 55%;
  align-content: center;
  border-radius: 15px;
`;

export const ConnectionButtonText = styled.Text`
  text-align: center;
  font-size: 17px;
  font-weight: 900;
  color: ${colors.darkBlue};
`;
export const InputNumpadRows = styled.View`
  width: 80%;
  height: 80%;
  margin-top: 2%;
`;
export const InputNumpadRow = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
export const InputNumpad = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  height: 100%;
  justify-content: center;
`;
export const InputNumpadText = styled.Text`
  font-size: 35px;
  font-weight: 700;
  color: ${colors.darkBlue};
`;
