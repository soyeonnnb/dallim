import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const CardImageWrapper = styled.View`
  /* border-width: 1px;
  border-color: red; */
  border-radius: 20px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const CardBox = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 30%;
`;

export const HeaderLeft = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  height: 100%;
  padding-left: 20px;
`;
export const HeaderRight = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: flex-end;
  width: 50%;
  height: 100%;
  padding-right: 15px;
`;

export const AddIcon = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 30%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const AddButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const AddImage = styled.Image`
  width: 70%;
  height: 70%;
`;

export const Body = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 65%;
  height: 40%;
  padding-left: 20px;
`;

export const LeftBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: flex-end;
  align-items: flex-start;
`;

export const NicknameText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: white;
`;

export const LevelText = styled.Text`
  font-size: 20px;
  font-weight: bold;
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
  font-weight: bold;
  color: #2c2c46;
`;

export const Footer = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: flex-start;
  width: 65%;
  height: 30%;
  padding-left: 20px;
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
