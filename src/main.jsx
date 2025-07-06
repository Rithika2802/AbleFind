import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { ReviewProvider } from "./contexts/ReviewContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <ReviewProvider>
        <App />
      </ReviewProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
