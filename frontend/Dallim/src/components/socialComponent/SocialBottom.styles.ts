import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.View`
  border-width: 1px;
  border-color: red;
  width: 90%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
`;

export const Manage = styled(TouchableOpacity)`
  background-color: #122937; 
  border-radius: 15px; 
  width: 110px;
  height: 35px;
  align-items: center;
  justify-content: center;
`;

export const ManageText = styled.Text`
  color: #F8F8F8;
  font-size: 15px;
`;
