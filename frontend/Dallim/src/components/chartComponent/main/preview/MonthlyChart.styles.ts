import styled from 'styled-components/native';
import {colors} from '@/components/common/globalStyles';
import {Shadow} from 'react-native-shadow-2';

export const BigContainer = styled.View`
  flex: 1;
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 4% 10% 0 10%;
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
  width: 100%;
  background-color: white;
`;

export const ContainerShadow = styled(Shadow)`
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
  width: 100%; // Match the width of your Container
  background-color: red;
  height: 100%;
`;

export const Header = styled.Text`
  flex: 0.15;
  width: 100%;
  font-size: 18px;
  margin-top: 7%;
  color: ${colors.text.black};
  font-weight: 800;
`;
export const ChartSheet = styled.View`
  flex: 0.7;
  align-items: center;
`;

// export const ChartScrollView = styled.View<{width: number}>`
export const ChartScrollView = styled.ScrollView`
  flex: 1;
  /* background-color: aliceblue; */
`;

export const Footer = styled.View`
  flex: 0.1;
`;
export const NoText = styled.Text`
  font-size: 18px;
  flex: 1;
  margin-top: 20%;
  color: ${colors.text.grey};
`;
