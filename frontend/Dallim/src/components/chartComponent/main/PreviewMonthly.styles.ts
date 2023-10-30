import styled from 'styled-components/native';

export const Container = styled.View<{isShow: boolean}>`
  border-width: 1px;
  justify-content: center;
  align-items: center;
  background-color: red;
  width: 100%;
  flex: 1;
  display: ${props => (props.isShow ? 'block' : 'none')};
`;

export const Text = styled.Text`
  color: white;
`;
