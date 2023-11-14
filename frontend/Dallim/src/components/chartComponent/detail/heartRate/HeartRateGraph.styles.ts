import styled from 'styled-components/native';
import {Shadow} from 'react-native-shadow-2';

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
  font-size: 18px;
  font-weight: 800;
  color: white;
`;
export const DataPreviewHeartRate = styled.Text<{color: string}>`
  font-size: 35px;
  font-weight: 800;
  color: ${props => props.color};
`;
export const ChartView = styled.View`
  flex: 0.7;
  align-items: center;
  justify-content: center;
`;

export const ChartBox = styled.View`
  width: 80%;
  height: 80%;
  align-content: center;
  justify-content: center;
`;
