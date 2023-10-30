import styled from 'styled-components/native';
import {Calendar as Cal} from 'react-native-calendars';
export const Container = styled.View`
  border-width: 1px;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 0.6;
`;

export const Text = styled.Text`
  color: white;
`;
export const Calendar = styled(Cal)`
  width: '100%';
`;
