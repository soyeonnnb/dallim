import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

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
  /* border-width: 1px;
  border-color: red; */
  flex: 1;
  width: 100%;
`;

export const StyledImage = styled.Image`
  width: 100%;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 10%;
  flex-direction: row;
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

export const RenderBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 60%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const PotBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

interface IndicatorProps {
  active: boolean;
}

export const Indicator = styled.View<IndicatorProps>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: 5px;
  background-color: ${props => (props.active ? 'yellow' : 'white')};
`;

export const TempBox = styled.View`
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 90%;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 90%;
  height: 90%;
`;
