import styled from 'styled-components/native';
import {Image, TouchableOpacity} from 'react-native';
import {colors} from '../common/globalStyles';
import {Shadow} from 'react-native-shadow-2';

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
        return '#FCD116';
      case 2:
        return '#BAB9B9';
      case 3:
        return '#CD6035';
      default:
        return colors.buttonColor.firstDepth;
    }
  }};
  /* background-color: white; */
  flex-direction: row;
  border-radius: 18px;
  width: 100%;
  height: 70px;
`;

export const BoxShadow = styled(Shadow)`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  /* margin: px; */
  justify-content: center;
  align-items: center;
  /* color: black; */
  /* width: 10px; */
  /* height: 100%; */
  border-radius: 30px;
  /* margin-bottom: 20px; */
`;

export const LinearGradient = styled.View`
  border-width: 1px;
  border-color: blue;
  /* width: 15%; */
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Left = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 15%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const RankText = styled.Text<BoxProps>`
  font-size: 40px;
  /* z-index: 30; */
  /* position: absolute; */
  color: ${props => {
    switch (props.rank) {
      case 1:
        return '#FCD116';
      case 2:
        return '#BAB9B9';
      case 3:
        return '#CD6035';
      default:
        return '#FFFFFF';
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
  color: #adadad;
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
  font-weight: normal;
  color: #ffffff;
`;

export const LevelText = styled.Text`
  font-size: 10px;
  color: #adadad;
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
