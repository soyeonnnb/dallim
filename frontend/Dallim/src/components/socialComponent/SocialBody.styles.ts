import styled from 'styled-components/native';
import {Animated, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {colors} from '../common/globalStyles';
import LinearGradient from 'react-native-linear-gradient';

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
  width: 100%;
  height: 15%;
`;

export const TopBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
`;
export const TextBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
  position: absolute;
  z-index: 2;
`;

export const Text = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
`;

export const ToggleWrapperShadow = styled(Shadow)`
  /* border-width: 1px;
  border-color: red; */
  /* width: 100%; */
  /* margin: px; */
  justify-content: center;
  align-items: center;
  /* color: black; */
  /* width: 10px; */
  /* height: 100%; */
  border-radius: 30px;
  /* margin-bottom: 20px; */
`;

export const ToggleButtonWrapper = styled(TouchableOpacity)`
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: 280px;
  height: 55px;
  background-color: transparent;

  /* border-width: 1px;
  border-color: blue; */
`;
LinearGradient;
export const ToggleButton = styled(Animated.View)`
  /* border-width: 1px;
  border-color: blue; */
  width: 120px;
  height: 90%;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  /* margin-left: 10px; */
  background-color: white;
  /* overflow: hidden; */
`;

type TextProps = {
  isFriend: boolean;
};

export const FixedTextLeft = styled.Text<TextProps>`
  position: absolute;
  /* left: 20%; */
  font-size: 15px;
  z-index: 4;
  color: ${props => (props.isFriend ? 'white' : 'white')};
`;

export const FixedTextRight = styled(FixedTextLeft)`
  /* left: 75%; */
  /* right: -60%; */
  z-index: 4;
  color: ${props => (props.isFriend ? 'white' : 'white')};
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
