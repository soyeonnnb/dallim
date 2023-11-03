import styled from 'styled-components/native';
import {colors} from '@/components/common/globalStyles';

export const Container = styled.View`
  flex: 1;
  margin: 8% 0;
`;
export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8%;
`;
export const Title = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: white;
`;
export const Navi = styled.Text`
  color: ${colors.gray};
`;
export const Chart = styled.View``;
export const Text = styled.Text`
  color: white;
`;
