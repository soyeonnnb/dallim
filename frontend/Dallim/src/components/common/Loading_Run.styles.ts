import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const LoadingBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
`;

export const ReloadButton = styled.TouchableOpacity`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 20%;
`;

export const ReloadButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  position: absolute;
`;

export const RunBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: flex-end;
  flex-direction: row;
  width: 100%;
  height: 30%;
`;

export const ThemeBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 50%;
`;

export const StyledGif = styled(FastImage)`
  /* border-width: 1px;
  border-color: blue; */
  width: 150%;
  height: 100%;
`;
