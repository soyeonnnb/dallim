import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const Container = styled.View`
  flex: 0.4;
  background-color: white;
  width: 100%;
  align-items: center;
  padding: 0 5%;
`;
export const Text = styled.Text`
  font-size: 30px;
  color: white;
`;

export const RecordBox = styled.View`
  flex: 1;
  width: 100%;
`;

export const Footer = styled.View`
  height: 60px;
`;
