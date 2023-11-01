import styled from 'styled-components/native';

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
  flex-direction: row;
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: space-between;
`;

export const Empty = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 20%;
  height: 100%;
`;

export const TitleBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 60%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

export const NicknameText = styled.Text`
  font-size: 15px;
  color: black;
`;

export const LevelText = styled.Text`
  font-size: 10px;
  color: #b2b9ca;
`;

export const CloseButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: red; */
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;
export const CloseImage = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 60%;
  height: 60%;
`;

export const Middle = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  width: 100%;
  height: 30%;
`;

export const MiddleLeft = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 40%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CharacterImage = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 90%;
  height: 90%;
`;

export const MiddleRigth = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 60%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const TextBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 70%;
  height: 30%;
  gap: 5px;
`;

export const TotalDistText = styled.Text`
  font-size: 12px;
  color: #315182;
`;

export const WeekDistText = styled.Text`
  font-size: 12px;
  color: #315182;
  /* text-align: center; */
`;

export const ButtonBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 70%;
  height: 30%;
  justify-content: center;
  align-items: center;
`;

export const SendButton = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: blue; */
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 30px;
  background-color: #315182;
`;

export const SendButtonText = styled.Text`
  color: white;
  font-size: 10px;
`;

export const Bottom = styled.View`
  /* border-width: 1px;
  border-color: yellow; */
  width: 100%;
  height: 60%;
  align-items: center;
`;

export const BottomTitle = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 90%;
  height: 10%;
  flex-direction: row;
`;

export const RunningText = styled.Text`
  color: #898989;
  font-size: 20px;
`;

export const BottomSortBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 90%;
  height: 10%;
  justify-content: center;
  align-items: flex-end;
`;

export const BottomSort = styled.TouchableOpacity`
  position: relative;
  /* border-width: 1px;
  border-color: red; */
  width: 85px;
  height: 80%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const SortText = styled.Text`
  color: #898989;
  font-size: 12px;
`;

export const DropdownMenu = styled.View`
  position: absolute;
  top: 110%;
  width: 100%;
  z-index: 10;
`;

export const DropdownItem = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #898989;
  padding: 5px;
  width: 85px;
  background-color: black;
  border-radius: 10px;
  z-index: 10;
`;

export const DropdownItemText = styled.Text`
  color: white;
  font-size: 10px;
  text-align: center;

`;

export const BottomList = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 90%;
  height: 78%;
`;

export const RunBox = styled.View`
  border-width: 1px;
  border-color: gray;
  width: 100%;
  height: 100px;
  border-radius: 12px;
  margin-bottom: 10px;
  /* justify-content: center;
  align-items: center; */
`;