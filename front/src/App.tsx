import Router from "./pages/index";

import { GlobalStyled } from "./style/GlobalStyled";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./style/theme/theme";
import ModalPortal from "@components/modal/ModalPortal";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyled />
      <Router />
    </ThemeProvider>
  );
}

export default App;
