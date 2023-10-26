import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const CardBox = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 40%;
`;

type ImageBoxProps = {
  UserLevel: number;
};
export const ImageBox = styled.View<ImageBoxProps>`
  border-width: 2px;
  border-color: ${props => {
    if (props.UserLevel <= 20) return 'gray';
    if (props.UserLevel <= 40) return 'lime';
    if (props.UserLevel <= 60) return 'blue';
    if (props.UserLevel <= 80) return 'purple';
    return 'red';
  }};
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-left: 5%;
  background-color: white;
`;

export const CharacterImage = styled.Image`
  width: 80%;
  height: 80%;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 90%;
  height: 40%;
`;

export const LeftBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  align-items: flex-start;
  gap: 5px;
`;

export const NicknameText = styled.Text`
  font-size: 20px;
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
  width: 90%;
  height: 20%;
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
  height: 40%;
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
