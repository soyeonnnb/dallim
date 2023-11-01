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
  width: 20%;
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
  width: 75%;
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
  font-size: 16px;
  color: black;
`;

export const LevelText = styled.Text`
  font-size: 10px;
  color: #474A65;
`;

export const Right = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 15%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const AddFriendButton = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const AddFriendImage = styled(Image)`
  width: 50%;
  height: 50%;
`;
