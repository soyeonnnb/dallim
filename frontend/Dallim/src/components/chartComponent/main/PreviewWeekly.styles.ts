import styled from 'styled-components/native';

export const Container = styled.View<{isShow: boolean}>`
  display: ${props => (props.isShow ? 'block' : 'none')};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: black;
  margin-bottom: 20px;
`;

export const View = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;
export const Component = styled.View`
  align-items: center;
  margin: 0 20px;
`;
export const Circle = styled.View<{bgColor: string}>`
  width: 70px;
  height: 70px;
  background-color: ${props => props.bgColor};
  margin-bottom: 10px;
  border-radius: 70px;
  justify-content: center;
  align-items: center;
`;
export const Name = styled.Text`
  font-weight: 600;
  color: gray;
`;
export const Content = styled.Text`
  font-weight: 800;
  font-size: 20;
  color: black;
`;
