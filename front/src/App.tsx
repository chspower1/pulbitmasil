import Router from "@router/index";

import { GlobalStyled } from "./style/GlobalStyled";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./style/theme/theme";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyled />

      <Router />
    </ThemeProvider>
  );
}

export default App;
