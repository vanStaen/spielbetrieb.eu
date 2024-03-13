import React from "react";
import ReactDOM from "react-dom/client";
// import "core-js/stable";
// import "regenerator-runtime/runtime";

import { consoleGreetings } from "./helpers/consoleGreetings.js";
import App from "./App.jsx";

/* if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(() => {
    console.log("Service Worker Registered");
  });
} */

consoleGreetings();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
