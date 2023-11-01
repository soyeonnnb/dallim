import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: -1;
  position: absolute;
`;
export const Header = styled.View`
  height: 10%;
  color: white;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 30px;
`;
export const HeaderTitle = styled.Text`
  color: white;
  font-size: 25px;
`;
