import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const Container = styled.View`
  flex: 0.5;
  width: 100%;
  padding-bottom: 20px;
`;
export const Text = styled.Text`
  font-size: 30px;
  color: white;
  margin-bottom: 20px;
`;
export const DataPreviewView = styled.View`
  flex: 0.3;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
export const DataPreview = styled.View`
  width: 50%;
  height: 80%;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
`;

export const DataPreviewTime = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: white;
`;
export const DataPreviewHeartRate = styled.Text`
  font-size: 35px;
  font-weight: 800;
  color: white;
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
