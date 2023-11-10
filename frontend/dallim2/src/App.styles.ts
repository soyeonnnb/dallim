import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow: hidden; /* 전체 페이지 스크롤을 비활성화 */
  }
`;

export const Container = styled.div`
  height: 100vh;
  overflow-y: scroll; /* 세로 스크롤만 가능하도록 설정 */
  scroll-snap-type: y mandatory; /* 스크롤 스냅을 세로축으로 설정 */
  scroll-behavior: smooth; /* 부드러운 스크롤 효과 */
`;

export const Page = styled.div`
  height: 100vh;
  scroll-snap-align: start; /* 스크롤 스냅 정렬 */
`;
