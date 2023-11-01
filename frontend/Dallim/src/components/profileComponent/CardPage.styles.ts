import styled from 'styled-components/native';
import {Image} from 'react-native';

export const PageItem = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  z-index: -1;
`;
