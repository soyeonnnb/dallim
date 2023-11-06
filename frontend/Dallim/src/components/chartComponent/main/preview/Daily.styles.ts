import styled from 'styled-components/native';
import {colors} from '@/components/common/globalStyles';

export const Container = styled.View<{isShow: boolean}>`
  flex: 1;
  display: ${props => (props.isShow ? 'block' : 'none')};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: black;
  margin-bottom: 30px;
  padding-left: 30px;
`;

export const Card = styled.TouchableOpacity`
  background-color: ${colors.darkPurple};
  margin-right: 20px;
  width: 90%;
  height: 90%;
  border-radius: 20px;
  padding: 10px 20px;
  justify-content: space-evenly;
  shadow-opacity: 0.9;
  shadow-radius: 1px;
  shadow-color: ${colors.darkPurple};
  shadow-offset: 0px 4px;
  elevation: 5;
`;
export const CardTitle = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: 800;
`;
export const CardDatas = styled.View`
  flex-direction: row;
`;
export const CardData = styled.Text`
  color: white;
  margin-right: 15%;
`;
