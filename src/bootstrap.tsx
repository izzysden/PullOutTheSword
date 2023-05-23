import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import GlobalStyle from "./styles/globalStyle";
import theme from "./styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";

const rootNode = document.getElementById("root");
if (!rootNode) throw new Error("Root Node Not Found");
const root = ReactDOM.createRoot(rootNode);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <ReactQueryDevtools initialIsOpen={true} />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </QueryClientProvider>
);
