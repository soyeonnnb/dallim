import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {colors} from '@/components/common/globalStyles';

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
  height: 15%;
  justify-content: space-evenly;
`;
export const HeaderBox = styled.View`
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

export const Pagination = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const PaginationDot = styled(Shadow)<{isFocused: boolean}>`
  width: ${props => (props.isFocused ? 12 : 8)}px;
  height: ${props => (props.isFocused ? 12 : 8)}px;
  border-radius: 13px;
  margin: 0 3%;
  background-color: ${props =>
    props.isFocused ? colors.lightBlue._600 : 'white'};
`;
