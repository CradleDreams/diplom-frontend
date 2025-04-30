import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { createGlobalStyle } from "styled-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
  }
`;

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);
