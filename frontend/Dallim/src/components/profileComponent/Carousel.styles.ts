import styled from 'styled-components/native';

export const CardContainer = styled.View`
  /* border-width: 1px;
  border-color: white; */
  height: 100%;
`;

//전체컨테이너
export const Container = styled.View`
  /* border-width: 1px;
  border-color: orange; */
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  /* border-width: 1px;
  border-color: orange; */
  height: 10%;
`;
export const Body = styled.View`
  /* border-width: 1px;
  border-color: orange; */
  align-items: center;
  justify-content: center;
  height: 80%;
`;
export const Footer = styled.View`
  /* border-width: 1px;
  border-color: red; */
  align-items: center;
  justify-content: center;
  height: 10%;
`;

//페이지네이션
export const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#FFFFFF' : '#8E8E8E')};
  width: 6px;
  height: 6px;
  border-radius: 3px;
`;

//페이지네이션 컨테이너
export const IndicatorWrapper = styled.View`
  /* border-width: 1px;
  border-color: red; */
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BodyBottomCharacterImageBox = styled.View`
  /* border-width: 1px;
  border-color: orange; */
  /* width: 235px;
  height: 350px; */
  width: 60%;
  height: 50%;
  top: 45%;
  justify-content: flex-end;
  left: 45%;
  position: absolute;
`;

export const CharacterImage = styled.Image`
  /* border-width: 1px; */
  width: 100%;
  height: 100%;
`;

export const EmptyBox = styled.View`
/* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const EmptyImage = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 60%;
`;

export const EmptyText = styled.Text`
  font-size: 25px;
  color: #8c8c8c;
  text-align: center;
`;