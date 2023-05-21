import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import {BrowserRouter as Router} from "react-router-dom"
import { LoginProvider } from "./Context/LoginAuthContext";
import { SignUpAuthContextProvider} from "./Context/SignupAuthContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LoginProvider>
        <SignUpAuthContextProvider>
          <App />
          </SignUpAuthContextProvider>
      </LoginProvider>
    </Router>
    
  </React.StrictMode>,
  document.getElementById("root")
);
