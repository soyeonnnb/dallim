import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {colors} from '@/components/common/globalStyles';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const Container = styled.View`
  flex: 0.47;
  background-color: white;
  width: 100%;
  align-items: center;
  padding: 0 5%;
`;

export const Middle = styled.View`
  width: 100%;
  flex: 0.8;
  flex-direction: row;
  padding: 5% 0;
`;
export const ChartSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const ChartInfos = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Footer = styled.View`
  flex: 0.2;
`;
export const ChartInfo = styled.View`
  flex-direction: row;
  margin: 3% 0;
  margin-left: 10%;
  justify-content: space-between;
`;
export const ChartInfoColor = styled.View<{size: number; bgColor: string}>`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  background-color: ${props => props.bgColor};
  margin-right: 12%;
  border-radius: ${props => props.size / 5}px;
`;
export const ChartInfoText = styled.View`
  flex-direction: row;
`;

export const ChartInfoName = styled.Text`
  color: ${colors.text.black};
  text-align: center;
`;
export const ChartInfoContent = styled.Text`
  color: ${colors.text.black};
`;

export const ChartInfoLeft = styled.View`
  flex-direction: row;
  flex: 0.4;
  align-items: center;
`;
export const ChartInfoRight = styled.View`
  flex: 0.6;
  align-items: flex-end;
  justify-content: center;
`;
