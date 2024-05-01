import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import "./assets/css/app.css";
import { AuthContextProvider } from "./hooks/auth";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
