import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  width: ${SCREEN_WIDTH}px;
  justify-content: center;
  align-items: center;
`;
export const Text = styled.Text`
  font-size: 30px;
  color: white;
`;
