import styled from 'styled-components/native';

export const Container = styled.View<{isShow: boolean}>`
  width: 100%;
  padding: 0 30px;
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

export const RecordContainer = styled.View`
  margin: 0 20px;
`;

export const Component = styled.View`
  align-items: center;
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
  color: gray;
`;
export const Content = styled.Text`
  font-weight: 800;
  font-size: 20px;
  color: black;
`;
