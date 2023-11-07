import styled from 'styled-components/native';

export const Container = styled.View`
  /* border-width: 1px;
  border-color: red; */
  /* width: 100%; */
  /* height: 110px; */
  flex: 1;
`;

export const CardImageWrapper = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
`;

export const CardBox = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  /* align-items: flex-start; */
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  align-items: flex-start;
  width: 90%;
  height: 15%;
  padding-left: 10px;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 65%;
  height: 65%;
  padding-left: 10px;
`;

export const LeftBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  align-items: flex-start;
  gap: 5px;
`;

export const NicknameText = styled.Text`
  font-size: 25px;
  color: white;
`;

export const LevelText = styled.Text`
  font-size: 15px;
  color: white;
`;

export const RightBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  align-items: flex-end;
`;

export const percentageText = styled.Text`
  font-size: 15px;
  color: #2c2c46;
`;

export const Footer = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 65%;
  height: 20%;
  padding-left: 10px;
`;

export const LevelBox = styled.View`
  /* border-width: 1px;
  border-color: white; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50%;
`;

export const ExperienceBox = styled.View`
  /* border-width: 1px;
  border-color: white; */
  border-radius: 20px;
  background-color: white;
  width: 100%;
  height: 30%;
`;

type ExperienceProps = {
  percentage: number;
};

export const Experience = styled.View<ExperienceProps>`
  background-color: #2c2c46;
  width: ${props => props.percentage}%;
  height: 100%;
  border-radius: 20px;
`;
