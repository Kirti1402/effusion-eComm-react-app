import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import {BrowserRouter as Router} from "react-router-dom"
import { LoginProvider } from "./Context/LoginContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LoginProvider>
          <App />
      </LoginProvider>
    </Router>
    
  </React.StrictMode>,
  document.getElementById("root")
);
