import styled from 'styled-components/native';
import {Image, TouchableOpacity} from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

type BoxProps = {
  rank: number;
};

export const Box = styled.View<BoxProps>`
  border-width: 3px;
  border-color: ${props => {
    switch (props.rank) {
      case 1:
        return '#FFED71';
      case 2:
        return '#8C8C8C';
      case 3:
        return '#CD6035';
      default:
        return 'black';
    }
  }};
  background-color: white;
  flex-direction: row;
  border-radius: 18px;
  width: 100%;
  height: 70px;
`;

export const Left = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 15%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const RankText = styled.Text<BoxProps>`
  font-size: 40px;
  color: ${props => {
    switch (props.rank) {
      case 1:
        return '#FFED71';
      case 2:
        return '#8C8C8C';
      case 3:
        return '#CD6035';
      default:
        return 'black';
    }
  }};
`;

export const Middle = styled(TouchableOpacity)`
  /* border-width: 1px;
  border-color: blue; */
  width: 70%;
  height: 100%;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 45%;
  padding-top: 10px;
`;

export const DistanceText = styled.Text`
  font-size: 12px;
  color: #626262;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  height: 55%;
  padding-bottom: 10px;
`;

export const NickNameText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

export const LevelText = styled.Text`
  font-size: 10px;
  color: #474a65;
  margin-left: 8px;
`;

export const right = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 15%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ImageBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 90%;
  height: 80%;
  justify-content: center;
`;

export const CharacterImage = styled.Image`
  /* border-width: 1px;
  border-color: gray; */
  width: 80%;
  height: 100%;
`;