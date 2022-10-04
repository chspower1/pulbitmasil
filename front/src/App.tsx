import "./fonts/fonts.css";
import Router from "./router/index";
import { GlobalStyled } from "./style/GlobalStyled";

function App() {
    return (
        <>
            <GlobalStyled />
            <Router />
        </>
    );
}

export default App;
