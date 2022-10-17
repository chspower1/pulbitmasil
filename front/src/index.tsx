/* eslint-disable */
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import "./style/fonts/fonts.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalStyled } from "@style/GlobalStyled";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 1000 * 60 * 5,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </RecoilRoot>,

  /* </React.StrictMode>, */
);
