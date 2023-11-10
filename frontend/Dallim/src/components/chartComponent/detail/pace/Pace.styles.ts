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

export const ToggleBox = styled.View`
  background-color: white;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  /* flex: 0.05; */
`;

export const ToggleText = styled.Text`
  /* margin-right: 10px; */
  font-size: 15px;
  line-height: 20px;
  vertical-align: middle;
`;
