import { Shadow } from 'react-native-shadow-2';
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
  height: 10%;
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
  background-color: ${props => (props.isActive ? '#675AFF' : 'white')};
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
  height: 70%;
`;

export const PlanetBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  width: 100%;
  height: 90%;
`;

export const Footer = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 20%;
  align-items: center;
`;

export const BoxShadow = styled(Shadow)`
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

export const ButtonBox = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  /* background-color: #2a2c45; */
  width: 100%;
  height: 50%;
`;

export const EquippedText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  color: white;
`;

export const LockButtonBox = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: blue; */
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: rgba(42, 44, 69, 0.5);
  width: 100%;
  height: 50%;
`;

export const LockedImage = styled.Image`
  /* border-width: 1px;
  border-color: blue; */
  width: 30px;
  height: 30px;
`;

export const RightBox = styled.View`
  width: 70%;
  /* border-width: 1px;
  border-color: blue; */
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LockedText = styled.Text`
  font-size: 20px;
  color: white;
  /* margin-right: 5%; */
`;