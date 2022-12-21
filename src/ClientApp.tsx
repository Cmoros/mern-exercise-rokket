import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = document.getElementById("root");

if (!root) throw new Error("Root to hydrate not found");

hydrateRoot(
  root,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
