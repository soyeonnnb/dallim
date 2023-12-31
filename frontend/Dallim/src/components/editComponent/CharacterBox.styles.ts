import styled from 'styled-components/native';

export const Container = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CharacterBox = styled.View`
  width: 100%;
  height: 100%;
`;

export const CharacterImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const BlurredCharacterImage = styled(CharacterImage)`
  opacity: 0.3;
`;