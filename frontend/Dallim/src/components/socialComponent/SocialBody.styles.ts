import styled from 'styled-components/native';
import {Animated, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Top = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 15%;
`;

export const TopBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 80%;
`;

export const ToggleWrapperShadow = styled(Shadow)`
  width: 100%;
  justify-content: center;
  /* color: black; */
  /* width: 10px; */
  height: 100%;
  /* border-radius: 18px; */
  /* margin-bottom: 20px; */
`;

export const ToggleButtonWrapper = styled(TouchableOpacity)`
  border-width: 2px;
  border-radius: 100px;
  border-color: white;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  width: 250px;
  height: 80%;
  background-color: #122937;
`;

export const ToggleButton = styled(Animated.View)`
  width: 50%;
  height: 90%;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  background-color: #fcd116;
`;

type TextProps = {
  isFriend: boolean;
};

export const FixedTextLeft = styled.Text<TextProps>`
  position: absolute;
  left: 25%;
  font-size: 15px;
  color: ${props => (props.isFriend ? 'white' : 'black')};
`;

export const FixedTextRight = styled(FixedTextLeft)`
  left: 70%;
  color: ${props => (props.isFriend ? 'black' : 'white')};
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 90%;
  height: 85%;
  justify-content: center;
  align-items: center;
`;

export const LoadingBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 50%;
  min-height: 400px;
  max-height: 500px;
`;

export const RankInfoBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
  height: 85px;
`;

export const EmptyImage = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 300px;
  margin-top: 30px;
`;

export const EmptyText = styled.Text`
  font-size: 20px;
  color: #8c8c8c;
  text-align: center;
`;

export const LoadingText = styled.Text`
  font-size: 20px;
  color: red;
`;

export const LoadingView = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  width: 100%;
  height: 250px;
`;

export const AnimatedFooterText = styled(Animated.Text)`
  font-size: 25px;
  color: white;
`;
