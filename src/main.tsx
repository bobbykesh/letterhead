import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  console.log("Mounting App...");
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
