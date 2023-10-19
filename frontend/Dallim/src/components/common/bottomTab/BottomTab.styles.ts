import styled from 'styled-components/native';
import {colors} from '../styles';

// 각 탭 아이콘의 스타일
export const TabBar = styled.View`
  backgroundcolor: 'white';
`;

export const ActiveBackground = styled.View`
  position: 'absolute';
`;

export const tabBarContainer = styled.View`
  flexdirection: 'row';
  justifycontent: 'space-evenly';
`;

export const component = styled.View`
  height: 60;
  width: 60;
  margintop: -5;
`;

export const componentCircle = styled.View`
  flex: 1;
  borderradius: 30;
  backgroundcolor: 'white';
`;

export const iconContainer = styled.View`
  position: 'absoulte';
  top:0,
  left:0;
  right:0;
  bottom: 0;
  justifyContent: 'center';
  alignItems: 'center';
`;
