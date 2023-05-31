import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginProvider } from "./Context/LoginAuthContext";
import { SignUpAuthContextProvider } from "./Context/SignupAuthContext";
import { ProductCategoryProvider } from "./Context/ProductCategoryContext";
import { ProductListProvider } from "./Context/ProductListContext";
import {cartProvider} from "./Context/CartContext"
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LoginProvider>
        <SignUpAuthContextProvider>
          <ProductCategoryProvider>
            <ProductListProvider>
              <cartProvider>
              <App />
            </ProductListProvider>
          </ProductCategoryProvider>
        </SignUpAuthContextProvider>
      </LoginProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
