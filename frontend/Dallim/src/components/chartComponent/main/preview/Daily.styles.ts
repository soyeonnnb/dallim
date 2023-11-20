import styled from 'styled-components/native';
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
  /* border-color: red;
  border-width: 1px; */

  width: ${props => props.width}px;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-right: 20px;
`;

export const CardTitle = styled.Text`
  /* border-color: red;
  border-width: 1px; */
  color: white;
  font-size: 17px;
  font-weight: 800;
`;
export const CardDatas = styled.View`
  /* border-color: red;
  border-width: 1px; */
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
  position: absolute;
  border-radius: 20px;
  overflow: hidden; // border-radius 스타일을 적용하기 위해 추가
`;
export const CardTexts = styled.View`
  /* border-color: red;
  border-width: 1px; */

  width: 90%;
  height: 90%;
  padding: 10px 20px;
  justify-content: space-evenly;
`;

export const ClearBox = styled.View`
  /* border-width: 1px;
  border-color: orange; */
  width: 50px;
  height: 50px;
  right: 2%;
  top: 5%;
  position: absolute;
`;

export const ClearImage = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
`;
