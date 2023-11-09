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
    <S.Container>
      <Main />
      <Running />
      <RunningMate />
      <Statistics />
      <Theme />
      <Widget />
    </S.Container>
  );
}

export default App;
