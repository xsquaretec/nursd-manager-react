import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AuthProvider>
        <Provider store={store}>
          {/* <BrowserRouter basename="/nursd-manager-react/"> */}
          <App />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
