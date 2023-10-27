import styled from 'styled-components/native';
import {ImageBackground, Image} from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const Left = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 30%;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

export const CharacterImage = styled(Image)`
  width: 90%;
  height: 90%;
`;

export const Middle = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 40%;
  height: 80%;
  justify-content: center;
`;

export const NicknameText = styled.Text`
  font-size: 14px;
  color: white;
  margin-bottom: 5px;
`;

export const LevelText = styled.Text`
  font-size: 20px;
  color: white;
`;

export const Right = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 30%;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

export const RankText = styled.Text`
  font-size: 40px;
  color: white;
`;
