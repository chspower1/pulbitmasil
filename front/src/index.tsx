/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import "./style/fonts/fonts.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalStyled } from "@style/GlobalStyled";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>,

  /* </React.StrictMode>, */
);
