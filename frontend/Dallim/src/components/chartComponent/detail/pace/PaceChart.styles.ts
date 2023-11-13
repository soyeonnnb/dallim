import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {colors} from '@/components/common/globalStyles';

export const Container = styled.View`
  flex: 0.53;
  width: 100%;
  padding-bottom: 20px;
`;
export const Text = styled.Text`
  font-size: 30px;
  color: white;
  margin-bottom: 20px;
`;
export const DataPreviewView = styled.View`
  flex: 0.2;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const DataPreviewBox = styled.View<{width: number}>`
  width: ${props => props.width}px;
  height: 100%;
`;
export const DataPreview = styled(Shadow)<{color: string}>`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border: 3px solid ${props => props.color};
`;

export const DataPreviewTime = styled.Text`
  font-size: 15px;
  color: ${`${colors.grey._50}86`};
`;
export const DataPreviewPace = styled.Text`
  font-size: 28px;
  font-weight: 800;
  color: white;
`;

export const ChartView = styled.View`
  /* background-color: blue; */
  align-items: center;
  justify-content: center;
  flex: 0.7;
`;

export const ChartBox = styled.View`
  width: 80%;
  height: 80%;
  align-content: center;
  justify-content: center;
  /* background-color: aliceblue; */
`;
export const ChartDistanceView = styled.View`
  flex: 0.1;
  justify-content: center;
  align-items: center;
`;
export const ChartDistanceTitle = styled.Text`
  font-size: 14px;
  color: ${`${colors.grey._50}85`};
`;

export const ChartDistance = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: white;
`;
export const ChartTotalDistance = styled.Text`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  vertical-align: bottom;
  margin-left: 3%;
`;
export const ChartDistanceTexts = styled.View`
  flex-direction: row;
`;
