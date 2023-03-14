import Landscape from "./components/Landscape";
import Stone from "./components/Stone";
import Sword from "./components/Sword";
import Wrapper from "./components/Wrapper";
import GlobalStyle from "./styles/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Landscape />
      <Wrapper>
        <Sword />
        <Stone />
      </Wrapper>
    </>
  );
}

export default App;
