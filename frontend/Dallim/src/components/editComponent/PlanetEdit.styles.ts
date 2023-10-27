import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15%;
`;

export const DotBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
`;

export const Dot = styled.View<{isActive: boolean}>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${props => (props.isActive ? '#6099AD' : 'white')};
  margin: 0 5px;
`;

export const SelectText = styled.Text`
  font-size: 20px;
  color: white;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65%;
`;

export const PlanetBox = styled.View<{isOn?: boolean}>`
  /* border-width: 1px;
  border-color: green; */
  width: ${props => (props.isOn ? '100%' : '80%')};
  height: 90%;
`;

export const Footer = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 20%;
  align-items: center;
`;

export const ButtonBox = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: white; */
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #2a2c45;
  width: 100%;
  height: 50%;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;