import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

export const Container = styled.View`
  /* border-width: 1px;
  border-color: red; */
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: green; */
  /* justify-content: flex-end; */
  /* align-items: center; */
  width: 100%;
  height: 110px;
  /* height: 50%; */
  /* flex: 1; */
`;

export const CardImageWrapper = styled.View`
  /* border-width: 1px;
  border-color: red; */

  border-radius: 18px;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const CardBox = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const BodyContainer = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 95%;
  height: 90%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const BodyContainerBoX = styled.View`
  /* border-width: 1px;
  border-color: orange; */
  width: 40%;
  height: 100%;
  justify-content: space-between;
  /* align-items: flex-end; */
`;

export const ToggleContainer = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 40%;
  /* justify-content: flex-end; */
  align-items: flex-end;
`;

export const BodyTopToggleButton = styled.View`
  border-width: 2px;
  border-color: white;
  border-radius: 30px;
  background-color: rgba(227, 227, 227, 0.5);
  width: 70px;
  height: 35px;
  justify-content: center;
  align-items: flex-start;
  padding: 5px;
`;

export const BodyTopToggleFalseButton = styled.View`
  border-width: 2px;
  border-color: white;
  border-radius: 30px;
  background-color: rgba(71, 74, 101, 0.5);
  width: 70px;
  height: 35px;
  justify-content: center;
  align-items: flex-end;
  padding: 5px;
`;

export const Circle = styled.View`
  /* border-width: 1px; */
  /* border-color: red; */
  border-radius: 100px;
  background-color: white;
  width: 25px;
  height: 25px;
`;

export const DayContainer = styled.View`
  /* border-width: 1px;
  border-color: pink; */
  width: 100%;
  height: 60%;
  justify-content: flex-end;
  /* align-items: flex-end; */
`;

export const DayBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 40%;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const DayText = styled.Text`
  font-size: 13px;
  color: white;
`;

export const TimeBox = styled.View`
  /* border-width: 1px;
  border-color: yellow; */
  width: 100%;
  height: 50%;
  justify-content: center;

  /* align-items: flex-end; */
`;

export const TopTimeText = styled.View`
  /* font-size: 20px; */
  color: white;
  /* font-weight: bold; */
  /* align-items: center; */
  flex-direction: row;
  justify-content: flex-end;
  height: 100%;
`;

export const MiddleTimeTextBox = styled.View`
  /* font-size: 20px;
  font-weight: bold; */
  flex-direction: column;
  /* border-width: 1px;
  border-color: blue; */
  width: 60%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const BottomTimeTextBox = styled.View`
  /* border-width: 1px;
  border-color: black; */
  width: 40%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const TimeText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: white;
`;
