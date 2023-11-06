import styled from 'styled-components/native';
import {colors} from '@/components/common/globalStyles';

export const Container = styled.View`
  flex: 1;
  margin-top: 7%;
`;
export const TitleContainer = styled.View`
  flex: 1;
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
export const Navi = styled.Text`
  color: ${colors.gray};
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
  height: 150px;
  justify-content: space-evenly;
`;
export const RecordPreview = styled.View`
  flex-direction: row;
  align-items: center;
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
