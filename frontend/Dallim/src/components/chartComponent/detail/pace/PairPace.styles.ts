import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {colors} from '@/components/common/globalStyles';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const Container = styled.ScrollView``;
export const Text = styled.Text`
  font-size: 30px;
  margin-bottom: 20px;
`;
export const ScrollInBox = styled.View<{height: number}>`
  flex: 1;
  flex-direction: row;
  height: ${props => props.height};
`;

export const SectionBox = styled.View`
  flex: 0.2;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const SectionBar = styled.View`
  width: 5px;
  background-color: ${colors.darkBlue};
  align-items: center;
`;

export const SectionCircles = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const SectionCircle = styled.View<{parentWidth: number}>`
  background-color: ${colors.darkBlue};
  width: ${props => props.parentWidth / 10}px;
  height: ${props => props.parentWidth / 10}px;
  border-radius: ${props => props.parentWidth / 10}px;
  justify-content: center;
  align-content: center;
`;

export const SectionCircleText = styled.Text`
  text-align: center;
  color: white;
  font-weight: 800;
  font-size: 20px;
`;

export const RecordBox = styled.View`
  width: 100px;
  flex: 0.6;
  justify-content: space-evenly;
`;

export const Records = styled.View<{parentHeight: number; bgColor: string}>`
  background-color: ${props => props.bgColor};
  height: ${props => props.parentHeight / 3}px;
  border-radius: 10px;
  padding: 10px 10%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Record = styled.View<{flex: number}>`
  flex: ${props => props.flex};
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
`;

export const RecordContent = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: white;
  margin-left: 10px;
`;
