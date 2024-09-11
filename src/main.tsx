import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./styles/global.scss";
import "./styles/responsive.scss";
import ScrollToTop from "./ScrollToTop.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TranslateContextProvider } from "./TranslateContext.tsx";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <BrowserRouter>
      <ScrollToTop>
        <QueryClientProvider client={queryClient}>
          <TranslateContextProvider>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </TranslateContextProvider>
        </QueryClientProvider>
      </ScrollToTop>
    </BrowserRouter>
  </RecoilRoot>
);
