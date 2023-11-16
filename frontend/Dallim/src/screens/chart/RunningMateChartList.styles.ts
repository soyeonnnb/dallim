import styled from 'styled-components/native';
import {DeviceEventEmitter, ImageBackground} from 'react-native';
import {ChartSheet} from '@/components/chartComponent/main/preview/MonthlyChart.styles';
import {Shadow} from 'react-native-shadow-2';
import {colors} from '@/components/common/globalStyles';
import FastImage from 'react-native-fast-image';
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
  flex: 0.6;
`;
export const Footer = styled.View`
  flex: 0.4;
  background-color: white;
  padding: 5% 10% 10% 10%;
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

export const FooterHeader = styled.View`
  flex: 0.1;
  flex-direction: row;
  width: 100%;
  /* background-color: red; */
  justify-content: center;
`;
export const FooterHeaderTextMy = styled.Text`
  font-size: 20px;
  color: ${colors.grey._900};
  height: 100%;
  vertical-align: bottom;
  font-weight: 800;
`;
export const FooterHeaderTextRival = styled.Text`
  margin-left: 4%;
  vertical-align: bottom;
  height: 100%;
  color: ${colors.text.grey};
`;
export const FooterMain = styled.View`
  flex-direction: row;
  flex: 0.66;
`;
export const FooterMainLeft = styled.View`
  flex: 0.6;
  height: 100%;
  /* background-color: aqua; */
  justify-content: flex-end;
`;

export const FooterMainRight = styled.View`
  flex: 0.4;
  height: 100%;
  /* background-color: aquamarine; */
  justify-content: flex-end;
`;
export const FooterMainWin = styled.View`
  flex: 0.2;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const FooterMainWinText = styled.Text<{color: string}>`
  font-size: 23px;
  text-align: center;
  font-weight: 800;
  margin: 0 5%;
  color: ${props => props.color};
`;
export const FooterMainView = styled.View`
  flex: 0.8;
`;

export const FooterMainImageBox = styled.View`
  width: 100%;
  height: 100%;
`;
export const StyledGif = styled(FastImage)`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
`;
// 개인 기록 관련 스타일
export const Records = styled.View`
  flex: 0.9;
  height: 100%;
  justify-content: space-between;
`;

export const RecordView = styled.View`
  height: 30%;
  width: 100%;
  align-items: center;
  flex-direction: row;
`;
export const RecordLeft = styled.View`
  flex: 0.35;
`;
export const RecordRight = styled.View`
  flex: 0.65;
  height: 100%;
  justify-content: space-between;
`;
export const RecordIconCircle = styled(Shadow)<{size: number; color: string}>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size}px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
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
export const RecordName = styled.Text``;
export const RecordContent = styled.Text`
  color: ${colors.grey._900};
  font-size: 25px;
  font-weight: 700;
`;

export const FooterMainRightView = styled.View`
  /* background-color: aliceblue; */
  flex: 0.9;
`;
