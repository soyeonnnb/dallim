// Weather.styles.ts
import styled from 'styled-components/native';

export const Container = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LeftBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 40%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const RightBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 60%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
`;

export const ImageStyle = styled.Image`
  width: 50%;
  height: 50%;
`;

export const Title = styled.Text`
  font-size: 10px;
  color: white;
  font-weight: bold;
`;

export const WeatherText = styled.Text`
  font-size: 10px;
  color: white;
`;

export const PermissionButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: white;
  border-radius: 20px;
  width: 60%;
  height: 40%;
  justify-content: center;
  align-items: center;
`;
