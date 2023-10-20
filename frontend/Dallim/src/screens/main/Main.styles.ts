import styled from 'styled-components/native';
import {ImageBackground, Image} from 'react-native';
import {Animated} from 'react-native';
import {TouchableOpacity} from 'react-native';
import StarBackground from '../../assets/images/StarBackground.png';

export const Container = styled.View`
  flex: 1;
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
  flex-direction: row;
  width: 100%;
  height: 15%;
`;

export const HeaderLeft = styled.View`
  /* border-width: 1px;
  border-color: yellow; */
  width: 40%;
  height: 100%;
  justify-content: flex-end;
`;

export const ToggleButtonWrapper = styled.ImageBackground.attrs({
  source: StarBackground,
})<{isOn?: boolean}>`
  border-width: 1px;
  border-radius: 100px;
  border-color: ${props => (props.isOn ? 'gray' : 'white')};
  padding: 4px;
  width: 80px;
  height: 40px;
  margin-left: 20px;
`;

export const ToggleButtonBackground = styled(TouchableOpacity)`
  /* border-width: 1px;
  border-color: green; */
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;
`;

// export const ToggleButton = styled(Animated.View)<{isOn?: boolean}>`
//   width: 30px;
//   height: 30px;
//   border-radius: 100px;
//   background-color: ${props => (props.isOn ? '#F5DA25' : 'white')};
// `;

// Main.styles.ts
export const ToggleButton = styled(Animated.createAnimatedComponent(ImageBackground))<{isOn?: boolean}>`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  background-color: transparent; // 배경색을 투명하게 설정
`;

export const HeaderRight = styled.View`
  /* border-width: 1px;
  border-color: green; */
  flex-direction: row;
  width: 60%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const PointText = styled.Text<{isOn?: boolean}>`
  font-size: 20px;
  color: ${props => (props.isOn ? 'black' : 'white')};
  margin-right: 10%;
`;

export const StampBox = styled.View`
  /* border-width: 1px;
  border-color: red; */

  /* 임시버튼 있는 경우 */
  justify-content: space-between;
  /* justify-content: flex-end; */
  align-items: flex-end;
  width: 90%;
  height: 10%;
  flex-direction: row;
`;

export const Stamp = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  /* align-items: center; */
  width: 45px;
  height: 45px;
`;

export const StampImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const SendButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
`;

export const ThemeBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 80%;
  height: 80%;
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const Bottom = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 15%;
`;

export const BottomBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const LevelText = styled.Text<{isOn?: boolean}>`
  font-size: 20px;
  color: ${props => (props.isOn ? 'black' : 'white')};
  margin-right: 3%;
`;

export const NicknameText = styled.Text<{isOn?: boolean}>`
  font-size: 20px;
  color: ${props => (props.isOn ? 'black' : 'white')};
`;
