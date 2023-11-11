import React from "react";
import * as S from "./App.styles";
// page components
import Main from "./components/Main";
import Running from "./components/Running";
import RunningMate from "./components/RunningMate";
import Statistics from "./components/Statistics";
import Theme from "./components/Theme";
import Widget from "./components/Widget";

function App() {
  return (
    <>
      <S.GlobalStyle />
      <S.Container>
        <S.Page><Main /></S.Page>
        <S.Page><Running /></S.Page>
        <S.Page><RunningMate /></S.Page>
        <S.Page><Statistics /></S.Page>
        <S.Page><Theme /></S.Page>
        <S.Page><Widget /></S.Page>
      </S.Container>
    </>
  );
}

export default App;
