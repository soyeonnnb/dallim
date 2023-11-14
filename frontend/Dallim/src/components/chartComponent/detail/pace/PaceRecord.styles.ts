import styled from 'styled-components/native';
import {colors} from '@/components/common/globalStyles';
import {Shadow} from 'react-native-shadow-2';

export const Container = styled.View`
  flex: 0.47;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: white;
  padding: 0 5%;
`;
export const Text = styled.Text`
  font-size: 30px;
  color: white;
`;

export const RecordBox = styled.View`
  flex: 0.8;
  width: 100%;
`;

export const Footer = styled.View`
  height: 20px;
`;

export const ToggleBox = styled.View`
  background-color: white;
  width: 100%;
  flex: 0.1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const ToggleText = styled.Text`
  /* margin-right: 10px; */
  font-size: 15px;
  line-height: 20px;
  vertical-align: middle;
  font-weight: 800;
  color: ${colors.grey._200};
`;
