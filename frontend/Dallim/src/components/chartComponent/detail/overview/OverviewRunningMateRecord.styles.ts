import styled from 'styled-components/native';
import {colors} from '@/components/common/globalStyles';
import {Shadow} from 'react-native-shadow-2';

export const Container = styled.View`
  flex: 1;
  margin-top: 7%;
  /* background-color: aliceblue; */
`;
export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8%;
`;
export const Title = styled.Text`
  font-size: 23px;
  font-weight: 800;
  color: white;
`;
export const Navi = styled.TouchableOpacity``;
export const NaviText = styled.Text`
  color: ${colors.grey._300};
`;
export const InfoContainer = styled.View`
  margin-bottom: 5%;
`;
export const Nickname = styled.Text`
  color: white;
  font-size: 20px;
  margin-bottom: 3%;
`;
export const Info = styled.View`
  flex-direction: row;
  flex: 1;
`;
export const CharacterView = styled.View`
  flex: 1;
`;
export const CharacterImage = styled.Image`
  width: 100%;
  height: 100%;
`;
export const Records = styled.View`
  flex: 1;
  height: 200px;
  justify-content: space-evenly;
`;
export const RecordPreview = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const RecordIconCircle = styled(Shadow)<{bgColor: string}>`
  width: 35px;
  height: 35px;
  background-color: ${props => props.bgColor};
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  margin-right: 6%;
`;
export const Chart = styled.View``;
export const RunningMateRecord = styled.Text`
  margin-left: 5%;
  color: white;
  font-size: 18px;
`;
export const Text = styled.Text`
  color: white;
  margin-top: 3%;
`;
export const ChartTitle = styled.Text`
  color: white;
  font-size: 20px;
  margin-bottom: 5%;
`;
