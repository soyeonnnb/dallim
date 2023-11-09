import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  overflow-y: hidden;
}`;

export const Container = styled.div`
  /* width: 100%; */
  height: 100vh;
  overflow-y: auto;
`;
