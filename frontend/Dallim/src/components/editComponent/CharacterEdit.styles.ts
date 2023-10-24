import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Top = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15%;
`;

export const TitleBox = styled.View`
  border-width: 1px;
  border-color: blue;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const SelectText = styled.Text`
  font-size: 20px;
  color: white;
`;

export const Body = styled.View`
  border-width: 1px;
  border-color: blue;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65%;
`;

export const CharacterBox = styled.View`
  border-width: 1px;
  border-color: green;
  width: 80%;
  height: 90%;
`;

export const Bottom = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 20%;
  align-items: center;
`;

export const ButtonBox = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: #2a2c45;
  width: 100%;
  height: 50%;
`;

export const ButtomLevel = styled.View`
  /* border-width: 1px;
  border-color: white; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50%;
`;

export const LevelText = styled.Text`
  font-size: 15px;
  color: black;
`;

export const LevelBox = styled.View`
  /* border-width: 1px;
  border-color: white; */
  border-radius: 20px;
  background-color: white;
  width: 70%;
  height: 30%;
`;

type ExperienceBarProps = {
  percentage: number;
};

export const ExperienceBar = styled.View<ExperienceBarProps>`
  background-color: black;
  width: ${props => props.percentage}%;
  height: 100%;
  border-radius: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
`;

export const TabBox = styled.View`
  border-width: 1px;
  border-color: red;
  width: 100%;
  height: 10%;
`;
