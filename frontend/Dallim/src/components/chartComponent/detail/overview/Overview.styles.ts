import styled from 'styled-components/native';
import {Dimensions, ScrollView} from 'react-native';
import {colors} from '@/components/common/globalStyles';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  width: ${SCREEN_WIDTH};
  justify-content: center;
  background-color: green;
  flex-direction: row;
  align-items: center;
`;
export const ArrowContainer = styled.View`
  width: 20px;
  margin: 10px;
`;

export const MainContent = styled(ScrollView)`
  background-color: aqua;
  flex: 1;
  padding-top: 10%;
`;

export const TitleContainer = styled.View`
  flex: 1;
  margin-bottom: 10%;
`;
export const Location = styled.Text`
  font-size: 22px;
  color: white;
  font-weight: 800;
  margin-bottom: 5px;
`;
export const FullTime = styled.Text`
  color: ${colors.gray};
`;

// 개인 기록 관련 스타일
export const Records = styled.View``;
export const RecordBox = styled.View`
  flex: 1;
  flex-direction: row;
  margin-bottom: 20px;
`;
export const RecordContainer = styled.View`
  flex: 0.5%;
`;

export const RecordTitle = styled.Text<{color: string}>`
  color: ${props => props.color};
  margin-bottom: 5px;
`;
export const RecordContent = styled.Text<{color: string}>`
  color: ${props => props.color};
  font-size: 30px;
  font-weight: 800;
`;
// walk 관련 스타일
export const WalkRecords = styled.View``;
export const WalkRecordContainer = styled.View``;
export const WalkRecordTitle = styled.Text``;
export const WalkRecordContent = styled.Text``;
