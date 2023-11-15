import {Shadow} from 'react-native-shadow-2';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const Body = styled.View`
  /* border: 3px;
  border-color: white; */
  width: 100%;
  height: 110px;
`;

export const CardImageWrapper = styled.View`
  /* border: 3px;
  border-color: white; */
  width: 100%;
  /* height: 120px; */
  border-radius: 18px;
  overflow: hidden;
  /* margin-top: 30px; */
  /* margin-bottom: 10px; */
`;

export const CardBox = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const BodyContainer = styled.View`
  width: 95%;
  height: 90%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ToggleContainer = styled.View`
  width: 100%;
  height: 40%;
  align-items: flex-end;
`;

export const BodyTopToggleButton = styled.View`
  border-radius: 30px;
  background-color: rgba(227, 227, 227, 0.5);
  width: 70px;
  height: 35px;
  justify-content: center;
  align-items: flex-start;
  padding: 5px;
`;

export const BodyTopToggleFalseButton = styled.View`
  border-radius: 30px;
  background-color: rgba(71, 74, 101, 0.5);
  width: 70px;
  height: 35px;
  justify-content: center;
  align-items: flex-end;
  padding: 5px;
`;

export const Circle = styled.View`
  border-radius: 100px;
  background-color: white;
  width: 25px;
  height: 25px;
`;

export const DayContainer = styled.View`
  width: 100%;
  height: 60%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const DayBox = styled.View`
  width: 100%;
  height: 50%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const DayText = styled.Text`
  font-size: 15px;
  color: white;
  align-items: flex-end;
`;

export const TimeBox = styled.View`
  width: 100%;
  height: 50%;
  align-items: flex-end;
`;

export const MiddleTimeTextBox = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 5px;
  justify-content: flex-end;
  align-items: center;
`;

export const TimeText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export const BoxShadow = styled(Shadow)`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  /* height: 150px; */
  /* margin: px; */
  justify-content: center;
  align-items: center;
  /* color: black; */
  /* width: 10px; */
  /* height: 100%; */
  top: 10px;
  border-radius: 30px;
  /* margin-top: 20px; */
  margin-bottom: 20px;
`;
