import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 40%;
`;

export const Text = styled.Text`
  font-size: 15px;
  color: white;
`;

export const DeleteButtonBox = styled.TouchableOpacity`
  /* border-width: 1px;
  border-color: blue; */
`;

export const Logout = styled.Image`
  width: 20px;
  height: 20px;
`;

export const TitleProfileBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
`;

export const ProfileBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  width: 100%;
  height: 80%;
`;

export const Body = styled.View`
  /* border-width: 1px; */
  /* border-color: red; */
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  height: 50%;
`;

export const TitleSetBox = styled.View`
  /* border-width: 1px;
  border-color: green; */
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 15%;
`;

export const SetBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  align-items: center;
  width: 100%;
  height: 85%;
`;

//버튼 컨테이너
export const ButtonContainer = styled.View`
  /* border-width: 1px;
  border-color: green; */
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50%;
`;

export const ButtonBox = styled.TouchableOpacity`
  /* border-width: 2px;
  border-color: white; */
  border-radius: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.38);
  width: 45%;
  height: 90%;
  /* margin-left: 2.5%; */
  /* margin-right: 2.5%; */
`;
export const ButtonSmallBox = styled.View`
  /* border-width: 2px;
  border-color: white; */
  width: 80%;
  height: 80%;
`;

export const IconBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  background-color: #e36f6f;
  border-radius: 300px;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
`;

export const RunningIconBox = styled.View`
  background-color: #ffd02b;
  border-radius: 300px;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
`;

export const AlarmIconBox = styled.View`
  background-color: #5879dc;
  border-radius: 300px;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
`;

export const WatchIconBox = styled.View`
  background-color: #977ef5;
  border-radius: 300px;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
`;

export const EmptyBox = styled.View`
  /* width: 5px; */
  /* height: 5px; */
`;

export const ButtonIcon = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 50px;
  height: 50px;
`;

export const TextBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  align-items: center;
  width: 90px;
  height: 30px;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;

export const TabBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 10%;
`;

// 캐릭터 띄우기
export const ImageBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 35%;
  height: 27%;
  position: absolute;
  top: 18%;
  left: 65%;
`;

export const CharacterImage = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
`;
