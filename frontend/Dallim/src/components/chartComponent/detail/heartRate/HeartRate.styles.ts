import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  width: ${SCREEN_WIDTH};
  justify-content: center;
  align-items: center;
  background-color: indianred;
`;
export const Text = styled.Text``;
