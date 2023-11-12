import styled from 'styled-components/native';
import {colors} from '@/components/common/globalStyles';

export const Container = styled.View`
  flex: 1;
  /* background-color: ${colors.purple._200}; */
  border-width: 1px;
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
  align-items: center;
  padding: 2% 10% 0 10%;
`;
export const Header = styled.Text`
  flex: 0.15;
  width: 100%;
  font-size: 18px;
  margin-top: 5%;
  color: black;
  font-weight: 800;
`;
export const ChartSheet = styled.View`
  flex: 0.65;
  align-items: center;
`;

// export const ChartScrollView = styled.View<{width: number}>`
export const ChartScrollView = styled.ScrollView`
  flex: 1;
  /* background-color: aliceblue; */
`;

export const Footer = styled.View`
  flex: 0.15;
`;
export const NoText = styled.Text`
  font-size: 18px;
  flex: 1;
  margin-top: 20%;
`;
