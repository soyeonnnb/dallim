import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); // 반투명한 배경을 추가
`;

export const ModalContent = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 80%;
  height: 550px;
  background-color: #fff;
  border-radius: 10px;
`;

export const Top = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 5%;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: black;
`;

export const Middle = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
  height: 40%;
`;
export const MiddleBackground = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

export const CharacterImage = styled.Image`
  /* border-width: 1px;
  border-color: blue; */
  width: 60%;
  height: 60%;
`;

export const NicknameText = styled.Text`
  font-size: 15px;
  color: white;
`;

export const MiddleLeft = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const MiddleRigth = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const Bottom = styled.View`
  /* border-width: 1px;
  border-color: yellow; */
  width: 100%;
  height: 45%;
  align-items: center;
`;

export const BottomBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 25%;
  align-items: center;
`;

export const BottomText = styled.Text`
  font-size: 15px;
  color: black;
`;

export const RateBarBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 90%;
  height: 50%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const RateBar = styled.View<{
  myWidthPercentage: number;
  otherWidthPercentage: number;
}>`
  flex-direction: row;
`;

export const MyDataBar = styled.View<{widthPercentage: number}>`
  width: ${props => props.widthPercentage}%;
  height: 60%;
  background-color: #fdcb86; // 내 데이터 색상
  border-radius: 40px;
`;

export const OtherDataBar = styled.View<{widthPercentage: number}>`
  width: ${props => props.widthPercentage}%;
  height: 60%;
  background-color: #8da478; // 상대 데이터 색상
  border-radius: 40px;
`;

export const Close = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 10%;
  justify-content: center;
  align-items: center;
`;

export const CloseBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  border-radius: 15px;
  background-color: #dcdde7;
  width: 40%;
  height: 70%;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const SendButtonText = styled.Text`
  color: white;
  font-size: 15px;
`;
