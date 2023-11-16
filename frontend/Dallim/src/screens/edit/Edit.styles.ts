import styled from 'styled-components/native';
import {Image} from 'react-native';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {Animated} from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
`;
export const PointBox = styled.View`
  /* border-width: 1px;
  border-color: white; */
  /* height: 50px; */
  flex-direction: row;
  width: 120px;
  justify-content: center;
  align-items: center;
`;

export const PointImage = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  /* top: 22%; */
  bottom: 7%;
  right: 10%;
  width: 30px;
  height: 30px;
  /* position: absolute; */
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  width: 100%;
  height: 13%;
`;

export const TopMiddle = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  height: 100%;
`;

export const ToggleButtonWrapper = styled(TouchableOpacity)`
  border-width: 1px;
  border-radius: 100px;
  border-color: transparent;
  background-color: rgba(255, 255, 255, 0.2);
  /* padding: 5px; */
  width: 120px;
  height: 50px;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  /* border-width: 1px;
  border-color: blue; */
`;

export const ToggleButton = styled(Animated.View)`
  /* border-width: 1px;
  border-color: blue; */
  width: 50px;
  height: 40px;
  /* margin: 10px; */
  border-radius: 100px;
  background-color: white;
  justify-content: center;
  align-items: center;
  /* position: absolute; */
`;

export const ImageBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const ImageRightBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  /* position: absolute; */

  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 50%;
`;

export const ToggleImageLeft = styled(Image)`
  /* border-width: 1px;
  border-color: blue; */
  position: absolute;
  z-index: 10;
  width: 30px;
  height: 30px;
`;

export const ToggleImageRight = styled(Image)`
  position: absolute;
  z-index: 10;
  width: 30px;
  height: 30px;
`;

export const ToggleImage = styled(Image)`
  /* position: absolute; */
  width: 30px;
  height: 30px;
`;

export const HeaderSide = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  width: 30%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const PointText = styled.Text`
  bottom: 7%;
  font-size: 20px;
  color: white;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  width: 100%;
  height: 75%;
`;

export const DirectionBox = styled(TouchableOpacity)`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 10%;
`;

export const Direction = styled(Image)`
  width: 20px;
  height: 30px;
`;

export const BodyLeft = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
`;

export const BodyCenter = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 60%;
  height: 100%;
`;

export const BodyRight = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
`;

export const TabBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 12%;
`;

export const LoadingText = styled.Text`
  font-size: 20px;
  color: white;
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

export const FixedTextLeft = styled(Image)`
  position: absolute;

  width: 30px;
  height: 30px;

  z-index: 4;
`;

export const FixedTextRight = styled(Image)`
  width: 30px;
  height: 30px;
  z-index: 4;
`;
