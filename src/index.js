import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import en from "antd/locale/en_US";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./Store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <ConfigProvider locale={en}>
          <App />
        </ConfigProvider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
