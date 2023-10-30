import styled from 'styled-components/native';

export const Container = styled.View<{isShow: boolean}>`
  flex: 1;
  display: ${props => (props.isShow ? 'block' : 'none')};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: black;
  margin-bottom: 20px;
  padding-left: 30px;
`;

export const Card = styled.TouchableOpacity`
  background-color: aqua;
  margin-right: 20px;
  width: 30%;
  border-width: 2px;
`;
export const CardTitle = styled.Text`
  color: red;
`;
export const CardDatas = styled.View``;
export const CardData = styled.Text``;
