import Router from "./pages/index";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./style/theme/theme";
import ModalPortal from "@components/modal/ModalPortal";
import { GlobalStyled } from "@style/GlobalStyled";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyled />
      <Router />
    </ThemeProvider>
  );
}

export default App;
