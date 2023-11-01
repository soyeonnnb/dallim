import styled from 'styled-components/native';
import {Image} from 'react-native';

export const PageItem = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

export const ImageWrapper = styled.View`
  /* border-width: 1px;
  border-color: red; */
  border-radius: 18px;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const StyledImage = styled.ImageBackground`
  /* border-width: 1px;
  border-color: red; */
  /* border-radius: 18px; */
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;

  margin-left: auto;
  margin-right: auto;

  height: 10%;

  /* padding-left: 10px; */
  /* padding-right: 10px; */
`;

export const DateText = styled.Text`
  color: #ffffff;
  font-size: 15px;
`;

export const LevelText = styled.Text`
  color: #ffffff;
  font-size: 25px;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  /* flex-direction: row; */
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 50%;
  margin-left: auto;
  margin-right: auto;
`;

export const Bottom = styled.View`
  border-width: 1px;
  border-color: red;
  /* flex-direction: row; */
  /* justify-content: flex-end; */
  align-items: flex-start;
  width: 90%;
  height: 40%;
  margin-left: auto;
  margin-right: auto;
`;

export const TopBox = styled.View``;

export const DistanceText = styled.Text``;

export const MiddleBox = styled.View``;
export const MinutesText = styled.Text``;

export const BottomBox = styled.View``;

export const SpeedText = styled.Text``;

export const NicknameText = styled.Text`
  color: #ffffff;
  font-size: 25px;
`;
