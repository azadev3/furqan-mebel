import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./styles/global.scss";
import "./styles/responsive.scss";
import ScrollToTop from "./ScrollToTop.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <HashRouter>
      <ScrollToTop>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ScrollToTop>
    </HashRouter>
  </RecoilRoot>
);
