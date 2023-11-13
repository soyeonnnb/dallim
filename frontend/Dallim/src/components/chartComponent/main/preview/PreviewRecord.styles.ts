import {Shadow} from 'react-native-shadow-2';
import styled from 'styled-components/native';

export const Container = styled.View<{isShow: boolean}>`
  width: 100%;
  padding: 0 30px;
  display: ${props => (props.isShow ? 'block' : 'none')};
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: black;
  margin-bottom: 20px;
`;

export const View = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-evenly;
`;

export const RecordContainer = styled.View`
  flex: 1;
  margin: 0 10px;
`;

export const Component = styled.View`
  align-items: center;
`;
export const Circle = styled.View<{bgColor: string}>`
  width: 100%;
  height: 100%;
  background-color: ${props => props.bgColor};
  margin-bottom: 10px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
`;

export const CircleShadow = styled(Shadow)`
  width: 60px;
  height: 60px;
  border-radius: 18px;
  margin-bottom: 20px;
`;
export const Name = styled.Text`
  color: gray;
  font-size: 13px;
`;
export const Content = styled.Text`
  font-weight: 800;
  font-size: 19px;
  color: black;
`;
