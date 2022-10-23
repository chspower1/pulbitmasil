import Router from "./pages/index";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./style/theme/theme";
import { GlobalStyled } from "@style/GlobalStyled";
import { HelmetProvider } from "react-helmet-async";
import Seo from "./Seo";
function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyled />
        <Seo />
        <Router />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
