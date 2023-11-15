import styled from 'styled-components/native';
import {colors} from '@/components/common/globalStyles';
import {Shadow} from 'react-native-shadow-2';
export const DataPreviewBox = styled.View<{width: number}>`
  width: ${props => props.width}px;
  height: 100%;
`;
export const DataPreview = styled(Shadow)<{color: string}>`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border: 3px solid ${props => props.color};
`;

export const DataPreviewUpper = styled.Text`
  font-size: 15px;
  color: ${`${colors.grey._50}86`};
`;
export const DataPreviewLower = styled.Text`
  font-size: 28px;
  font-weight: 800;
  color: white;
`;
