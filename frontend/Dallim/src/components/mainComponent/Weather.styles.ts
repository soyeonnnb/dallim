// Weather.styles.ts
import styled from 'styled-components/native';

export const Container = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

export const LeftBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const RightBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 50%;
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
  font-size: 12px;
  color: white;
`;
