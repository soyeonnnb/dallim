import styled from 'styled-components/native';

export const CardContainer = styled.View`
  border-width: 1px;
  border-color: white;
`;

//전체컨테이너
export const Container = styled.View`
  border-width: 1px;
  border-color: orange;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

//페이지네이션
export const Indicator = styled.View<{focused: boolean}>`
  margin: 0px 4px;
  background-color: ${props => (props.focused ? '#262626' : '#dfdfdf')};
  width: 6px;
  height: 6px;
  border-radius: 3px;
`;

//페이지네이션 컨테이너
export const IndicatorWrapper = styled.View`
  border-width: 1px;
  border-color: red;
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;
