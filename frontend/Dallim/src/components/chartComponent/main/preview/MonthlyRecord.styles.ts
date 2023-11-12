import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: black;
`;
export const View = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 5%;
`;
export const TotalCount = styled.View`
  margin-right: 13px;
`;

export const AverageCompares = styled.View`
  justify-content: space-between;
  flex: 1;
`;

export const SmallContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const SmallCircle = styled.View<{bgColor: string}>`
  width: 45px;
  height: 45px;
  background-color: ${props => props.bgColor};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;
export const SmallView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const SmallName = styled.Text`
  color: gray;
  font-size: 13px;
`;
export const SmallContent = styled.Text`
  font-weight: 800;
  font-size: 15px;
  color: black;
`;
export const FriendView = styled.View`
  flex: 0.6;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const CharacterView = styled.View`
  flex: 0.5;
`;

export const CharacterImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const FriendText = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`;

export const FriendTitle = styled.Text`
  color: gray;
  font-size: 13px;
`;

export const FriendName = styled.Text`
  font-weight: 800;
  font-size: 18px;
  color: black;
`;

export const NoFriendText = styled.Text`
  font-size: 18px;
`;
