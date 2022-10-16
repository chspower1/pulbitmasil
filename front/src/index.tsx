/* eslint-disable */
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import "./style/fonts/fonts.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalStyled } from "@style/GlobalStyled";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 1000 * 60 * 10,
      cacheTime: 1000 * 60 * 10,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>로딩중</div>}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </RecoilRoot>,

  /* </React.StrictMode>, */
);
