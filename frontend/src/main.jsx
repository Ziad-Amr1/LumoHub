// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./context/AppProviders";
import RouteChangeHandler from "./components/Loader/LoaderOverlay";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/LumoHub">
      <AppProviders>
        {/* Main App */}
        <RouteChangeHandler />
        <App />
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>
);
