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
  background-color: green;
  flex: 0.3;
`;
export const ChartView = styled.View`
  background-color: blue;
  flex: 0.7;
`;
