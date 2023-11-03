import styled from 'styled-components/native';
import {colors} from '@/components/common/globalStyles';

export const Container = styled.View`
  flex: 1.2;
  background-color: ${colors.lightBlue};
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  padding: 25px;
`;
export const Title = styled.Text`
  margin: 20px 0;
  font-size: 20px;
  font-weight: 800;
  color: black;
`;
export const ChartSheet = styled.View`
  flex: 0.75;
  background-color: aqua;
`;
