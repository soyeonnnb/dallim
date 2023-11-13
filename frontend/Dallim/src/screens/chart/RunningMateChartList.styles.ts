import styled from 'styled-components/native';
import {DeviceEventEmitter, ImageBackground} from 'react-native';
import {ChartSheet} from '@/components/chartComponent/main/preview/MonthlyChart.styles';
import {Shadow} from 'react-native-shadow-2';
import {colors} from '@/components/common/globalStyles';

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
  font-size: 23px;
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

export const RunningDateShadow = styled(Shadow)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

export const RunningDateBox = styled.View`
  width: 100%;
  height: 60%;
  align-items: center;
  justify-content: center;
`;

export const RunningDateDay = styled.Text<{selected: boolean}>`
  font-weight: 800;
  font-size: 15px;
  color: ${props => (props.selected ? 'black' : 'white')};
`;
export const RunningDateDate = styled.Text<{selected: boolean}>`
  font-weight: 800;
  font-size: 38px;
  color: ${props => (props.selected ? 'black' : 'white')};
`;
export const RunningDateMonth = styled.Text<{selected: boolean}>`
  font-weight: 800;
  font-size: 19px;
  color: ${props => (props.selected ? 'black' : 'white')};
`;
export const ChartHeader = styled.View`
  flex-direction: row;
  margin-top: 20px;
  justify-content: space-between;
  align-items: flex-end;
`;
export const ChartName = styled.Text`
  color: white;
  font-size: 20px;
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
  font-size: 15px;
  margin-bottom: 2%;
`;
export const RecordContent = styled.Text<{color: string}>`
  color: ${props => props.color};
  font-size: 25px;
  font-weight: 700;
`;

export const RunningDate = styled.TouchableOpacity<{
  width: number;
  selected: boolean;
}>`
  height: 90%;
  width: ${props => props.width}px;
  margin-right: ${props => props.width * 0.3}px;
  border-radius: 15px;
  background-color: ${props =>
    props.selected ? colors.yellow._500 : `${colors.grey._50}00`};
`;
