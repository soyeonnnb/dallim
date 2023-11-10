import styled from 'styled-components/native';
import {colors} from '@/components/common/globalStyles';
import {ImageBackground} from 'react-native';

export const Container = styled.View<{isShow: boolean}>`
  flex: 1;
  display: ${props => (props.isShow ? 'block' : 'none')};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: black;
  margin-bottom: 30px;
  padding-left: 30px;
`;

export const Card = styled.TouchableOpacity<{width: number}>`
  margin-right: 20px;
  width: ${props => props.width}px;
  height: 90%;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
export const CardTitle = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: 800;
`;
export const CardDatas = styled.View`
  flex-direction: row;
`;
export const CardData = styled.Text`
  color: white;
  margin-right: 3%;
`;

export const CardImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: -1;
  position: absolute;
  border-radius: 20px;
  overflow: hidden; // border-radius 스타일을 적용하기 위해 추가
`;
export const CardTexts = styled.View`
  width: 90%;
  height: 90%;
  padding: 10px 20px;
  border-radius: 20px;
  justify-content: space-evenly;
  /* shadow-opacity: 0.9;
  shadow-radius: 1px;
  shadow-color: ${colors.purple._800};
  shadow-offset: 0px 10px;
  elevation: 10; */
`;
