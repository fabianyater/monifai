import { PrimeReactProvider } from "primereact/api";

import "primeicons/primeicons.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";

const value = {
  pt: {},
  ripple: true,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider value={value}>
      <App />
    </PrimeReactProvider>
  </StrictMode>
);
