import styled from 'styled-components/native';
import {Animated, TouchableOpacity, TextInput} from 'react-native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); // 예를 들면 반투명한 배경을 추가
`;

export const ModalContent = styled.View`
  width: 80%;
  height: 550px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

export const Top = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: space-between;
`;

export const Empty = styled.View`
  border-width: 1px;
  border-color: red;
  width: 30px;
  height: 30px;
`;

export const ToggleButtonWrapper = styled(TouchableOpacity)`
  border-width: 1px;
  border-radius: 100px;
  border-color: transparent;
  padding: 4px;
  width: 160px;
  height: 30px;
  background-color: #122937;
`;

export const ToggleButton = styled(Animated.View)`
  width: 70px;
  height: 20px;
  border-radius: 100px;
  margin-left: 5px;
  background-color: white;
`;

export const ToggleButtonText = styled.Text`
  color: black;
  font-size: 12px;
  text-align: center;
`;

export const CloseButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: red;
  width: 30px;
  height: 30px;
`;

export const CloseImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Middle = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 50%;
  height: 40%;
`;

export const Text = styled.Text`
  font-size: 10px;
  color: #8c8c8c;
  text-align: center;
`;

export const Bottom = styled.View`
  border-width: 1px;
  border-color: 707070;
  flex-direction: row;
  border-radius: 10px;
  width: 100%;
  height: 10%;
  align-items: center;
`;

export const BottomLeft = styled.View`
  border-width: 1px;
  border-color: blue;
  flex-direction: row;
  width: 15%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const SearchIcon = styled(Image)`
  width: 20px;
  height: 20px;
`;

export const BottomMiddle = styled.View`
  border-width: 1px;
  border-color: blue;
  flex-direction: row;
  width: 65%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const SearchBox = styled(TextInput)`
  height: 100%;
  width: 100%;
  border: 1px solid #8c8c8c;
  /* border-radius: 20px;  */
  font-size: 14px;
  color: #8c8c8c;
`;

export const BottomRight = styled.View`
  border-width: 1px;
  border-color: blue;
  flex-direction: row;
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const SendButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: blue;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80%;
`;

export const SendButtonText = styled.Text`
  color: #707070;
  font-size: 10px;
  font-weight: bold;
`;
