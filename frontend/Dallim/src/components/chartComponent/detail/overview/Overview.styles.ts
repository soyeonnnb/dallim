import styled from 'styled-components/native';
import {Dimensions, ScrollView} from 'react-native';
import {colors} from '@/components/common/globalStyles';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  width: ${SCREEN_WIDTH}px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding-bottom: 5%;
`;
export const ArrowContainer = styled.View`
  width: 20px;
  margin: 10px;
`;

export const MainContent = styled(ScrollView)`
  flex: 1;
  padding-top: 10%;
  padding-bottom: 120%;
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
export const WalkRecords = styled.View`
  flex: 1;
  flex-direction: row;
  margin: 7% 0px;
`;
export const WalkRecordContainer = styled.View`
  flex: 1;
  align-items: center;
`;
export const WalkRecordTitle = styled.Text`
  margin-top: 18px;
  color: white;
`;
export const WalkRecordContent = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: 800;
`;
export const Footer = styled.View`
  height: 5%;
`;
