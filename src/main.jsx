import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import { ThemeProvider } from "./context/ThemeContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provide Redux state to App and all components below it. */}
    <Provider store={store}>
      {/* Provide the theme value and toggle function to App through context. */}
      <ThemeProvider>
        {/* Provide page navigation to App and its routed pages. */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);