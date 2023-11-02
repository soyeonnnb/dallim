import styled from 'styled-components/native';
import {Dimensions, ImageBackground} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const itemHeight = screenHeight / 7;

export const Container = styled.View`
  flex: 1;
`;

// export const PickerContainer = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
// `;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: blue; */
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  width: 100%;
  height: 80%;
`;

export const HeaderTop = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  /* justify-content: center; */
  /* align-items: center; */
  width: 20%;
  height: 100%;
`;

export const HeaderMiddle = styled.View`
  border-width: 1px;
  border-color: orange;
  flex-direction: row;
  /* justify-content: center; */
  /* align-items: center; */
  width: 60%;
  height: 100%;
`;

export const ClockImg = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
`;

export const TimeScrollView = styled.ScrollView`
  flex: 1;
  border-right-width: ${(props: {lastItem?: boolean}) =>
    props.lastItem ? '0' : '0.5px'};
  border-color: ${(props: {lastItem?: boolean}) =>
    props.lastItem ? '#ddd' : 'red'};
`;

export const TimeItem = styled.View`
  height: ${itemHeight}px;
  justify-content: center;
  align-items: center;
`;

export const TimeText = styled.Text`
  text-align: center;
  font-size: ${(props: {selected: boolean}) =>
    props.selected ? '20px' : '15px'};
  color: ${(props: {selected: boolean}) => (props.selected ? 'black' : 'grey')};
`;

export const DaysContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const DayButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${(props: {selected: boolean}) =>
    props.selected ? 'blue' : 'grey'};
  border-radius: 18px;
  background-color: ${(props: {selected: boolean}) =>
    props.selected ? 'blue' : 'transparent'};
`;

export const DayText = styled.Text`
  color: black;
  font-size: 16px;
`;

export const HeaderBottom = styled.TouchableOpacity`
  background-color: blue;
  /* padding: 10px; */
  /* margin: 20px; */
  border-radius: 5px;
  align-items: center;
  width: 20%;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: blue;
  /* padding: 10px; */
  /* margin: 20px; */
  border-radius: 5px;
  align-items: center;
  /* width: 15%; */
`;

export const SaveButtonText = styled.Text`
  color: white;
  font-size: 20px;
`;
