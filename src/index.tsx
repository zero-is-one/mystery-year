import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "assets/styles/theme.css";
import "assets/styles/index.css";
import "react-awesome-animated-number/dist/index.css";
import "viewerjs-react/dist/index.css";
import { App } from "components/App/App";
import reportWebVitals from "./reportWebVitals";
import { getApp as getFirebaseApp } from "./firebase";

getFirebaseApp();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
