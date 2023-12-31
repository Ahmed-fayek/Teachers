import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { TeachersProvider } from "./context/dataCon";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TeachersProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TeachersProvider>
  </React.StrictMode>
);

reportWebVitals();
