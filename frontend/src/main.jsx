import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter
} from "react-router-dom";

import {
  GoogleOAuthProvider
} from "@react-oauth/google";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider
        clientId="339645643863-6ji4872gdoamm5fe7g3rtr9kcnfk4019.apps.googleusercontent.com"
      >
        <App />
        <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
  }}
/>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);