import styled from 'styled-components/native';
import {DeviceEventEmitter, ImageBackground} from 'react-native';
import {ChartSheet} from '@/components/chartComponent/main/preview/MonthlyChart.styles';

export const Container = styled.View`
  flex: 1;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: -1;
  position: absolute;
`;
export const Header = styled.View`
  height: 10%;
  color: white;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 30px;
`;
export const HeaderTitle = styled.Text`
  color: white;
  font-size: 25px;
`;
export const Middle = styled.View`
  flex: 0.7;
`;
export const Footer = styled.View`
  flex: 0.3;
  background-color: white;
  padding: 10% 10% 15% 10%;
`;

export const RunningListBox = styled.View`
  flex: 0.3;
  flex-direction: row;
`;

export const RunningList = styled.ScrollView`
  flex-grow: 0;
`;

export const ChartBox = styled.View`
  flex: 0.7;
  padding: 0px 30px;
`;

export const RunningDate = styled.View<{width: number}>`
  flex: 1;
  width: ${props => props.width}px;
  margin-right: ${props => props.width * 0.2}px;
  justify-content: space-between;
  padding: 12px 0;
  align-items: center;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
`;
export const RunningDateDay = styled.Text`
  font-weight: 800;
  font-size: 17px;
  color: white;
`;
export const RunningDateDate = styled.Text`
  font-weight: 800;
  font-size: 40px;
  color: white;
`;
export const RunningDateMonth = styled.Text`
  font-weight: 800;
  font-size: 20px;
  color: white;
`;
export const ChartHeader = styled.View`
  flex-direction: row;
  margin-top: 20px;
  justify-content: space-between;
  align-items: flex-end;
`;
export const ChartName = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: 700;
`;
export const ChartNavi = styled.TouchableOpacity``;
export const ChartNaviText = styled.Text`
  color: rgba(255, 255, 255, 0.7);
`;

// 개인 기록 관련 스타일
export const Records = styled.View`
  flex: 1;
`;
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
  font-size: 18px;
  margin-bottom: 5px;
`;
export const RecordContent = styled.Text<{color: string}>`
  color: ${props => props.color};
  font-size: 30px;
  font-weight: 800;
`;
